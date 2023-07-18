import {Injectable} from '@angular/core';

const APP_PREFIX = 'APP__';

@Injectable()
export class SessionStorageService {
  private storage: Storage;

  constructor() {
    if (!window.sessionStorage) {
      throw new Error('Current browser does not support session storage');
    }
    this.storage = localStorage;
  }

  exists(key: string): boolean {
    return !!this.storage.getItem(`${APP_PREFIX}${key}`);
  }

  getItem(key: string): string {
    const result = this.storage.getItem(`${APP_PREFIX}${key}`);

    if (result === undefined || result == null) {
      return null;
    }

    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    return this.storage.removeItem(`${APP_PREFIX}${key}`);
  }

  clear(): void {
    return this.storage.clear();
  }
}
