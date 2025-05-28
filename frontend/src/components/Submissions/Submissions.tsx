import { type ISubmission } from "@/stores/submissionStore";
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  HardDrive,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const Submissions = ({
  submissions,
  isLoading,
}: {
  submissions: ISubmission[];
  isLoading: boolean;
}) => {
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

  const formatTimeAgo = (timestamp: string): string => {
    const minutes = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 60000,
    );
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent mb-3"></div>
        <p className="text-sm font-medium">Loading submissions...</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Award className="w-12 h-12 mb-3 opacity-40" />
        <p className="font-medium text-slate-300">No submissions yet</p>
        <p className="text-sm text-slate-500 mt-1">
          Your submissions will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      {submissions.map((submission) => {
        const avgMemory = calculateAverage(safeParse(submission.memory || ""));
        const avgTime = calculateAverage(safeParse(submission.time || ""));
        const isAccepted = submission.status === "ACCEPTED";

        return (
          <Card
            key={submission.id}
            className={`p-4 border transition-all duration-200 hover:shadow-lg ${
              isAccepted
                ? "bg-emerald-950/20 border-emerald-800/30 hover:border-emerald-700/50"
                : "bg-red-950/20 border-red-800/30 hover:border-red-700/50"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {isAccepted ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <span
                    className={`font-semibold ${
                      isAccepted ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {submission.status}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                      {submission.language.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(submission.updatedAt)}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                <Zap className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs text-slate-400">Runtime</p>
                  <p className="font-mono text-sm text-purple-400">
                    {avgTime > 0 ? `${avgTime.toFixed(3)}s` : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Memory</p>
                  <p className="font-mono text-sm text-cyan-400">
                    {avgMemory > 0 ? `${avgMemory.toFixed(1)} KB` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Submissions;
