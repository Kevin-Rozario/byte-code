import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/settings/"!</div>;
}
