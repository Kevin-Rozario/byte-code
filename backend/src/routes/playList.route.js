import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  deleteProblemFromPlaylist,
  getAllPlaylists,
  getPlaylistById,
} from "../controllers/playList.controller.js";

const router = Router();

router.route("/").get(authMiddleware, getAllPlaylists);
router.route("/playlist/:id").get(authMiddleware, getPlaylistById);
router.route("/create-playlist").post(authMiddleware, createPlaylist);
router
  .route("/update-playlist/:id")
  .post(authMiddleware, addProblemToPlaylist)
  .delete(authMiddleware, deleteProblemFromPlaylist);
router.route("/delete-playlist/:id").delete(authMiddleware, deletePlaylist);

export default router;
