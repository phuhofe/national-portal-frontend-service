import { EnvironmentName } from '@app/core/enums/environment-name.enum';

export interface Environment {
  production: boolean;
  name: EnvironmentName;
  exportPortalComponent: boolean;
  exportSettingsComponent: boolean;
  customerSiteServiceApiBaseURL: string;
  portalServiceApiBaseURL: string;
  lokaliseStorageURL: string;
  apiGatewayURL: string;
  hostLink: string;
  keycloakRedirectURL: string;
  fakeUrl: string;
  realm: string;
  clientId: string;
  kubernetes: boolean;
  memorialPageDynamicLink: string;
  sentry: {
    enabled: boolean;
    feedbackDialog: boolean;
    dsn: string;
    tracesSampleRate: number;
    tracingOrigins: string[];
  };
  debug: {
    ngxs: boolean;
  };
  cookies: {
    configuration: EnvironmentCookiesConfiguration;
  };
}

export enum EnvironmentCookiesConfiguration {
  'java-hut',
  'nova',
}
