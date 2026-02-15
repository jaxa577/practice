<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import ErrorBoundary from "@jonyrepo/monitoring/ErrorBoundary.vue";
const RemoteWidget = defineAsyncComponent(() => import("remote_app/Widget"));
</script>

<template>
  <div>
    <h1>Main Application (Host)</h1>
    <ErrorBoundary>
      <Suspense>
        <template #default>
          <RemoteWidget title="Sales statistics" user="Jony" />
        </template>
        <template #fallback>
          <div>Загрузка удаленного модуля...</div>
        </template>
      </Suspense>
    </ErrorBoundary>
  </div>
</template>
  