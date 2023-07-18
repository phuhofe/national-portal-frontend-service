import { EnvironmentName } from '@app/core/enums/environment-name.enum';
import { Environment, EnvironmentCookiesConfiguration } from './environment.interface';
import { sharedEnvironment } from './shared-environment';

// We use this environment when we build for Nova
export const environment: Environment = {
  production: true,
  name: EnvironmentName.NOVA,
  debug: {
    ngxs: false,
  },
  cookies: {
    configuration: EnvironmentCookiesConfiguration.nova,
  },
  customerSiteServiceApiBaseURL: 'https://api.minnesider.no/api/web/customer-site',
  portalServiceApiBaseURL: 'https://api.minnesider.no/api/web/portal',
  hostLink: 'https://minnesider.no',
  lokaliseStorageURL: 'https://lokalise-translation.s3.eu-central-1.amazonaws.com',
  apiGatewayURL: 'https://api.minnesider.no',
  ...sharedEnvironment,
  exportSettingsComponent: true,
};
