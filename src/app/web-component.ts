import { ApplicationRef, DoBootstrap, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { environment } from '@app/env';

let hasBeenDefined = false;
export abstract class WebComponentModule implements DoBootstrap {

  constructor(injector: Injector, component: InstanceType<any>, name: string) {
    const isExportSettingsComponent = environment.exportSettingsComponent;

    if (isExportSettingsComponent && !hasBeenDefined) {
      hasBeenDefined = true;
      this.createCustomElement(component, injector, name);
    }
  }

  ngDoBootstrap(appRef: ApplicationRef): void { }

  createCustomElement(component: InstanceType<any>, injector: Injector, name: string): void {
    const ngElement = createCustomElement(component, {
      injector,
    });

    customElements.define(name, ngElement);
  }
}
