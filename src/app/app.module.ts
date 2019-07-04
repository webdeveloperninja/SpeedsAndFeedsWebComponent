import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    const element = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('speeds-and-feeds-calculator', element);
  }
}
