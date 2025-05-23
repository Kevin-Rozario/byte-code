import React, { useState } from "react";
import {
  Calendar,
  Trophy,
  Target,
  Code2,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  ExternalLink,
  Edit3,
  Award,
  TrendingUp,
  Activity,
  Flame,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Assume these types are defined globally or imported from a shared types file
// For demonstration, they are defined here.
interface UserProfileData {
  id: number;
  userName: string;
  email: string;
  avatar: string | null;
  joinDate: string;
  location: string | null;
  website: string | null;
  bio: string | null;
  rank: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalSolved: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  contestRating: number;
  badges: Array<{ id: number; name: string; icon: string; color: string }>;
}

interface RecentActivityItem {
  id: number;
  type: "solved" | "attempted";
  problem: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  status: "accepted" | "wrong_answer" | "pending";
}

interface SkillItem {
  name: string;
  level: number;
  color: string;
}

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data - This would be populated from your backend API (e.g., /api/v1/user/profile)
  const user: UserProfileData = {
    id: 1,
    userName: "CodeMaster",
    email: "codemaster@bytecode.dev",
    avatar: null, // Placeholder, replace with actual avatar URL if available
    joinDate: "2024-01-15",
    location: "San Francisco, CA",
    website: "https://codemaster.dev",
    bio: "Full-stack developer passionate about algorithms and clean code. Always learning, always coding.",
    rank: "Expert",
    level: 42,
    xp: 15680,
    xpToNext: 3320,
    streak: 15,
    totalSolved: 247,
    easyCount: 89,
    mediumCount: 124,
    hardCount: 34,
    contestRating: 1847,
    badges: [
      {
        id: 1,
        name: "Problem Solver",
        icon: "🏆",
        color: "from-yellow-400 to-orange-500",
      },
      {
        id: 2,
        name: "Streak Master",
        icon: "🔥",
        color: "from-red-400 to-pink-500",
      },
      {
        id: 3,
        name: "Speed Demon",
        icon: "⚡",
        color: "from-blue-400 to-cyan-500",
      },
      {
        id: 4,
        name: "Algorithm Expert",
        icon: "🧠",
        color: "from-purple-400 to-indigo-500",
      },
    ],
  };

  // Mock recent activity - This would be populated from your backend API (e.g., /api/v1/user/activity)
  const recentActivity: RecentActivityItem[] = [
    {
      id: 1,
      type: "solved",
      problem: "Two Sum",
      difficulty: "Easy",
      time: "2 hours ago",
      status: "accepted",
    },
    {
      id: 2,
      type: "solved",
      problem: "Binary Tree Traversal",
      difficulty: "Medium",
      time: "5 hours ago",
      status: "accepted",
    },
    {
      id: 3,
      type: "attempted",
      problem: "Merge K Sorted Lists",
      difficulty: "Hard",
      time: "1 day ago",
      status: "wrong_answer",
    },
    {
      id: 4,
      type: "solved",
      problem: "Valid Parentheses",
      difficulty: "Easy",
      time: "2 days ago",
      status: "accepted",
    },
    {
      id: 5,
      type: "solved",
      problem: "Longest Substring",
      difficulty: "Medium",
      time: "3 days ago",
      status: "accepted",
    },
  ];

  // Mock skills data - This could be derived from problem categories solved or user input
  const skills: SkillItem[] = [
    { name: "Algorithms", level: 85, color: "from-purple-500 to-blue-500" },
    { name: "Data Structures", level: 78, color: "from-blue-500 to-cyan-500" },
    {
      name: "Dynamic Programming",
      level: 72,
      color: "from-cyan-500 to-teal-500",
    },
    { name: "Graph Theory", level: 68, color: "from-teal-500 to-green-500" },
    { name: "System Design", level: 65, color: "from-green-500 to-yellow-500" },
  ];

  const getDifficultyColor = (difficulty: RecentActivityItem["difficulty"]) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const getStatusIcon = (status: RecentActivityItem["status"]) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "wrong_answer":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-2xl blur-3xl"></div>
          <Card className="relative bg-slate-900/80 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-purple-950/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-purple-500/30 shadow-2xl shadow-purple-500/20">
                      <AvatarImage
                        src={user.avatar || undefined}
                        alt={user.userName}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl font-bold">
                        {user.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-600/50 text-purple-300 hover:bg-purple-900/20 hover:border-purple-500/80"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                {/* User Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {user.userName}
                    </h1>
                    {user.bio && (
                      <p className="text-slate-300 text-lg mb-4 max-w-2xl">
                        {user.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined{" "}
                        {new Date(user.joinDate).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      {user.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {user.location}
                        </span>
                      )}
                      {user.website && (
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-4 w-4" />
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Portfolio
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                      <div className="text-2xl font-bold text-white mb-1">
                        {user.totalSolved}
                      </div>
                      <div className="text-slate-400 text-sm">
                        Problems Solved
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {user.rank}
                      </div>
                      <div className="text-slate-400 text-sm">Current Rank</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                      <div className="text-2xl font-bold text-orange-400 mb-1 flex items-center gap-1">
                        <Flame className="h-5 w-5" />
                        {user.streak}
                      </div>
                      <div className="text-slate-400 text-sm">Day Streak</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">
                        {user.contestRating}
                      </div>
                      <div className="text-slate-400 text-sm">
                        Contest Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mt-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
              >
                Progress
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
              >
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Problem Solving Stats */}
                <Card className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      Problem Solving Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Level Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300">
                            Level {user.level}
                          </span>
                          <span className="text-slate-400">
                            {user.xp}/{user.xp + user.xpToNext} XP
                          </span>
                        </div>
                        <Progress
                          value={(user.xp / (user.xp + user.xpToNext)) * 100}
                          className="h-3 bg-slate-800 bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      {/* Difficulty Breakdown */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/20">
                          <div className="text-2xl font-bold text-green-400 mb-1">
                            {user.easyCount}
                          </div>
                          <div className="text-green-300 text-sm">Easy</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                          <div className="text-2xl font-bold text-yellow-400 mb-1">
                            {user.mediumCount}
                          </div>
                          <div className="text-yellow-300 text-sm">Medium</div>
                        </div>
                        <div className="text-center p-4 bg-red-400/10 rounded-lg border border-red-400/20">
                          <div className="text-2xl font-bold text-red-400 mb-1">
                            {user.hardCount}
                          </div>
                          <div className="text-red-300 text-sm">Hard</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-cyan-400" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300 text-sm">
                              {skill.name}
                            </span>
                            <span className="text-slate-400 text-sm">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(activity.status)}
                          <div>
                            <div className="text-white font-medium">
                              {activity.problem}
                            </div>
                            <div className="text-slate-400 text-sm">
                              {activity.time}
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={`${getDifficultyColor(activity.difficulty)} border`}
                        >
                          {activity.difficulty}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Placeholder Tabs for future expansion */}
            <TabsContent value="progress">
              <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                <CardContent className="p-8 text-center">
                  <Code2 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Progress Analytics
                  </h3>
                  <p className="text-slate-400">
                    Detailed progress charts and analytics coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                <CardContent className="p-8 text-center">
                  <GitBranch className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Activity Timeline
                  </h3>
                  <p className="text-slate-400">
                    Comprehensive activity timeline coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    Badges & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`relative p-6 bg-gradient-to-br ${badge.color} rounded-xl text-white text-center group hover:scale-105 transition-transform duration-300`}
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="font-semibold">{badge.name}</div>
                        {/* Optional: Add a tooltip or description on hover for badges */}
                        <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-sm p-2">
                          {/* Badge description could go here */}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
