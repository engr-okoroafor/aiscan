import { io } from "socket.io-client";

export const initializeSocket = () => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
    transports: ["websocket"], // Use WebSocket for better performance
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};
