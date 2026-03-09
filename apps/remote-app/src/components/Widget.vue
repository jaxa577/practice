<script setup lang="ts">
import { ref, onMounted } from "vue";

const trackingId = ref("TRK-98234-UZ");
const status = ref<"loading" | "success" | "error">("loading");
const cargoInfo = ref<{ location: string; eta: string } | null>(null);

const fetchCargoData = async () => {
  status.value = "loading";
  try {
    await new Promise((res) => setTimeout(res, 1500));

    if (Math.random() > 0.8) throw new Error("API Logistics Timeout");

    cargoInfo.value = {
      location: "Tashkent Sorting Center",
      eta: "2026-03-12",
    };
    status.value = "success";
  } catch (e) {
    status.value = "error";
    throw e;
  }
};

onMounted(fetchCargoData);
</script>

<template>
  <article class="cargo-widget" aria-live="polite">
    <header>
      <h3>Отслеживание груза: {{ trackingId }}</h3>
    </header>

    <div v-if="status === 'loading'" role="status">
      <p>Синхронизация с сервером логистики...</p>
    </div>

    <div v-else-if="status === 'success' && cargoInfo" class="cargo-details">
      <div class="status-row">
        <strong>Текущая локация:</strong> <span>{{ cargoInfo.location }}</span>
      </div>
      <div class="status-row">
        <strong>Ожидаемое прибытие:</strong> <span>{{ cargoInfo.eta }}</span>
      </div>
      <button @click="fetchCargoData" aria-label="Обновить данные о грузе">
        Обновить
      </button>
    </div>
  </article>
</template>

<style scoped>
.cargo-widget {
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8f9fa;
  border-left: 5px solid #007bff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.status-row {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
