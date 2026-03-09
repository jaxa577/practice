import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");

    return worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }
  return Promise.resolve();
}

prepareApp().then(() => {
  createApp(App).mount("#app");
});
