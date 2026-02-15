<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";

const error = ref<Error | null>(null);

// Хук ловит любые ошибки в дочерних компонентах (даже в удаленных!)
onErrorCaptured((err) => {
  console.error("Captured by JonyBoundary:", err);
  error.value = err;
  return false; // Предотвращаем прокидывание ошибки выше
});
</script>

<template>
  <div v-if="error" class="error-placeholder">
    <h3>Упс! Компонент временно недоступен</h3>
    <button @click="error = null">Попробовать снова</button>
  </div>
  <slot v-else />
</template>

<style scoped>
.error-placeholder {
  padding: 20px;
  border: 2px dashed #ff4444;
  border-radius: 8px;
  background: #fff5f5;
  text-align: center;
}
</style>
