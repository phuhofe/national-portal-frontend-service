import { Environment } from './environment.interface';
import { environment as productionEnvironment } from './environment.production';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  ...productionEnvironment,
  ...sharedEnvironment,
  exportPortalComponent: true,
};
