<script setup lang="ts">
import { changeLanguage, globalLocale } from "@jonyrepo/i18n";

const languages = [
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
];

const setLanguage = (lang: string) => {
  changeLanguage(lang as "ru" | "uz");
};
</script>

<template>
  <div class="lang-picker">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="setLanguage(lang.code)"
      :class="['lang-btn', { active: globalLocale === lang.code }]"
    >
      <span class="flag">{{ lang.flag }}</span>
      <span class="label">{{ lang.label }}</span>
    </button>
  </div>
</template>
<style scoped>
.lang-picker {
  display: flex;
  background: #edf2f7;
  padding: 4px;
  border-radius: 12px;
  gap: 4px;
}
.lang-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
  font-weight: 500;
  color: #4a5568;
}
.lang-btn.active {
  background: white;
  color: #3182ce;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.flag {
  font-size: 16px;
}
</style>
