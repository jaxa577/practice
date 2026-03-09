<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  throw new Error("Something went wrong");
});
</script>

<template>
  <div>This supposed to be shown but has promlem in it</div>
</template>
