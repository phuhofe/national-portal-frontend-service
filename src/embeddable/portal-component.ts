import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@app/env';
import { PortalModule } from 'src/app/portal/portal.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(PortalModule)
  .catch((err) => console.error(err));
