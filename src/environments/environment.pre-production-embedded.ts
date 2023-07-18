import { Environment } from './environment.interface';
import { environment as preProductionEnvironment } from './environment.pre-production';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  ...preProductionEnvironment,
  ...sharedEnvironment,
  exportPortalComponent: true,
};
