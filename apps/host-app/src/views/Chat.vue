<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useChat } from "../composables/useChat";
import { useAuth } from "@jonyrepo/auth";

const { user } = useAuth();
const { messages, isSending, scrollRef, connect, sendMessage } = useChat();
const newMessage = ref("");

onMounted(() => connect());

const handleSend = async () => {
  if (!newMessage.value.trim()) return;
  const text = newMessage.value;
  newMessage.value = "";
  await sendMessage(text, user.value?.email || "Jony");
};
</script>

<template>
  <div class="chat-page">
    <div class="chat-container">
      <header class="chat-header">
        <div class="header-info">
          <div class="status-dot"></div>
          <div>
            <h2>Global Logistics Hub</h2>
            <p>Real-time coordination</p>
          </div>
        </div>
      </header>

      <div class="messages-area" ref="scrollRef">
        <div v-if="messages.length === 0" class="empty-state">
          <div class="empty-icon">💬</div>
          <p>No messages yet. Start the conversation!</p>
        </div>

        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message-wrapper', { mine: msg.user === user?.email }]"
        >
          <div class="message-bubble">
            <span class="message-user" v-if="msg.user !== user?.email">{{
              msg.user.split("@")[0]
            }}</span>
            <p class="message-text">{{ msg.text }}</p>
            <span class="message-time">{{
              new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>
          </div>
        </div>
      </div>

      <footer class="chat-footer">
        <div class="input-wrapper">
          <input
            v-model="newMessage"
            @keyup.enter="handleSend"
            :disabled="isSending"
            placeholder="Write a message..."
          />
          <button
            @click="handleSend"
            :disabled="isSending || !newMessage.trim()"
            class="send-btn"
          >
            <span v-if="!isSending">Send</span>
            <div v-else class="loader"></div>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  height: 100vh;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.chat-container {
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 20px 30px;
  border-bottom: 1px solid #f0f0f0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.header-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.status-dot {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
}
.chat-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}
.chat-header p {
  font-size: 13px;
  color: #64748b;
}

.messages-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-wrapper {
  display: flex;
  width: 100%;
}
.message-wrapper.mine {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 18px;
  border-radius: 18px;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  position: relative;
}

.mine .message-bubble {
  background: #3182ce;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-wrapper:not(.mine) .message-bubble {
  border-bottom-left-radius: 4px;
}

.message-user {
  font-size: 11px;
  font-weight: 700;
  color: #3182ce;
  display: block;
  margin-bottom: 4px;
}
.mine .message-user {
  color: #ebf8ff;
}
.message-text {
  font-size: 15px;
  line-height: 1.5;
}
.message-time {
  font-size: 10px;
  opacity: 0.6;
  display: block;
  margin-top: 5px;
  text-align: right;
}

.chat-footer {
  padding: 20px 30px;
  background: white;
  border-top: 1px solid #f0f0f0;
}
.input-wrapper {
  display: flex;
  gap: 15px;
  background: #f1f5f9;
  padding: 8px;
  border-radius: 15px;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 15px;
  font-size: 15px;
  outline: none;
}

.send-btn {
  background: #3182ce;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.send-btn:hover:not(:disabled) {
  background: #2b6cb0;
  transform: translateY(-1px);
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
