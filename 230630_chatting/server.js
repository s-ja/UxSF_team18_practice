const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("새로운 클라이언트가 연결되었습니다.");

  socket.on("message", (message) => {
    console.log("새로운 메시지:", message);
    io.emit("message", message);
  });

  // 클라이언트 연결 해제 처리
  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 해제하였습니다.");
  });
});

server.listen(3001, () => {
  console.log("서버가 3001 포트에서 실행 중입니다.");
});

console.log();