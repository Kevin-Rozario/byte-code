import db from "../config/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import ApiResponse from "../utils/apiResponse.util.js";
import ApiError from "../utils/apiError.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTemporaryToken,
  verifyToken,
} from "../utils/generateTokens.util.js";
import { hashPassword, comparePassword } from "../utils/passHash.util.js";
import {
  emailVerificationMailGenContent,
  passwordResetMailGenContent,
  sendEmail,
} from "../utils/sendEmail.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    throw new ApiError(400, "Identifier and password are required!");
  }

  const user = await db.user.findUnique({
    where: {
      email: identifier,
    },
    select: {
      id: true,
      email: true,
      userName: true,
      fullName: true,
      password: true,
      isEmailVerified: true,
      role: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(401, "Email not verified");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await db.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .status(200)
    .json(
      new ApiResponse(200, { message: "User logged in successfully!" }, user),
    );
});

export const registerUser = asyncHandler(async (req, res) => {
  // get data
  const { email, userName, fullName, password } = req.body;

  // validate data
  if (!email || !userName || !fullName || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  console.log(`Email: ${email}\nPassword: ${password}`); // test purpose

  // Check for existing user by email or userName
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { userName: userName }],
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email or userName already exists");
  }

  const hashedPassword = await hashPassword(password);
  // create the user
  const createdUser = await db.user.create({
    data: {
      email,
      userName,
      fullName,
      password: hashedPassword,
      isEmailVerified: false,
    },
    select: {
      id: true,
      email: true,
      userName: true,
      fullName: true,
      isEmailVerified: true,
      role: true,
    },
  });

  if (!createdUser) {
    throw new ApiError(500, "Failed to register user");
  }

  // generate the token
  const { token, tokenExpiry } = generateTemporaryToken();
  await db.user.update({
    where: { id: createdUser.id },
    data: {
      emailVerificationToken: token,
      emailVerificationTokenExpiry: tokenExpiry,
    },
  });

  // send email to user
  const options = {
    email: createdUser.email,
    subject: "ByteCode Verification Email",
    mailGenContent: emailVerificationMailGenContent({
      userName: createdUser.fullName,
      verificationUrl: `${process.env.BASE_URL}/api/v1/auth/verify?tkey=${token}`,
    }),
  };

  const emailStatus = await sendEmail(options);
  if (!emailStatus) {
    console.error("Failed to send verification email", emailStatus);
    throw new ApiError(500, "Failed to send verification email.");
  }

  // send response
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { message: "User registered successfully!" },
        createdUser,
      ),
    );
});

export const verifyUser = asyncHandler(async (req, res) => {
  // get the token from query
  const token = req.query.tkey;
  if (!token) {
    throw new ApiError(400, "Email verification token not found!");
  }

  // find user based on otp
  const user = await db.user.findFirst({
    where: { emailVerificationToken: token },
  });

  if (!user) {
    throw new ApiError(404, "Invalid email verification token!");
  }

  if (new Date() > user.emailVerificationTokenExpiry) {
    console.log("User Token Expiry: ", user.emailVerificationTokenExpiry);
    console.log("Current Date: ", new Date());
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: undefined,
        emailVerificationTokenExpiry: undefined,
      },
    });
    throw new ApiError(400, "Email verification token expired!");
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationTokenExpiry: undefined,
    },
    select: {
      id: true,
      email: true,
      userName: true,
      fullName: true,
      isEmailVerified: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "User verified successfully!" },
        updatedUser,
      ),
    );
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required to resend verification link.");
  }

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "User with this email not found.");
  }

  if (user.isEmailVerified) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { message: "This email is already verified." }),
      );
  }

  // Generate a new verification token and expiry
  const { token, tokenExpiry } = generateTemporaryToken();
  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerificationToken: token,
      emailVerificationTokenExpiry: tokenExpiry,
    },
  });

  // Send the verification email
  const options = {
    email: user.email,
    subject: "Resend: ByteCode Verification Email",
    mailGenContent: emailVerificationMailGenContent({
      userName: user.fullName,
      verificationUrl: `${process.env.BASE_URL}/api/v1/auth/verify?tkey=${token}`,
    }),
  };

  const emailStatus = await sendEmail(options);
  if (!emailStatus) {
    console.error("Failed to resend verification email", emailStatus);
    return res.status(500).json(
      new ApiResponse(500, {
        message: "Failed to resend verification email. Please try again later.",
      }),
    );
  }

  res.status(200).json(
    new ApiResponse(200, {
      message:
        "Verification email resent successfully. Please check your inbox.",
    }),
  );
});

export const logoutUser = asyncHandler(async (req, res) => {
  // get user id
  const userId = req.user?.id;

  // check id
  if (!userId) {
    throw new ApiError(401, "Unauthorized: No user found in request!");
  }

  // fetch user
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // Clear refresh token from the database
  await db.user.update({
    where: { id: userId },
    data: { refreshToken: undefined },
  });

  // Clear cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully!", {}));
});

