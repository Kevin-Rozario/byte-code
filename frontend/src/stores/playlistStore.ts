import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";
import toast from "react-hot-toast";
import { type IProblem } from "@/stores/problemStore";

interface PlayList {
  id: string;
  name: string;
  description: string;
  userId: string;
  problems: IProblem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlayListArgs {
  name: string;
  description: string;
}

export interface AddToPlayListArgs {
  playlistId: string;
}

interface PlayListState {
  playLists: PlayList[];
  userPlayLists: PlayList[];
  currentPlayList: PlayList | null;
  isPlayListLoading: boolean;
  isPlayListDeleting: boolean;
  error: string | null;
  createPlayList: (data: CreatePlayListArgs) => Promise<void>;
  getAllPlayLists: () => Promise<void>;
  getPlayListById: (id: string) => Promise<void>;
  getPlayListsByUserId: () => Promise<void>;
  addProblemsToPlayList: (id: string, problemIds: string[]) => Promise<void>;
  deleteProblemsFromPlayList: (
    id: string,
    problemIds: string[],
  ) => Promise<void>;
  deletePlayList: (id: string) => Promise<void>;
}

export const usePlayListStore = create<PlayListState>()((set, get) => ({
  playLists: [],
  userPlayLists: [],
  currentPlayList: null,
  isPlayListLoading: false,
  isPlayListDeleting: false,
  error: null,

  createPlayList: async ({ name, description }: CreatePlayListArgs) => {
    try {
      set({ isPlayListLoading: true });
      const response = await axiosInstance.post(
        "/api/v1/playlists/create-playlist",
        {
          name,
          description,
        },
      );

      if (response.status === 201 && response.data.data) {
        set((state) => ({
          playLists: [...state.playLists, response.data.data],
        }));
        toast.success("PlayList created successfully.");
      } else {
        toast.error("Failed to create PlayList.");
      }
    } catch (error) {
      console.error("Error creating PlayList:", error);
      toast.error("Failed to create PlayList.");
    } finally {
      set({ isPlayListLoading: false });
    }
  },

  getAllPlayLists: async () => {
    try {
      set({ isPlayListLoading: true });
      const response = await axiosInstance.get("/api/v1/playlists/");
      console.log("response", response.data.data);
      if (response.status === 200 && response.data.data) {
        set({ playLists: response.data.data });
        toast.success("PlayLists fetched successfully.");
      } else {
        toast.error("Failed to fetch PlayLists.");
      }
    } catch (error) {
      console.error("Error fetching PlayLists:", error);
      toast.error("Failed to fetch PlayLists.");
    } finally {
      set({ isPlayListLoading: false });
    }
  },

  getPlayListsByUserId: async () => {
    try {
      set({ isPlayListLoading: true });
      const response = await axiosInstance.get(
        "/api/v1/playlists/user-playlists",
      );
      if (response.status === 200 && response.data.data) {
        set({ userPlayLists: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching PlayLists:", error);
      toast.error("User has no playlists.");
    } finally {
      set({ isPlayListLoading: false });
    }
  },

  getPlayListById: async (id: string) => {
    try {
      set({ isPlayListLoading: true });
      const response = await axiosInstance.get(
        `/api/v1/playlists/playlist/${id}`,
      );

      console.log("response", response.data.data);

      if (response.status === 200 && response.data.data) {
        set({ currentPlayList: response.data.data });
        toast.success("PlayList fetched successfully.");
      } else {
        set({ currentPlayList: null });
        toast.error("Failed to fetch playlist details or playlist is empty.");
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
      set({ currentPlayList: null });
      toast.error("Failed to fetch playlist.");
    } finally {
      set({ isPlayListLoading: false });
    }
  },

  addProblemsToPlayList: async (id: string, problemIds: string[]) => {
    try {
      set({ isPlayListLoading: true });
      const response = await axiosInstance.post(
        `/api/v1/playlists/update-playlist/${id}`,
        {
          problemIds,
        },
      );

      if (
        response.status >= 200 &&
        response.status < 300 &&
        response.data?.data
      ) {
        toast.success("Problems added to PlayList successfully.");

        if (get().currentPlayList?.id === id) {
          await get().getPlayListById(id);
        }

        return response.data;
      } else {
        toast.error("Failed to add problems to PlayList.");
        throw new Error(`API returned status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding problems to PlayList:", error);

      if (error instanceof Error && error.message.includes("Network Error")) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to add problems to PlayList.");
      }

      throw error;
    } finally {
      set({ isPlayListLoading: false });
    }
  },

  deleteProblemsFromPlayList: async (id: string, problemIds: string[]) => {
    try {
      set({ isPlayListDeleting: true });
      await axiosInstance.delete(`/api/v1/playlists/update-playlist/${id}`, {
        data: {
          problemIds,
        },
      });
      toast.success("Problems deleted from PlayList successfully.");

      if (get().currentPlayList?.id === id) {
        await get().getPlayListById(id);
      }
    } catch (error) {
      console.error("Error deleting problems from PlayList:", error);

      if (error instanceof Error && error.message.includes("Network Error")) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to delete problems from PlayList.");
      }

      throw error;
    } finally {
      set({ isPlayListDeleting: false });
    }
  },

  deletePlayList: async (id: string) => {
    try {
      set({ isPlayListDeleting: true });
      const response = await axiosInstance.delete(
        `/api/v1/playlists/delete-playlist/${id}`,
      );
      if (response.status === 200) {
        set((state) => ({
          userPlayLists: state.userPlayLists.filter(
            (playlist) => playlist.id !== id,
          ),
          currentPlayList:
            state.currentPlayList?.id === id ? null : state.currentPlayList,
        }));
        toast.success("PlayList deleted successfully.");
      } else {
        toast.error("Failed to delete PlayList.");
      }
    } catch (error) {
      console.error("Error deleting PlayList:", error);
      toast.error("Failed to delete PlayList.");
    } finally {
      set({ isPlayListDeleting: false });
    }
  },
}));
