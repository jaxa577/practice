import { createApp } from "vue";
import { initMonitoring } from "@jonyrepo/monitoring";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import { i18n } from "@jonyrepo/i18n";

const app = createApp(App);
initMonitoring(app, "host-app");
app.use(router);
app.use(i18n);
app.use(vue3GoogleLogin, {
  clientId:
    "539416241380-ep4cfcbdsjel7rvjo3a0msg69fu7e3u3.apps.googleusercontent.com",
});
app.mount("#app");
