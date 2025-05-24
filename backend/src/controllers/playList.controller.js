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

  if (!playlists || playlists.length === 0) {
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
      id,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlist || playlist.length === 0) {
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

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    throw new ApiError(400, "Invalid problemIds", null);
  }

  const problemsToInsert = problemIds.map((problemId) => ({
    playListId: id, // exact field name from your model
    problemId,
  }));

  const inserted = await db.problemInPlaylist.createMany({
    data: problemsToInsert,
  });

  if (!inserted || inserted.count === 0) {
    throw new ApiError(500, "Failed to add problems to playlist", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Problems added to playlist successfully!" },
        inserted,
      ),
    );
});

export const deleteProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    throw new ApiError(400, "Invalid problemIds", null);
  }

  const deleted = await db.problemInPlaylist.deleteMany({
    where: {
      playListId: id, // use exact field name
      problemId: {
        in: problemIds,
      },
    },
  });

  if (!deleted || deleted.count === 0) {
    throw new ApiError(500, "Failed to delete problems from playlist", null);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Problems deleted from playlist successfully!" },
        deleted,
      ),
    );
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const playlist = await db.playlist.delete({
    where: {
      id,
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
