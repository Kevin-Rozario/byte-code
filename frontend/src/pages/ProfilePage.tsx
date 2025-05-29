import { useEffect, useState, useMemo } from "react";
import {
  User,
  Trophy,
  Calendar,
  Mail,
  Shield,
  Code,
  BookOpen,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Zap,
  Pencil,
  Save,
  TrendingUp,
  Award,
  ListX,
  Trash2,
  Home,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { useProblemStore } from "@/stores/problemStore";
import { useSubmissionStore } from "@/stores/submissionStore";
import { usePlayListStore } from "@/stores/playlistStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserProfilePage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authUser = useAuthStore((state) => state.user);
  const signout = useAuthStore((state) => state.signout);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const solvedProblems = useProblemStore((state) => state.solvedProblems);
  const getSolvedProblems = useProblemStore((state) => state.getSolvedProblems);
  const createdProblemsByAdmin = useProblemStore(
    (state) => state.createdProblems,
  );
  const getCreatedProblemsByAdmin = useProblemStore(
    (state) => state.getCreatedProblems,
  );
  const userFetchedPlayLists = usePlayListStore((state) => state.userPlayLists);
  const isPlayListDeleting = usePlayListStore(
    (state) => state.isPlayListDeleting,
  );
  const deletePlayList = usePlayListStore((state) => state.deletePlayList);
  const getUserPlayLists = usePlayListStore(
    (state) => state.getPlayListsByUserId,
  );
  const totalSubmissions = useSubmissionStore(
    (state) => state.submissionsByUser,
  );
  const getSubmissionsByUser = useSubmissionStore(
    (state) => state.getSubmissionsByUser,
  );
  const [activeTab, setActiveTab] = useState("submissions");
  const [editing, setEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const userStats = [
    {
      icon: Trophy,
      label: "Problems Solved",
      value: solvedProblems.length,
      color: "text-purple-400",
    },
    {
      icon: Code,
      label: "Total Submissions",
      value: totalSubmissions.length,
      color: "text-blue-400",
    },
    {
      icon: BookOpen,
      label: "Playlists Created",
      value: userFetchedPlayLists.length,
      color: "text-cyan-400",
    },
    {
      icon: Target,
      label: "Problems Created",
      value: createdProblemsByAdmin.length,
      color: "text-purple-400",
    },
  ];

  const memoizedTotalSubmissions = useMemo(() => {
    return totalSubmissions;
  }, [totalSubmissions]);

  const memoizedUserFetchedPlayLists = useMemo(() => {
    return userFetchedPlayLists;
  }, [userFetchedPlayLists]);

  const memoizedSolvedProblems = useMemo(() => {
    return solvedProblems;
  }, [solvedProblems]);

  useEffect(() => {
    if (authUser?.role === "ADMIN") {
      getCreatedProblemsByAdmin();
    }
    getSolvedProblems();
    getUserPlayLists();
    getSubmissionsByUser();
  }, [
    authUser,
    getSolvedProblems,
    getUserPlayLists,
    getCreatedProblemsByAdmin,
    getSubmissionsByUser,
  ]);

  const handleEditDetails = async () => {
    await updateProfile({ userName, fullName });
    setEditing(false);
  };

  if (!isAuthenticated) {
    navigate({ to: "/auth/sign-in" });
    return;
  }

  const handleSignOut = async () => {
    await signout();
    navigate({ to: "/" });
  };

  const handleDeletePlayList = async (playListId: string) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      await deletePlayList(playListId);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30 px-2 py-1 text-xs rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              EASY
            </div>
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30 px-2 py-1 text-xs rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-1.5">
              <Target className="w-3 h-3" />
              MEDIUM
            </div>
          </Badge>
        );
      case "hard":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30 px-2 py-1 text-xs rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" /> HARD
            </div>
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "ACCEPTED" ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <XCircle className="w-4 h-4 text-red-400" />
    );
  };

  const safeParse = (data: string): string[] | null => {
    if (typeof data !== "string") return null;
    try {
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) &&
        parsedData.every((item) => typeof item === "string")
        ? parsedData
        : [];
    } catch {
      return [];
    }
  };

  const calculateAverage = (data: string[] | null): number => {
    if (!data?.length) return 0;

    const values = data
      .map((item) => parseFloat(item.split(" ")[0]))
      .filter((val) => !isNaN(val));

    return values.length
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
  };

  const formatDate = (dateValue?: string) => {
    if (!dateValue) return "";
    const formattedDate = new Date(dateValue).toLocaleDateString();
    return formattedDate;
  };

  const formatDateTime = (dateString: string) => {
    const dateTime = new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return dateTime;
  };

  if (!isAuthenticated) {
    navigate({ to: "/auth/sign-in" });
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/">
                    <Home className="w-10 h-10 text-purple-400" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              {authUser?.isEmailVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-950">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {authUser?.fullName}
                </h1>
                <p className="text-slate-400 text-lg">@{authUser?.userName}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{authUser?.email}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      authUser?.role === "ADMIN"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {authUser?.role}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                className="bg-red-600 text-white border-red-500/40 hover:bg-red-500/30 px-4 py-2 text-sm rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                Signout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${authUser?.role !== "ADMIN" ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6 mb-8`}
        >
          {userStats.map((stat, index) => {
            if (authUser?.role !== "ADMIN" && index === 3) {
              return null;
            }
            return (
              <div
                key={index}
                className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-200">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Account Information */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <User className="w-5 h-5 text-purple-400" />
              <span>Account Information</span>
            </h2>
            <div>
              <Button
                type="button"
                hidden={!editing}
                onClick={handleEditDetails}
                className="bg-green-600 text-white border-green-500/40 hover:bg-green-500/30 px-4 py-2 text-sm rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer mr-3"
              >
                <Save className="w-4 h-4" />
                Save changes
              </Button>
              <Button
                type="button"
                disabled={editing}
                onClick={() => setEditing(true)}
                className="bg-purple-600 text-white border-purple-500/40 hover:bg-purple-500/30 px-4 py-2 text-sm rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                Edit Details
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Username
                </label>
                <Input
                  id="username"
                  disabled={!editing}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200"
                  defaultValue={authUser?.userName}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Fullname
                </label>
                <Input
                  id="fullName"
                  disabled={!editing}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200"
                  defaultValue={authUser?.fullName}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Member Since
                </label>
                <Input
                  id="createdAt"
                  disabled
                  type="text"
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200"
                  defaultValue={formatDate(authUser?.createdAt)}
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-8" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Last Login
                </label>
                <Input
                  id="createdAt"
                  disabled
                  type="text"
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200"
                  defaultValue={formatDate(authUser?.updatedAt)}
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tabs */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "submissions", label: "Recent Submissions", icon: Code },
                { id: "playlists", label: "My Playlists", icon: BookOpen },
                { id: "solved", label: "Problems Solved", icon: Trophy },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-400"
                      : "border-transparent text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "submissions" && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 no-scrollbar">
                {memoizedTotalSubmissions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Award className="w-12 h-12 mb-3 opacity-40" />
                    <p className="font-medium text-slate-300">
                      No submissions yet
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Your submissions will appear here
                    </p>
                  </div>
                )}
                {memoizedTotalSubmissions.length > 0 &&
                  totalSubmissions.map((submission) => {
                    const avgMemory = calculateAverage(
                      safeParse(submission.memory || ""),
                    );
                    const avgTime = calculateAverage(
                      safeParse(submission.time || ""),
                    );
                    return (
                      <div
                        key={submission.id}
                        className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(submission.status)}
                            <h3 className="font-medium text-slate-200">
                              {submission.problemId}
                            </h3>
                          </div>
                          <span className="text-sm text-slate-400">
                            {formatDateTime(submission.createdAt)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-slate-400">
                          <span className="flex items-center space-x-1">
                            <Code className="w-3 h-3" />
                            <span>{submission.language}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{avgTime.toFixed(2)} s</span>
                          </span>
                          <span>{avgMemory.toFixed(2)} KB</span>
                          <span
                            className={`font-medium ${submission.status === "ACCEPTED" ? "text-green-400" : "text-red-400"}`}
                          >
                            {submission.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {activeTab === "playlists" && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 no-scrollbar">
                {memoizedUserFetchedPlayLists.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <ListX className="w-12 h-12 mb-3 opacity-40" />
                    <p className="font-medium text-slate-300">
                      No playlists yet
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Your playlists will appear here
                    </p>
                  </div>
                )}
                {memoizedUserFetchedPlayLists.length > 0 &&
                  memoizedUserFetchedPlayLists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Play className="w-4 h-4 text-purple-400" />
                          <h3 className="font-medium text-slate-200">
                            {playlist.name}
                          </h3>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 text-xs rounded-lg">
                            {playlist.problems.length} problems
                          </span>
                        </div>
                        <span className="text-sm text-slate-400">
                          Updated {formatDateTime(playlist.updatedAt)}
                        </span>
                      </div>
                      {playlist.description && (
                        <p className="text-sm text-slate-400 mb-2">
                          {playlist.description}
                        </p>
                      )}
                      <div className="text-xs text-slate-500">
                        Created {formatDateTime(playlist.createdAt)}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => handleDeletePlayList(playlist.id)}
                              disabled={isPlayListDeleting}
                              size="sm"
                              className="p-2.5 h-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500/60 rounded-lg transition-all duration-200 hover:scale-110 absolute bottom-4 right-4"
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
                  ))}
              </div>
            )}

            {activeTab === "solved" && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 no-scrollbar">
                {memoizedSolvedProblems.map((solved) => (
                  <div
                    key={solved.id}
                    className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <h3 className="font-medium text-slate-200">
                          {solved.title}
                        </h3>
                        <span>{getDifficultyBadge(solved.difficulty)}</span>
                      </div>
                      <span className="text-sm text-slate-400">
                        Solved {formatDateTime(solved.createdAt)}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {solved.tags.slice(0, 4).map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer ${
                            tagIndex % 3 === 0
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30"
                              : tagIndex % 3 === 1
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30"
                                : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30"
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {solved.tags.length > 4 && (
                        <span className="px-3 py-1.5 text-xs font-medium rounded-lg border">
                          +{solved.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