export const renewRefreshToken = asyncHandler(async (req, res) => {
  // get refresh token from cookies
  const { refreshToken } = req.cookies;

  // check for refresh token
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required!");
  }

  // decode token retrieve user info
  try {
    const decoded = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const userId = decoded?.userId;

    if (!userId) {
      throw new ApiError(401, "Invalid refresh token!");
    }

    // fetch user
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid or expired refresh token!");
    }

    // generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Save new refresh token in DB
    await db.user.update({
      where: { id: userId },
      data: { refreshToken: newRefreshToken },
    });

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    // Set new tokens in cookies and send response
    res
      .cookie("accessToken", newAccessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "Access token renewed successfully!" },
          { accessToken: newAccessToken },
        ),
      );
  } catch (error) {
    console.error("Error during refresh token renewal:", error);
    throw new ApiError(401, "Invalid refresh token!");
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorised request");
  }

  const foundUser = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      userName: true,
      email: true,
      fullName: true,
    },
  });
  if (!foundUser) {
    throw new ApiError(404, "User not found!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User fetched succssfully!", foundUser));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { fullName, userName, email } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorised request.");
  }

  const existingUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found!");
  }

  const updateData = {};

  // Update fullName
  if (fullName) {
    updateData.fullName = fullName.trim();
  }

  // Update userName
  if (userName) {
    const trimmedUserName = userName.trim().toLowerCase();
    if (trimmedUserName !== existingUser.userName) {
      const existingUserWithUserName = await db.user.findUnique({
        where: { userName: trimmedUserName },
      });
      if (existingUserWithUserName) {
        throw new ApiError(409, "Username already exists!");
      }
      updateData.userName = trimmedUserName;
    }
  }

  // Update email
  if (email) {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail !== existingUser.email) {
      const existingUserWithEmail = await db.user.findUnique({
        where: { email: trimmedEmail },
      });
      if (existingUserWithEmail) {
        throw new ApiError(409, "Email already exists!");
      }

      // Generate new verification token
      const { token, tokenExpiry } = generateTemporaryToken();

      updateData.email = trimmedEmail;
      updateData.isEmailVerified = false;
      updateData.emailVerificationToken = token;
      updateData.emailVerificationTokenExpiry = tokenExpiry;

      // Send verification email
      const options = {
        email: trimmedEmail,
        subject: "ByteCode Verification Email",
        mailGenContent: emailVerificationMailGenContent({
          userName: existingUser.fullName,
          verificationUrl: `${process.env.BASE_URL}/api/v1/auth/verify?tkey=${token}`,
        }),
      };

      const emailStatus = await sendEmail(options);
      if (!emailStatus) {
        console.error("Failed to send verification email", emailStatus);
        throw new ApiError(500, "Failed to send verification email.");
      }
    }
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      fullName: true,
      userName: true,
      email: true,
      dietPreferences: true,
      allergies: true,
      isEmailVerified: true,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Profile updated successfully" },
        updatedUser,
      ),
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    throw new ApiError(400, "Email is required!");
  }

  // Find user by email
  const user = await db.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) {
    return res.status(200).json(
      new ApiResponse(200, {
        message:
          "If an account with this email exists, a password reset link has been sent.",
      }),
    );
  }

  // Generate temporary token and expiry
  const { token, tokenExpiry } = generateTemporaryToken();

  // Update user with reset token info
  await db.user.update({
    where: { id: user.id },
    data: {
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: tokenExpiry,
    },
  });

  // Prepare email content
  const options = {
    email: user.email,
    subject: "ByteCode Password Reset Email",
    mailGenContent: passwordResetMailGenContent({
      userName: user.fullName,
      passwordResetUrl: `${process.env.BASE_URL}/api/v1/auth/reset-password?tkey=${token}`,
    }),
  };

  // Send the email
  const emailStatus = await sendEmail(options);
  if (!emailStatus) {
    console.error("Failed to send password reset email", emailStatus);
    throw new ApiError(500, "Failed to send password reset email.");
  }

  // Final response
  return res.status(200).json(
    new ApiResponse(200, {
      message: "Password reset email sent successfully!",
    }),
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.tkey;
  const { password } = req.body;

  console.log("Resetted Password: ", password);

  // Validate input
  if (!token || !password) {
    throw new ApiError(400, "Token and new password are required!");
  }

  // Find user by token
  const user = await db.user.findFirst({
    where: { forgotPasswordToken: token },
  });

  if (!user) {
    throw new ApiError(400, "Invalid password reset token.");
  }

  // Check token expiry
  if (
    !user.forgotPasswordTokenExpiry ||
    new Date() > user.forgotPasswordTokenExpiry
  ) {
    await db.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
      },
    });
    throw new ApiError(400, "Password reset token has expired.");
  }

  // Hash the new password
  const hashedPassword = await hashPassword(password);

  // Update user password and clear token fields
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
    },
  });

  // Respond success
  res
    .status(200)
    .json(
      new ApiResponse(200, { message: "Password reset successfully!" }, null),
    );
});
