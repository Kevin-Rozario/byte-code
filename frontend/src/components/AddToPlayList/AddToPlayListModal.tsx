import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type AddToPlayListArgs } from "@/stores/playlistStore";

interface AddToPlayListProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddToPlayListArgs) => void;
}

const AddToPlayListModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddToPlayListProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddToPlayListArgs>();

  const handleFormSubmit = (data: AddToPlayListArgs) => {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Playlist</DialogTitle>
          <DialogDescription>
            Add a problem to an existing playlist
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="problemId">Problem ID</Label>
            <Input
              id="problemId"
              placeholder="Enter problem ID"
              {...register("problemIds", {
                required: "Problem ID is required",
              })}
            />
            {errors.problemIds?.message && (
              <p className="text-red-400 text-sm mt-1">
                {String(errors.problemIds.message)}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="playlistId">Playlist ID</Label>
            <Input
              id="playlistId"
              placeholder="Enter playlist ID"
              {...register("playlistId", {
                required: "Playlist ID is required",
              })}
            />
            {errors.playlistId?.message && (
              <p className="text-red-400 text-sm mt-1">
                {String(errors.playlistId.message)}
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit(handleFormSubmit)} className="flex-1">
              Add
            </Button>
            <Button onClick={handleClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlayListModal;
