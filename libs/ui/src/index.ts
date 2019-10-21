import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {UiModule} from './lib/ui.module';

export * from './lib/ui.module';
export * from './lib/greeting.element';

platformBrowserDynamic()
  .bootstrapModule(UiModule);

