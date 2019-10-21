import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from '@angular/common';
import {DoBootstrap, Injector, NgModule} from "@angular/core";
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
export class UiModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const el = createCustomElement(GreetingComponent, { injector: this.injector });
    customElements.define('ui-greeting', el);
  }
}
