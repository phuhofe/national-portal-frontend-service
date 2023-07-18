import { EnvironmentName } from '@app/core/enums/environment-name.enum';
import { Environment, EnvironmentCookiesConfiguration } from './environment.interface';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  production: false,
  name: EnvironmentName.TEST,
  debug: {
    ngxs: false,
  },
  cookies: {
    configuration: EnvironmentCookiesConfiguration['java-hut'],
  },
  customerSiteServiceApiBaseURL: 'https://test.api.minnesider.no/api/web/customer-site',
  portalServiceApiBaseURL: 'https://test.api.minnesider.no/api/web/portal',
  hostLink: 'https://national-portal-fe.test.ads1.itpartner.no',
  lokaliseStorageURL: 'https://lokalise-translation.s3.eu-central-1.amazonaws.com',
  apiGatewayURL: 'https://test.api.minnesider.no',
  memorialPageDynamicLink: 'https://test.omp.adstate.net/go-to/',
  ...sharedEnvironment,
};
