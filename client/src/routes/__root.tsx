import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = new RootRoute({
  component: () => (
    <main className="bg-black/90 flex flex-col justify-center items-center h-screen text-white">
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
});
