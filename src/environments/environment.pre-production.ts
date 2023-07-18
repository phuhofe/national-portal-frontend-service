import { EnvironmentName } from '@app/core/enums/environment-name.enum';
import { Environment, EnvironmentCookiesConfiguration } from './environment.interface';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  production: false,
  name: EnvironmentName.PRE_PRODUCTION,
  debug: {
    ngxs: false,
  },
  cookies: {
    configuration: EnvironmentCookiesConfiguration['java-hut'],
  },
  customerSiteServiceApiBaseURL: 'https://pre-production.api.minnesider.no/api/web/customer-site',
  portalServiceApiBaseURL: 'https://pre-production.api.minnesider.no/api/web/portal',
  hostLink: 'https://national-portal-fe.pre-production.ads1.itpartner.no',
  lokaliseStorageURL: 'https://lokalise-translation.s3.eu-central-1.amazonaws.com',
  apiGatewayURL: 'https://pre-production.api.minnesider.no',
  ...sharedEnvironment,
};
