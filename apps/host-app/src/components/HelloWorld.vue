<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const RemoteWidget = defineAsyncComponent(() => import("remote_app/Widget"));
</script>

<template>
  <div>
    <h1>Host App</h1>
    <RemoteWidget />
    ad
  </div>
</template>
