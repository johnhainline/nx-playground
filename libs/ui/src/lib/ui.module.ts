import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from '@angular/common';
import {Injector, NgModule} from "@angular/core";
import {createCustomElement} from '@angular/elements';
import {GreetingComponent} from "./greeting.element";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [GreetingComponent],
  entryComponents: [GreetingComponent],
  bootstrap: []
})
export class UiModule {
  constructor(private injector: Injector) {
    const element = createCustomElement(GreetingComponent, { injector: this.injector });
    customElements.define('ui-greeting', element);
  }
}
