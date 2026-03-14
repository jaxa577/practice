import { ref, onUnmounted, nextTick } from "vue";
import { io, Socket } from "socket.io-client";

export const useChat = () => {
  const socket = ref<Socket | null>(null);
  const messages = ref<any[]>([]);
  const isConnected = ref(false);
  const isSending = ref(false);
  const scrollRef = ref<HTMLElement | null>(null);

  const scrollToBottom = async () => {
    await nextTick();
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }
  };

  const connect = () => {
    socket.value = io("http://localhost:3001");

    socket.value.on("connect", () => {
      isConnected.value = true;
    });

    socket.value.on("message", (data) => {
      messages.value.push(data);
      scrollToBottom();
    });
  };

  const sendMessage = async (text: string, userEmail: string) => {
    if (!text.trim() || isSending.value) return;

    isSending.value = true;
    try {
      // Имитируем небольшую задержку для плавности UI
      await new Promise((resolve) => setTimeout(resolve, 300));

      socket.value?.emit("message", {
        text,
        user: userEmail,
        timestamp: new Date().toISOString(),
      });
    } finally {
      isSending.value = false;
    }
  };

  onUnmounted(() => socket.value?.disconnect());

  return { messages, isConnected, isSending, scrollRef, connect, sendMessage };
};
