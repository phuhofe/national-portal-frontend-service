import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SettingsModule } from 'src/app/settings/settings.module';
import { environment } from '@app/env';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(SettingsModule)
  .catch((err) => console.error(err));
