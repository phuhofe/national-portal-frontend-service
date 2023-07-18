import { JwtService } from './jwt.service';
import { AuthStorageService } from './auth-storage.service';
import { LocalStorageService } from '../web-storage';

export {
  AuthStorageService,
  LocalStorageService,
  JwtService
};

export const SERVICES = [
  AuthStorageService,
  LocalStorageService,
  JwtService
];
