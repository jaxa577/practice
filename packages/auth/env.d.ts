/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Добавляем все твои переменные сюда, чтобы TS их "узнал"
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
