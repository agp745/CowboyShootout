import { useEffect, useState } from "react";

export function WebsocketTest() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_ADDR);

    ws.onopen = () => {
      ws.send("Hello Server!");
      console.log("sent message");
      setData((prev) => [...prev, "Message Sent"]);
    };
    ws.onmessage = (e) => {
      console.log("Message from Server ->", e.data);
      setData((prev) => [...prev, e.data]);
    };
    ws.onerror = (e) => {
      console.log(e);
      setData((prev) => [...prev, "ERROR"]);
    };
    ws.onclose = () => {
      console.log("conn closed");
      setData((prev) => [...prev, "conn closed"]);
    };
  }, []);

  return (
    <ul className="flex flex-col justify-center, items-center gap-2">
      {data.map((message, id) => {
        return (
          <div key={id}>
            <span className="font-bold">{new Date().toLocaleString()} </span>
            {message}
          </div>
        );
      })}
    </ul>
  );
}
