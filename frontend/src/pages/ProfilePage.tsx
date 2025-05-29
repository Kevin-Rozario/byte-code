import { useEffect, useState } from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { useProblemStore } from "@/stores/problemStore";
import { useSubmissionStore } from "@/stores/submissionStore";
import { usePlayListStore } from "@/stores/playlistStore";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const UserProfilePage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authUser = useAuthStore((state) => state.user);
  const signout = useAuthStore((state) => state.signout);
  const solvedProblems = useProblemStore((state) => state.solvedProblems);
  const getSolvedProblems = useProblemStore((state) => state.getSolvedProblems);
  const createdProblemsByAdmin = useProblemStore(
    (state) => state.createdProblems,
  );
  const getCreatedProblemsByAdmin = useProblemStore(
    (state) => state.getCreatedProblems,
  );
  const userFetchedPlayLists = usePlayListStore((state) => state.userPlayLists);
  const getUserPlayLists = usePlayListStore(
    (state) => state.getPlayListsByUserId,
  );
  const totalSubmissions = useSubmissionStore(
    (state) => state.submissionsByUser,
  );
  const [activeTab, setActiveTab] = useState("submissions");
  const navigate = useNavigate();

  // Mock data based on your database schema
  const userData = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    userName: "codeMaster2024",
    email: "john.doe@example.com",
    fullName: "John Doe",
    isEmailVerified: true,
    role: "USER",
    createdAt: "2024-01-15T10:30:00Z",
    updateAt: "2024-05-20T14:45:00Z",
    problemsSolved: 47,
    totalSubmissions: 89,
    totalPlaylists: 3,
    totalProblemsCreated: 2,
  };

  // Mock submissions data
  const submissions = [
    {
      id: "sub1",
      problem: {
        title: "Two Sum",
        difficulty: "EASY",
        tags: ["Amazon", "Google", "Microsoft"],
      },
      language: "JavaScript",
      status: "ACCEPTED",
      memory: "42.1 MB",
      time: "68 ms",
      createdAt: "2024-05-20T10:30:00Z",
    },
    {
      id: "sub2",
      problem: {
        title: "Binary Tree Inorder",
        difficulty: "MEDIUM",
        tags: ["Facebook", "Apple", "Flipkart"],
      },
      language: "Python",
      status: "WRONG_ANSWER",
      memory: "38.5 MB",
      time: "124 ms",
      createdAt: "2024-05-19T15:45:00Z",
    },
    {
      id: "sub3",
      problem: {
        title: "Merge Intervals",
        difficulty: "MEDIUM",
        tags: ["Google", "Uber", "LinkedIn"],
      },
      language: "JavaScript",
      status: "ACCEPTED",
      memory: "45.2 MB",
      time: "92 ms",
      createdAt: "2024-05-18T09:20:00Z",
    },
  ];

  // Mock playlists data
  const playlists = [
    {
      id: "pl1",
      name: "Array Problems",
      description: "Collection of array manipulation problems",
      problemCount: 15,
      createdAt: "2024-04-10T08:00:00Z",
      updatedAt: "2024-05-15T12:30:00Z",
    },
    {
      id: "pl2",
      name: "Dynamic Programming",
      description: "Advanced DP problems for interview prep",
      problemCount: 23,
      createdAt: "2024-03-20T14:15:00Z",
      updatedAt: "2024-05-10T16:45:00Z",
    },
    {
      id: "pl3",
      name: "Graph Algorithms",
      description: null,
      problemCount: 8,
      createdAt: "2024-05-01T11:20:00Z",
      updatedAt: "2024-05-18T09:10:00Z",
    },
  ];

  // Mock problems solved data
  const problemsSolved = [
    {
      id: "ps1",
      problem: {
        title: "Two Sum",
        difficulty: "EASY",
        tags: ["Amazon", "Google", "Microsoft"],
      },
      createdAt: "2024-05-20T10:30:00Z",
    },
    {
      id: "ps2",
      problem: {
        title: "Merge Intervals",
        difficulty: "MEDIUM",
        tags: ["Google", "Uber", "LinkedIn"],
      },
      createdAt: "2024-05-18T09:20:00Z",
    },
    {
      id: "ps3",
      problem: {
        title: "Valid Parentheses",
        difficulty: "EASY",
        tags: ["Facebook", "Bloomberg", "Spotify"],
      },
      createdAt: "2024-05-17T14:15:00Z",
    },
    {
      id: "ps4",
      problem: {
        title: "Longest Substring",
        difficulty: "MEDIUM",
        tags: ["Amazon", "Netflix", "Atlassian"],
      },
      createdAt: "2024-05-16T16:45:00Z",
    },
  ];

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/auth/sign-in" });
      return;
    }
    if (authUser?.role === "ADMIN") {
      getCreatedProblemsByAdmin();
    }
    getSolvedProblems();
    getUserPlayLists();
  }, [
    authUser,
    isAuthenticated,
    navigate,
    getSolvedProblems,
    getUserPlayLists,
    getCreatedProblemsByAdmin,
  ]);

  const handleSignOut = async () => {
    await signout();
    navigate({ to: "/" });
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

  const companyColors = {
    Amazon: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Google: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Microsoft: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    Facebook: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    Apple: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    Netflix: "bg-red-500/20 text-red-400 border-red-500/30",
    Uber: "bg-green-500/20 text-green-400 border-green-500/30",
    LinkedIn: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    Flipkart: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Bloomberg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Spotify: "bg-green-400/20 text-green-300 border-green-400/30",
    Atlassian: "bg-blue-400/20 text-blue-300 border-blue-400/30",
  } as const;

  type CompanyName = keyof typeof companyColors;

  const getCompanyTagColor = (company: string) => {
    return (
      companyColors[company as CompanyName] ||
      "bg-slate-600/20 text-slate-400 border-slate-600/30"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                className="bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30 px-4 py-2 text-sm rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer"
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
          <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <User className="w-5 h-5 text-purple-400" />
            <span>Account Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Username
                </label>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                  <span className="text-slate-200">{userData.userName}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-slate-200">{userData.email}</span>
                  {userData.isEmailVerified ? (
                    <span className="text-green-400 text-sm font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="text-red-400 text-sm font-medium">
                      Unverified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Member Since
                </label>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-200">
                    {formatDate(userData.createdAt)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Last Updated
                </label>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-200">
                    {formatDate(userData.updateAt)}
                  </span>
                </div>
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
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(submission.status)}
                        <h3 className="font-medium text-slate-200">
                          {submission.problem.title}
                        </h3>
                        <span>
                          {getDifficultyBadge(submission.problem.difficulty)}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {formatDateTime(submission.createdAt)}
                      </span>
                    </div>

                    {/* Company Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {submission.problem.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs font-medium border ${getCompanyTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {submission.problem.tags.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-slate-600/20 text-slate-400 border border-slate-600/30">
                          +{submission.problem.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Code className="w-3 h-3" />
                        <span>{submission.language}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{submission.time}</span>
                      </span>
                      <span>{submission.memory}</span>
                      <span
                        className={`font-medium ${submission.status === "ACCEPTED" ? "text-green-400" : "text-red-400"}`}
                      >
                        {submission.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "playlists" && (
              <div className="space-y-4">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Play className="w-4 h-4 text-purple-400" />
                        <h3 className="font-medium text-slate-200">
                          {playlist.name}
                        </h3>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                          {playlist.problemCount} problems
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
                  </div>
                ))}
              </div>
            )}

            {activeTab === "solved" && (
              <div className="space-y-4">
                {problemsSolved.map((solved) => (
                  <div
                    key={solved.id}
                    className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <h3 className="font-medium text-slate-200">
                          {solved.problem.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(solved.problem.difficulty)}`}
                        >
                          {solved.problem.difficulty}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">
                        Solved {formatDateTime(solved.createdAt)}
                      </span>
                    </div>

                    {/* Company Tags */}
                    <div className="flex flex-wrap gap-2">
                      {solved.problem.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs font-medium border ${getCompanyTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {solved.problem.tags.length > 4 && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-slate-600/20 text-slate-400 border border-slate-600/30">
                          +{solved.problem.tags.length - 4} more
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
