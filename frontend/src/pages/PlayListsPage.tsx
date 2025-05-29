import React, { useEffect, useState } from "react";
import {
  Trash2,
  Play,
  BookOpen,
  Clock,
  Tag,
  ArrowLeftCircle,
} from "lucide-react";
import { usePlayListStore } from "@/stores/playlistStore";
import DeleteConfirmModal from "@/components/DeletePlayListModal/DeletePlayListModal";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

// Mock toast for this example
const toast = {
  success: (message: string) => console.log("Success:", message),
  error: (message: string) => console.log("Error:", message),
};

const PlayListsPage: React.FC = () => {
  const {
    userPlayLists,
    currentPlayList,
    isPlayListLoading,
    isPlayListDeleting,
    getPlayListsByUserId,
    getPlayListById,
    deleteProblemsFromPlayList,
    deletePlayList,
  } = usePlayListStore();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null,
  );

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "playlist" | "problem";
    id: string;
    title: string;
  }>({ isOpen: false, type: "playlist", id: "", title: "" });

  useEffect(() => {
    getPlayListsByUserId();
  }, [getPlayListsByUserId]);

  const handlePlaylistSelect = async (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    await getPlayListById(playlistId);
  };

  const handleDeletePlaylist = (playlistId: string, playlistName: string) => {
    setDeleteModal({
      isOpen: true,
      type: "playlist",
      id: playlistId,
      title: playlistName,
    });
  };

  const handleDeleteProblem = (problemInPlaylist: any) => {
    setDeleteModal({
      isOpen: true,
      type: "problem",
      id: problemInPlaylist.problem.id,
      title: problemInPlaylist.problem.title,
    });
  };

  const confirmDelete = async () => {
    if (deleteModal.type === "playlist") {
      await deletePlayList(deleteModal.id);
      if (selectedPlaylistId === deleteModal.id) {
        setSelectedPlaylistId(null);
      }
    } else {
      if (currentPlayList?.id) {
        await deleteProblemsFromPlayList(currentPlayList.id, [deleteModal.id]);
        toast.success("Problem removed from playlist");
      } else {
        toast.error("No playlist selected.");
      }
    }
    setDeleteModal({ isOpen: false, type: "playlist", id: "", title: "" });
  };

  const getDifficultyColor = (difficulty: string | undefined) => {
    if (!difficulty) {
      return "text-slate-400 bg-slate-400/10";
    }
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-400/10";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "hard":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-slate-400 bg-slate-400/10";
    }
  };

  if (isPlayListLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-400">Loading playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-4 text-slate-400">
            <ArrowLeftCircle className="w-10 h-10" />
            <span className="">Back to Problems</span>
          </Link>
          <div className="mt-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              My Playlists
            </h1>
            <p className="text-slate-400">
              Organize and manage your coding problem collections
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Playlists Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-6 max-h-screen overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-200">
                  Playlists
                </h2>
              </div>

              {userPlayLists.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 mb-2">No playlists found</p>
                  <p className="text-sm text-slate-500">
                    Create your first playlist to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userPlayLists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPlaylistId === playlist.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-slate-700 hover:border-slate-600 hover:bg-slate-800/50"
                      }`}
                      onClick={() => handlePlaylistSelect(playlist.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-200 mb-1">
                            {playlist.name}
                          </h3>
                          <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                            {playlist.description}
                          </p>
                          <div className="flex items-center gap-4 font-mono text-xs text-purple-400">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {playlist.problems.length} problems
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(
                                playlist.updatedAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePlaylist(
                                    playlist.id,
                                    playlist.name,
                                  );
                                }}
                                disabled={isPlayListDeleting}
                                size="sm"
                                className="p-2 h-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500/60 rounded-lg transition-all duration-200 hover:scale-110"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Delete Playlist</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Problems Content */}
          <div className="lg:col-span-2">
            {!selectedPlaylistId ? (
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-8 text-center">
                <Play className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-200 mb-2">
                  Select a Playlist
                </h3>
                <p className="text-slate-400">
                  Choose a playlist from the sidebar to view its problems
                </p>
              </div>
            ) : currentPlayList ? (
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    {currentPlayList.name}
                  </h2>
                  <p className="text-slate-400 mb-4">
                    {currentPlayList.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {(currentPlayList.problems ?? []).length} problems
                      problems
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Updated{" "}
                      {new Date(currentPlayList.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {(currentPlayList.problems ?? []).length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                      No Problems Yet
                    </h3>
                    <p className="text-slate-400">
                      This playlist is empty. Add some problems to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentPlayList.problems.map((problem, index) => (
                      <div
                        key={problem.problem.id}
                        className="border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-slate-500 font-mono">
                                #{index + 1}
                              </span>
                              <h3 className="font-semibold text-slate-200">
                                {problem.problem.title}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.problem.difficulty)}`}
                              >
                                {problem.problem.difficulty}
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                              {problem.problem.description}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {(problem.problem.tags ?? []).map(
                                (tag: string) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs"
                                  >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleDeleteProblem(problem)}
                              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
                <p className="text-slate-400">Loading playlist details...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, type: "playlist", id: "", title: "" })
        }
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.type === "playlist" ? "Playlist" : "Problem"}`}
        message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
        isLoading={isPlayListDeleting}
      />
    </div>
  );
};

export default PlayListsPage;
