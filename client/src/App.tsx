export default function App() {
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

  return (
    <div className="bg-black/90 flex flex-col h-screen justify-center items-center text-white">
      Hello World!
      <button>HI</button>
    </div>
  );
}
