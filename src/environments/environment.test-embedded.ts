import { Environment } from './environment.interface';
import { environment as testEnvironment } from './environment.test';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  ...testEnvironment,
  ...sharedEnvironment,
  exportPortalComponent: true,
};
