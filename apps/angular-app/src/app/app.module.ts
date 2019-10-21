import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {UiModule} from "@nx-example/ui";
import '@smart-elements';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";

const config: SocketIoConfig = {
  url: ':4001',
  options: {}
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiModule,
    RouterModule.forRoot([], {initialNavigation: 'enabled'}),
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
