import { createApp } from "vue";
import { initMonitoring } from "@jonyrepo/monitoring";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
initMonitoring(app, "host-app");
app.mount("#app");
