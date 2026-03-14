import Fastify from "fastify";
import cors from "@fastify/cors"; // Используем import вместо require
import { Server } from "socket.io";

const fastify = Fastify({ logger: true });

// Регистрируем корс правильно для ESM
await fastify.register(cors, {
  origin: "*",
});

const start = async () => {
  try {
    // Порт 3001, чтобы не конфликтовать с фронтендом
    await fastify.listen({ port: 3001, host: "0.0.0.0" });

    const io = new Server(fastify.server, {
      cors: {
        origin: "*", // Разрешаем фронтенду подключаться
      },
    });

    console.log("🚀 Jony, Chat Server started on port 3001");

    io.on("connection", (socket) => {
      console.log("👤 User connected:", socket.id);

      // Обработка сообщений
      socket.on("message", (data) => {
        console.log("📩 New message from client:", data);

        // Рассылаем сообщение всем подключенным клиентам
        io.emit("message", {
          ...data,
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
        });
      });

      socket.on("disconnect", () => {
        console.log("❌ User disconnected");
      });
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
