import { queryOptions } from "@tanstack/react-query";

type websocketAddress = `ws://${string}`;

async function connectToServer(address: websocketAddress) {
  const socket = new WebSocket(address);

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
}

export const socketQueryOptions = queryOptions({
  queryKey: ["socket"],
  queryFn: () => connectToServer("ws://127.0.0.1:8080/foo"),
});
