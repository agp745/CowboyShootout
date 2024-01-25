import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const component = function Home() {
  return (
    <div className="">
      <Link to="/ws">
        <Button variant="secondary">Connect to Websocket!!</Button>
      </Link>
      <Link to="/test">
        <Button variant="secondary">Query Test</Button>
      </Link>
    </div>
  );
};
