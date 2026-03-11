<script setup lang="ts">
import { useAuth } from "@jonyrepo/auth";
import { defineAsyncComponent } from "vue";
import { JLanguageSwitcher } from "@jonyrepo/ui";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const { t, n } = useI18n();
const { user, logout } = useAuth();
const CargoWidget = defineAsyncComponent(() => import("remote_app/Widget"));

const stats = computed(() => [
  {
    label: t("dashboard.active_loads"),
    value: n(12),
    icon: "📦",
  },
  {
    label: t("dashboard.pending_loads"),
    value: n(4),
    icon: "⏳",
  },
  {
    label: t("dashboard.completed_loads"),
    value: n(1280),
    icon: "✅",
  },
  {
    label: t("dashboard.rating"),
    value: user.value?.rating || "0.0",
    icon: "⭐",
  },
]);
</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="logo">JL.</div>
      <nav>
        <a href="#" class="active">Dashboard</a>
        <a href="#">My Loads</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </nav>
      <button @click="logout" class="logout-btn">Logout</button>
    </aside>

    <main class="content">
      <header class="top-bar">
        <div class="user-info">
          <h2>Welcome, {{ user?.email || "User" }}</h2>
          <span class="role-badge">{{ user?.role }}</span>
        </div>
        <div class="user-actions">
          <JLanguageSwitcher />
          <div class="user-avatar">{{ user?.email?.charAt(0) }}</div>
        </div>
      </header>

      <section class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <span class="icon">{{ stat.icon }}</span>
          <div>
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </div>
      </section>

      <section class="widget-section">
        <h3>Live Cargo Tracking</h3>
        <div class="widget-container">
          <Suspense>
            <CargoWidget />
            <template #fallback>
              <div class="loading-shimmer">Loading Micro-frontend...</div>
            </template>
          </Suspense>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: "Inter", sans-serif;
}
.sidebar {
  width: 240px;
  background: #1a202c;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
}
.sidebar .logo {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 40px;
  color: #3182ce;
}
nav {
  flex: 1;
  display: grid;
  gap: 10px;
  align-content: start;
}
nav a {
  color: #a0aec0;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  transition: 0.3s;
}
nav a.active,
nav a:hover {
  background: #2d3748;
  color: white;
}
.logout-btn {
  background: none;
  border: 1px solid #4a5568;
  color: #a0aec0;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 40px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.role-badge {
  background: #ebf8ff;
  color: #3182ce;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
.user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  background: #3182ce;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}
.stat-card .icon {
  font-size: 24px;
}
.stat-label {
  color: #718096;
  font-size: 14px;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
}

.widget-section h3 {
  margin-bottom: 20px;
  color: #2d3748;
}
.widget-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  min-height: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}
</style>
