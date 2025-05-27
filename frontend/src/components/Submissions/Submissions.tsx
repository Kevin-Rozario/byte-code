import { type IExecuteOutput } from "@/stores/executeStore";
import { Award, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../ui/card";
const Submissions = ({ submissions }: { submissions: IExecuteOutput[] }) => {
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  };

  return (
    <div className="h-[calc(50vh-280px)] px-6 pb-6 overflow-y-auto no-scrollbar">
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-slate-400">
            <Award className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No submissions yet.</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-4 bg-slate-800 border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {submission.status === "Accepted" ? (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="font-medium text-slate-200">
                    {submission.status}
                  </span>
                </div>
                <span className="text-sm text-slate-400">
                  {formatTimeAgo(submission.updatedAt)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Language:</span>
                  <p className="font-medium text-slate-200">
                    {submission.language.charAt(0).toUpperCase() +
                      submission.language.slice(1)}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Runtime:</span>
                  <p className="font-medium text-purple-400">
                    {/* {submission.runtime} */}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Memory:</span>
                  <p className="font-medium text-cyan-400">
                    {submission.memory}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Submissions;
