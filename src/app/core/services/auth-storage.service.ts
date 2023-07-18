import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

import { AuthStorageModel } from '../models/auth-storage-model';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  authEnum = 'auth';
  isLoggedIn: boolean;

  constructor(
    private readonly keycloak: KeycloakService
  ) {
    this.getTokenFromKeyCloak();

    this.isAuthenticated()
      .pipe()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  private saveToStorage(authInfo: AuthStorageModel): void {
    window.localStorage[this.authEnum] = JSON.stringify(authInfo);
  }

  isAuthenticated(): Observable<boolean> {
    return from(this.keycloak.isLoggedIn());
  }

  isAuthenticatedPromise(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  getLoggedInUserPromise(): Promise<KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }

  getLoggedInUser(): Observable<KeycloakProfile> {
    return from(this.keycloak.loadUserProfile());
  }

  getFromStorage(): AuthStorageModel {
    const authInfo = window.localStorage[this.authEnum];

    return authInfo ? JSON.parse(authInfo) as AuthStorageModel : undefined;
  }

  saveAuthInformation(authInfo: AuthStorageModel): void {
    this.saveToStorage(authInfo);
  }

  removeAuthInformation(): void {
    window.localStorage.removeItem('auth');
  }

  getToken(): string {
    const authInfo = this.getFromStorage();

    return authInfo ? authInfo.token : '';
  }

  updateToken(token: string): void {
    const authInfo = this.getFromStorage();
    this.saveToStorage({...authInfo, token});
  }

  getTokenFromKeyCloak(): Observable<any> {
    if (this.isLoggedIn) {

      this.keycloak.updateToken();

      const isTokenExpired = this.keycloak.isTokenExpired(0);

      if (!isTokenExpired) {
        from(this.keycloak.updateToken(50)).subscribe(updatedToken => {
          if (updatedToken) {
            return from(this.keycloak.getToken()).subscribe(newToken => {
              console.log('new token', newToken);
            });
          }
        });
      }

      return from(this.keycloak.getToken());
    }

    return of(null);
  }
}
