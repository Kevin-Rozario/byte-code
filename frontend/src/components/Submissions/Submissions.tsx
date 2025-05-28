import { type ISubmission } from "@/stores/submissionStore";
import { Award, CheckCircle, XCircle } from "lucide-react";
import { Card } from "../ui/card";

const Submissions = ({
  submissions,
  isLoading,
}: {
  submissions: ISubmission[];
  isLoading: boolean;
}) => {
  const safeParse = (data: string): string[] | null => {
    if (typeof data !== "string") {
      return null;
    }
    try {
      const parsedData = JSON.parse(data);
      if (
        Array.isArray(parsedData) &&
        parsedData.every((item) => typeof item === "string")
      ) {
        return parsedData;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const calculateAverageMemory = (data: string[] | null): number => {
    if (!data || data.length === 0) {
      return 0;
    }

    const numericValues: number[] = [];
    for (const item of data) {
      const parts = item.split(" ");
      if (parts.length > 0) {
        const value = parseFloat(parts[0]);
        if (!isNaN(value)) {
          numericValues.push(value);
        }
      }
    }

    if (numericValues.length === 0) {
      return 0;
    }

    const sum = numericValues.reduce((a, b) => a + b, 0);
    return sum / numericValues.length;
  };

  const calculateAverageTime = (jsonString: string): number => {
    const parsedData = safeParse(jsonString);

    if (!parsedData || parsedData.length === 0) {
      return 0;
    }

    return calculateAverageMemory(parsedData);
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const submissionDate = new Date(timestamp);
    const timeDiff = now.getTime() - submissionDate.getTime();
    const minutesAgo = Math.floor(timeDiff / (1000 * 60));
    return `${minutesAgo} minutes ago`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-slate-400">
        <Award className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {submissions.length === 0 ? (
        <>
          <CheckCircle className="w-12 h-12 mb-4 opacity-50" />
          <p className="font-medium">No submissions yet.</p>
        </>
      ) : (
        submissions.map((submission) => {
          const avgMemory = calculateAverageMemory(
            safeParse(submission.memory || ""),
          );
          const avgTime = calculateAverageTime(submission.time || "");
          return (
            <Card
              key={submission.id}
              className="p-4 bg-slate-800 border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {submission.status === "Accepted" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 drop-shadow-lg mr-2 ml-2" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 drop-shadow-lg mr-2 ml-2" />
                  )}
                  <span
                    className={
                      submission.status === "Accepted"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  >
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
                    {avgTime} seconds
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Memory:</span>
                  <p className="font-medium text-cyan-400">
                    {avgMemory} kilobytes
                  </p>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </>
  );
};

export default Submissions;
