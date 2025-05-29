import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Playlist</DialogTitle>
          <DialogDescription>
            Create a new playlist to organize your problems
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter playlist name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name?.message && (
              <p className="text-red-400 text-sm mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter playlist description (optional)"
              {...register("description")}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit(handleFormSubmit)} className="flex-1">
              Create
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

export default CreatePlaylistModal;
