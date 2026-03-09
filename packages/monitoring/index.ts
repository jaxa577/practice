import * as Sentry from "@sentry/vue";
import type { App } from "vue";
import ErrorBoundary from "./ErrorBoundary.vue";

export function initMonitoring(app: App, appName: string) {
  Sentry.init({
    app,
    dsn: "https://f1d0f94d2e082b12821cf7ab7a167366@o4510962875629568.ingest.de.sentry.io/4510962879758416",

    initialScope: {
      tags: { "app.name": appName },
    },

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
  });
}

export { ErrorBoundary };   
