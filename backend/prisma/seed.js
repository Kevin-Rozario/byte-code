import db from "../src/config/db.config.js";
import { leetcodeProblems } from "../data/problems.js";
import { hashPassword } from "../src/utils/passHash.util.js";

async function main() {
  console.log("Start seeding ...");

  const userData = {
    userName: "dummyadmin",
    email: "dummy@google.com",
    password: "dummy@3214",
    fullName: "Dummy Admin",
  };

  const hashedPassword = await hashPassword("dummy@3214");
  userData.password = hashedPassword;
  const user = await db.user.create({
    data: userData,
  });

  // Prepare problems data with userId
  const problemsData = leetcodeProblems.map((problem) => ({
    ...problem,
    userId: user.id,
  }));

  const problems = await db.problem.createMany({
    data: problemsData,
  });
  console.log(`Created ${problems.count} problems`);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
