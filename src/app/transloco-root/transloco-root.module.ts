import { NgModule } from '@angular/core';

import { translocoConfig, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER } from '@ngneat/transloco';

import { environment } from '@app/env';
import { TranslocoLoaderService } from './transloco-loader.service';
import { defaultLanguages } from '@adstate_as/flora/esm2015/lib/language-switcher/language-switcher.component.js';

const availableLangs = defaultLanguages.map((language) => language.iso);

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs,
        defaultLang: 'en_GB',
        fallbackLang: 'en_GB',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoLoaderService },
  ],
})
export class TranslocoRootModule {}
