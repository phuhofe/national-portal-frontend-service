// Environment variables that are the same accross all environments
export const sharedEnvironment = {
  keycloakRedirectURL: 'http://localhost:8080/auth',
  fakeUrl: 'http://localhost:3000',
  realm: 'demo',
  clientId: 'my-app',
  kubernetes: false,
  sentry: {
    enabled: true,
    feedbackDialog: true,
    dsn: 'https://0fa6b45ffd6b4a41a7fd28b7d2cc1363@o432648.ingest.sentry.io/6108081',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // Sentry recommends adjusting this value in production
    tracesSampleRate: 0.005,
    tracingOrigins: [
      'localhost',
      'https://national-portal-fe.development.ads1.itpartner.no',
      'https://national-portal-fe.test.ads1.itpartner.no',
    ],
  },
  exportPortalComponent: false,
  exportSettingsComponent: false,
};
