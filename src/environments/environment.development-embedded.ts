import { Environment } from './environment.interface';
import { environment as developmentEnvironment } from './environment.development';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  ...developmentEnvironment,
  ...sharedEnvironment,
  exportPortalComponent: true,
};
