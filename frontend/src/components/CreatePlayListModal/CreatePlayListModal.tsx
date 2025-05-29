import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type CreatePlayListArgs } from "@/stores/playlistStore";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePlayListArgs) => void;
}

const CreatePlaylistModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreatePlaylistModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlayListArgs>();

  const handleFormSubmit = (data: CreatePlayListArgs) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-0 bg-gradient-to-br from-slate-950 via-purple-950/90 to-indigo-950/80 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-cyan-400/5 rounded-full blur-lg animate-ping"></div>
        </div>

        <div className="relative z-10">
          <DialogHeader className="space-y-4 pb-6">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Create Playlist
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-base leading-relaxed">
              Create a new playlist to organize your problems and keep them
              structured
            </DialogDescription>
          </DialogHeader>

          {/* Name */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-slate-200 font-medium text-sm tracking-wide"
              >
                Playlist Name
              </Label>

              <input
                id="name"
                type="text"
                placeholder="Enter playlist name"
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-4 py-3.5 text-slate-200 text-sm 
                         placeholder:text-slate-500 
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 
                         hover:border-slate-600/70 hover:bg-slate-900/90
                         transition-all duration-300 ease-in-out
                         shadow-lg shadow-slate-950/50"
              />

              {errors.name?.message && (
                <div className="flex items-center space-x-2 animate-in slide-in-from-left-2 duration-200">
                  <svg
                    className="w-4 h-4 text-red-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-400 text-sm font-medium">
                    {String(errors.name.message)}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-slate-200 font-medium text-sm tracking-wide"
              >
                Description (Optional)
              </Label>

              <textarea
                id="description"
                placeholder="Enter playlist description (optional)"
                rows={3}
                {...register("description")}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-4 py-3.5 text-slate-200 text-sm 
                         placeholder:text-slate-500 
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 
                         hover:border-slate-600/70 hover:bg-slate-900/90
                         transition-all duration-300 ease-in-out
                         shadow-lg shadow-slate-950/50 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSubmit(handleFormSubmit)}
                className="flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 
                         hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 
                         text-white font-semibold py-3 px-6 rounded-xl 
                         shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40
                         transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 ease-in-out
                         border-0 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Create Playlist</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </Button>

              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 border-slate-600/50 bg-slate-800/50 backdrop-blur-sm
                         text-slate-200 hover:text-white
                         hover:bg-slate-700/70 hover:border-slate-500/70
                         py-3 px-6 rounded-xl font-semibold
                         shadow-lg shadow-slate-950/25
                         transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 ease-in-out"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistModal;
