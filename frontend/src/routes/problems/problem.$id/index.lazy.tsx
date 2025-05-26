import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/problems/problem/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/problems/problem/$id/"!</div>;
}
