import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "@/components/Navbar/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
    </>
  ),

  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  ),

  errorComponent: ({ error }) => (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">Error!</h1>
      <p className="text-xl text-gray-600">Something went wrong.</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded text-sm text-red-700">
        {error.message}
      </pre>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  ),
});
