// This file is only here so that local unit testing works.
// It gets replaced with the correct environment file by Angular.
// See angular.json and package.json in root dir

import { Environment } from './environment.interface';
import { environment as localEnvironment } from './environment.local';
import { sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  ...localEnvironment,
  ...sharedEnvironment,
};
