<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  title?: string;
  user?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Remote Dashboard",
  user: "Guest",
});

const count = ref(0);
const lastUpdated = ref(new Date().toLocaleTimeString());

const increment = () => {
  count.value++;
  lastUpdated.value = new Date().toLocaleTimeString();
};

onMounted(() => {
  console.log("Remote Widget mounted into Host!");
});
</script>

<template>
  <div class="remote-widget">
    <div class="widget-header">
      <h3>{{ props.title }}</h3>
      <span class="badge">Live</span>
    </div>

    <div class="widget-content">
      <p>
        Hello, <strong>{{ props.user }}</strong
        >!
      </p>
      <div class="counter-section">
        <span class="count">{{ count }}</span>
        <button @click="increment" class="remote-btn">Add click</button>
      </div>
      <p class="timestamp">Last updated: {{ lastUpdated }}</p>
    </div>
  </div>
</template>

<style scoped>
.remote-widget {
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 2px solid #42b883;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  max-width: 300px;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.badge {
  background: #42b883;
  color: white;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
}

.counter-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
}

.count {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.remote-btn {
  background: #35495e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s;
}

.remote-btn:active {
  transform: scale(0.95);
}

.timestamp {
  font-size: 11px;
  color: #95a5a6;
  margin: 0;
}
</style>
