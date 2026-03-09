<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import * as Sentry from "@sentry/vue";

const props = defineProps<{ componentName?: string }>();
const error = ref<Error | null>(null);

onErrorCaptured((err, instance, info) => {
  error.value = err;

  Sentry.captureException(err, {
    extra: {
      component: props.componentName || "Unknown Component",
      info,
    },
  });

  return false;
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
