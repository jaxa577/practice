<template>
  <button class="jony-btn">
    <slot />
  </button>
</template>

<style scoped>
.jony-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.jony-btn:hover {
  opacity: 0.8;
}
</style>
