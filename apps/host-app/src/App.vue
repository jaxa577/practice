<script setup lang="ts">
import { onMounted } from "vue";
import HelloWorld from "./views/HelloWorld.vue";

onMounted(() => {
  console.log("[Host] Это сообщение должно исчезнуть после билда!");
});
</script>

<template>
  <HelloWorld />
</template>

<style scoped></style>
