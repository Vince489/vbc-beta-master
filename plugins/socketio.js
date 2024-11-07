// socketio.js

import { io } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const socket = io("https://vbc-login-production.up.railway.app", {
    withCredentials: true, 
  }); 

  // Inject socket instance to Vue app
  nuxtApp.provide('socket', socket);

  socket.on("connect", () => {
    console.log("Connected to Socket.io server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.io server");
  });

  return socket;
});
