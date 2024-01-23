import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/test/").createRoute({
  component: Test,
});

function Test() {
  return <div className="p-2">Hello from TEST!</div>;
}
