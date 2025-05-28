import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  MinusCircle,
  PenSquare,
  PlayCircle,
  PlusCircle,
  Trash2,
  Search,
  Filter,
  Tag,
  TrendingUp,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { type IProblem } from "@/stores/problemStore";
import toast from "react-hot-toast";

const ProblemTable = ({ problems }: { problems: IProblem[] }) => {
  const authUser = useAuthStore((state) => state.user);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState("All Tags");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [currentPage, setCurrentPage] = useState(1);
  const [playList, setPlayList] = useState<string[]>([]);

  const tableHeads = ["Status", "Title", "Tags", "Difficulty", "Actions"];

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagSet = new Set<string>();
    problems.forEach((problem) => {
      problem.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((problem) =>
        difficulty === "All Difficulties"
          ? true
          : problem.difficulty.toUpperCase() === difficulty.toUpperCase(),
      )
      .filter((problem) =>
        selectedTags === "All Tags"
          ? true
          : problem.tags?.includes(selectedTags),
      );
  }, [problems, selectedTags, difficulty, search]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(start, start + itemsPerPage);
  }, [filteredProblems, currentPage]);

  const handleDeleteProblem = (id: string) => {
    // Delete problem
    console.log("Deleting problem with ID:", id);
  };

  const handleTogglePlayList = (id: string, isInPlayList: boolean) => {
    if (!authUser) {
      console.log("You must be logged in to add to play list");
      toast.error("You must be logged in to add to play list");
      return;
    }

    const updatedPlayList = [...playList];
    if (isInPlayList) {
      const index = updatedPlayList.indexOf(id);
      if (index !== -1) {
        updatedPlayList.splice(index, 1);
      }
    } else {
      updatedPlayList.push(id);
    }
    setPlayList(updatedPlayList);
    console.log(updatedPlayList);
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return <Zap className="w-3 h-3" />;
      case "MEDIUM":
        return <Target className="w-3 h-3" />;
      case "HARD":
        return <TrendingUp className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="mb-5">
          {/* Filter Section */}
          <div className="w-full max-w-7xl mx-auto flex justify-between items-end gap-8 p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl">
            {/* Search bar */}
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label
                htmlFor="search"
                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
              >
                <Search className="w-4 h-4 text-purple-400" />
                Search Problems
              </Label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex h-9 flex-1/3 rounded-xl border border-slate-600/50 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-200 group-hover:border-slate-500/70"
                placeholder="Search by title..."
                type="text"
                id="search"
              />
            </div>

            {/* Difficulty level */}
            <div className="grid w-1/3 items-center gap-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Filter className="w-4 h-4 text-blue-400" />
                Difficulty Level
              </Label>
              <Select onValueChange={(value) => setDifficulty(value)}>
                <SelectTrigger className="w-full h-12 rounded-xl border-slate-600/50 bg-slate-800/70 text-slate-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:border-slate-500/70">
                  <SelectValue placeholder={difficulty} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 rounded-xl">
                  <SelectItem
                    value="All Difficulties"
                    className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                  >
                    All Difficulties
                  </SelectItem>
                  <SelectItem
                    value="EASY"
                    className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      Easy
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="MEDIUM"
                    className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Target className="w-3 h-3 text-amber-400" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="HARD"
                    className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-red-400" />
                      Hard
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="grid w-1/3 items-center gap-3">
              <Label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Tag className="w-4 h-4 text-cyan-400" />
                Filter by Tags
              </Label>
              <Select onValueChange={(value) => setSelectedTags(value)}>
                <SelectTrigger className="w-full h-12 rounded-xl border-slate-600/50 bg-slate-800/70 text-slate-200 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 hover:border-slate-500/70">
                  <SelectValue placeholder={selectedTags} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 rounded-xl">
                  <SelectItem
                    value="All Tags"
                    className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                  >
                    All Tags
                  </SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem
                      key={tag}
                      value={tag}
                      className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                    >
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Create Playlist Button*/}
        <div className="flex justify-end items-center h-12 p-2 mb-5">
          {playList.length > 0 && (
            <Link to="/">
              <Button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <PlusCircle className="w-4 h-4" />
                Create Playlist
              </Button>
            </Link>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/70 border border-slate-700/50 backdrop-blur-sm shadow-2xl">
          <Table className="w-full">
            <TableCaption className="text-slate-400 text-base py-6 bg-slate-800/40 border-t border-slate-700/50">
              Discover and solve coding problems to enhance your skills
            </TableCaption>
            <TableHeader>
              <TableRow className="border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-700/60 hover:bg-slate-800/60">
                {tableHeads.map((head) => (
                  <TableHead
                    key={head}
                    className="text-left text-slate-200 font-semibold text-sm py-5 px-6 first:rounded-tl-2xl last:rounded-tr-2xl"
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProblems.length > 0 ? (
                (console.log(paginatedProblems),
                paginatedProblems.map((problem) => (
                  <TableRow
                    key={problem.id}
                    className="border-slate-700/30 hover:bg-slate-800/40 transition-all duration-200 group"
                  >
                    <TableCell className="font-medium py-5 px-6">
                      <div className="flex items-center">
                        {authUser?.id &&
                        problem.solvedBy?.includes(authUser.id) ? (
                          <div className="relative">
                            <CheckCircle className="w-6 h-6 text-emerald-400 drop-shadow-lg" />
                            <div className="absolute inset-0 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm animate-pulse"></div>
                          </div>
                        ) : (
                          <CheckCircle className="w-6 h-6 text-slate-600 group-hover:text-slate-500 transition-colors duration-200" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <div className="group/title cursor-pointer">
                        <div className="font-semibold text-slate-200 group-hover/title:text-purple-400 transition-colors duration-200 text-base">
                          {problem.title}
                        </div>
                        <div className="w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover/title:w-full transition-all duration-300 mt-1"></div>
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-2 flex-wrap items-center py-5 px-6">
                      {problem.tags.map((tag, tagIndex) => (
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
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      {problem.difficulty === "EASY" ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30 px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
                          <div className="flex items-center gap-1.5">
                            {getDifficultyIcon(problem.difficulty)}
                            EASY
                          </div>
                        </Badge>
                      ) : problem.difficulty === "MEDIUM" ? (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30 px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
                          <div className="flex items-center gap-1.5">
                            {getDifficultyIcon(problem.difficulty)}
                            MEDIUM
                          </div>
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30 px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
                          <div className="flex items-center gap-1.5">
                            {getDifficultyIcon(problem.difficulty)}
                            HARD
                          </div>
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center flex gap-3 py-5 px-6">
                      {authUser?.role === "ADMIN" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={"/problems/problem/$id"}
                                params={{ id: problem.id }}
                              >
                                <Button
                                  size="sm"
                                  className="p-2.5 h-auto bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 border border-blue-500/40 hover:border-blue-500/60 rounded-lg transition-all duration-200 hover:scale-110"
                                >
                                  <PenSquare className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Edit Problem</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {authUser?.role === "ADMIN" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() => handleDeleteProblem(problem.id)}
                                size="sm"
                                className="p-2.5 h-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500/60 rounded-lg transition-all duration-200 hover:scale-110"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Delete Problem</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to="/problems/problem/$id"
                              params={{ id: problem.id }}
                            >
                              <Button
                                size="sm"
                                className="p-2.5 h-auto bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 border border-purple-500/40 hover:border-purple-500/60 rounded-lg transition-all duration-200 hover:scale-110"
                              >
                                <PlayCircle className="w-4 h-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Solve Problem</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() =>
                                handleTogglePlayList(
                                  problem.id,
                                  playList.includes(problem.id),
                                )
                              }
                              size="sm"
                              className={`p-2.5 h-auto border rounded-lg transition-all duration-200 hover:scale-110 ${
                                playList.includes(problem.id)
                                  ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border-red-500/40 hover:border-red-500/60"
                                  : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border-emerald-500/40 hover:border-emerald-500/60"
                              }`}
                            >
                              {playList.includes(problem.id) ? (
                                <MinusCircle className="w-4 h-4" />
                              ) : (
                                <PlusCircle className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {playList.includes(problem.id)
                              ? "Remove from playlist"
                              : "Add to playlist"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                )))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-slate-700/30 rounded-full">
                        <Search className="w-8 h-8 text-slate-500" />
                      </div>
                      <div>
                        <div className="text-slate-300 font-semibold text-lg mb-1">
                          No problems found
                        </div>
                        <div className="text-slate-500">
                          Try adjusting your search criteria or filters
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter />
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 px-6 py-5 bg-gradient-to-r from-slate-900/80 to-slate-800/60 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400 font-medium">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredProblems.length,
                )}{" "}
                to{" "}
                {Math.min(currentPage * itemsPerPage, filteredProblems.length)}{" "}
                of {filteredProblems.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  size="sm"
                  className="p-2.5 h-auto bg-slate-700/50 hover:bg-slate-600/60 text-slate-300 hover:text-slate-200 border border-slate-600/50 hover:border-slate-500/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      size="sm"
                      className={`px-4 py-2.5 h-auto text-sm font-semibold transition-all duration-200 hover:scale-105 rounded-lg ${
                        currentPage === page
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg border border-purple-500/50"
                          : "bg-slate-700/50 hover:bg-slate-600/60 text-slate-300 hover:text-slate-200 border border-slate-600/50 hover:border-slate-500/70"
                      }`}
                    >
                      {page}
                    </Button>
                  ),
                )}

                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  size="sm"
                  className="p-2.5 h-auto bg-slate-700/50 hover:bg-slate-600/60 text-slate-300 hover:text-slate-200 border border-slate-600/50 hover:border-slate-500/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 rounded-lg"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemTable;
