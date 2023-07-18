import { Environment } from './environment.interface';
import { environment as localEnvironment } from './environment.local';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  ...localEnvironment,
  ...sharedEnvironment,
  exportPortalComponent: true,
};
