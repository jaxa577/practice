<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { ErrorBoundary } from "@jonyrepo/monitoring";

const RemoteCargoWidget = defineAsyncComponent(
  () => import("remote_app/Widget"),
);

const stats = [
  { label: "Активные перевозки", value: "12", color: "#007bff" },
  { label: "Доставлено (сегодня)", value: "45", color: "#28a745" },
  { label: "Задержки", value: "2", color: "#dc3545" },
];
</script>

<template>
  <div class="dashboard-layout">
    <nav class="top-nav">
      <div class="logo">Jony<span>Logistics</span></div>
      <div class="user-profile">Зафар Уралов</div>
    </nav>

    <div class="main-content">
      <section class="core-app">
        <header class="content-header">
          <h2>Обзор операций</h2>
          <p>Добро пожаловать в систему управления логистикой.</p>
        </header>

        <div class="stats-grid">
          <div v-for="item in stats" :key="item.label" class="stat-card">
            <span class="stat-value" :style="{ color: item.color }">{{
              item.value
            }}</span>
            <span class="stat-label">{{ item.label }}</span>
          </div>
        </div>

        <div class="recent-activity">
          <h3>Последние обновления</h3>
          <ul>
            <li>Посылка #UZ-998 прибыла в Ташкент</li>
            <li>Маршрут #KZ-102 оптимизирован</li>
          </ul>
        </div>
      </section>

      <aside class="sidebar-widgets">
        <ErrorBoundary componentName="CargoTracker">
          <Suspense>
            <template #default>
              <RemoteCargoWidget />
            </template>
            <template #fallback>
              <div class="skeleton-loader">Загрузка трекера...</div>
            </template>
          </Suspense>
        </ErrorBoundary>
      </aside>
    </div>
  </div>
</template>

<style>
:root {
  --bg-color: #f0f2f5;
  --card-bg: #ffffff;
  --primary: #007bff;
  --text-main: #333;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: var(--bg-color);
  color: var(--text-main);
}

.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
}
.logo span {
  color: var(--primary);
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  padding: 2rem;
  flex: 1;
}

.content-header {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
}
.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.recent-activity {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
}

.skeleton-loader {
  height: 200px;
  background: #e0e0e0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
