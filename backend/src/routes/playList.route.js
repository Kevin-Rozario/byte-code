import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addProblemsToPlaylist,
  createPlaylist,
  deletePlaylist,
  deleteProblemsFromPlaylist,
  getAllPlaylists,
  getPlaylistById,
  getPlaylistsByUserId,
} from "../controllers/playList.controller.js";

const router = Router();

router.route("/").get(authMiddleware, getAllPlaylists);
router.route("/playlist/:id").get(authMiddleware, getPlaylistById);
router
  .route("/user-playlists")
  .get(authMiddleware, getPlaylistsByUserId);
router.route("/create-playlist").post(authMiddleware, createPlaylist);
router
  .route("/update-playlist/:id")
  .post(authMiddleware, addProblemsToPlaylist)
  .delete(authMiddleware, deleteProblemsFromPlaylist);
router.route("/delete-playlist/:id").delete(authMiddleware, deletePlaylist);

export default router;
