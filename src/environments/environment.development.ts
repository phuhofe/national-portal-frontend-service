import { EnvironmentName } from '@app/core/enums/environment-name.enum';
import { Environment, EnvironmentCookiesConfiguration } from './environment.interface';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  production: false,
  name: EnvironmentName.DEVELOPMENT,
  debug: {
    ngxs: false,
  },
  cookies: {
    configuration: EnvironmentCookiesConfiguration['java-hut'],
  },
  customerSiteServiceApiBaseURL: 'https://development.api.minnesider.no/api/web/customer-site',
  portalServiceApiBaseURL: 'https://development.api.minnesider.no/api/web/portal',
  hostLink: 'https://national-portal-fe.development.ads1.itpartner.no',
  lokaliseStorageURL: 'https://lokalise-translation.s3.eu-central-1.amazonaws.com',
  apiGatewayURL: 'https://development.api.minnesider.no',
  memorialPageDynamicLink: 'https://dev.omp.adstate.net/go-to/',
  ...sharedEnvironment,
};
