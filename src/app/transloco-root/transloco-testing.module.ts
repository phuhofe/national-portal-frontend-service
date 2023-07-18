import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import * as en from '../../assets/locale/en_GB.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}): TranslocoTestingModule {
  return TranslocoTestingModule.forRoot({
    langs: { en },
    translocoConfig: {
      availableLangs: ['en'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
