import { Button } from "@/components/ui/button";
import { FileRoute, Link } from "@tanstack/react-router";
import { WebsocketTest } from "./-ws";

function WSPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <WebsocketTest />
      <Button variant="secondary">
        <Link to="/">Exit Socket</Link>
      </Button>
    </div>
  );
}

export const Route = new FileRoute("/ws/").createRoute({
  component: WSPage,
});
