import { FileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

function WebSocketTest() {
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8080/foo");

    socket.addEventListener("open", () => {
      socket.send("connection established");
      console.log(`open event`);
    });
    socket.addEventListener("message", (e) => {
      console.log("Message from server: ", e.data);
    });
    socket.addEventListener("error", (e) => {
      console.log("WEBSOCKET ERROR", e);
    });

    return () => {
      socket.removeEventListener("open", () => {});
      socket.removeEventListener("message", () => {});
      socket.removeEventListener("error", () => {});
    };
  }, []);

  return (
    <div className="">
      Hello World!
      <button>HI</button>
    </div>
  );
}

export const Route = new FileRoute("/ws/").createRoute({
  component: WebSocketTest,
});
