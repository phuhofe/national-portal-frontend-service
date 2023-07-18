import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): any {
  return () => {
    // keycloak.init({
    //   config: {
    //     url: environment.keycloakRedirectURL,
    //     realm: environment.realm,
    //     clientId: environment.clientId,
    //   },
    //   initOptions: {
    //     onLoad: 'check-sso',
    //     silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    //   },
    //   enableBearerInterceptor: false,
    // }).catch(e => console.log(`keycloak init exception: ${e}`));
  };
}
