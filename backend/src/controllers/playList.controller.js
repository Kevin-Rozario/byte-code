import { asyncHandler } from "../utils/asyncHandler.util.js";
import ApiResponse from "../utils/apiResponse.util.js";
import ApiError from "../utils/apiError.util.js";
import db from "../config/db.config.js";

export const getAllPlaylists = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const playlists = await db.playlist.findMany({
    where: {
      userId: userId,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlists) {
    throw new ApiError(404, "No playlists found", null);
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Playlists fetched successfully" },
        playlists,
      ),
    );
});

export const getPlaylistById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const playlist = await db.playlist.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Playlist fetched successfully!" },
        playlist,
      ),
    );
});

export const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  const playList = await prisma.playlist.create({
    data: {
      name,
      description,
      userId,
    },
  });

  if (!playList) {
    throw new ApiError(500, "Failed to create playlist", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Playlist created successfully!" },
        playList,
      ),
    );
});

export const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length == 0) {
    throw new ApiError(400, "Invalid problemIds", null);
  }

  const problemsInPlayList = await db.problemsInPlayList.findMany({
    data: problemIds.map((problemId) => ({
      playlistId: parseInt(id),
      problemId,
    })),
  });

  if (!problemsInPlayList) {
    throw new ApiError(500, "Failed to add problems to playlist", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Problems added to playlist successfully!" },
        problemsInPlayList,
      ),
    );
});

export const deleteProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length == 0) {
    throw new ApiError(400, "Invalid problemIds", null);
  }

  const problemsInPlayList = await db.problemsInPlayList.deleteMany({
    where: {
      playlistId: parseInt(id),
      problemId: {
        in: problemIds,
      },
    },
  });

  if (!problemsInPlayList) {
    throw new ApiError(500, "Failed to delete problems from playlist", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Problems deleted from playlist successfully!" },
        problemsInPlayList,
      ),
    );
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const playlist = await db.playlist.delete({
    where: {
      id: parseInt(id),
    },
  });

  if (!playlist) {
    throw new ApiError(500, "Failed to delete playlist", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Playlist deleted successfully!" },
        playlist,
      ),
    );
});
