import { createFileRoute } from "@tanstack/react-router";
import PlayListsPage from "@/pages/PlayListsPage";

export const Route = createFileRoute("/playlists/")({
  component: PlayListsPage,
});
