import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@app/env';
import { settings as defaultSettingsJavaHut } from '../content/cookies-java-hut';
import { settings as defaultSettingsNova } from '../content/cookies-nova';
import { EnvironmentCookiesConfiguration } from 'src/environments/environment.interface';

@Pipe({
  name: 'privacyPolicyLinkPipe',
})
export class PrivacyPolicyLinkPipe implements PipeTransform {
  transform(companySlug: string): string {
    if (environment.cookies.configuration === EnvironmentCookiesConfiguration.nova) {
      return defaultSettingsNova.privacyPolicyLink;
    }

    return companySlug + defaultSettingsJavaHut.privacyPolicyLink;
  }
}
