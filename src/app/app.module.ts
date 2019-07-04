import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpeedsAndFeedsComponent } from './infrastructure/speeds-and-feeds.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { ThemeModule } from './infrastructure/theme.module';

@NgModule({
  declarations: [SpeedsAndFeedsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ThemeModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  entryComponents: [SpeedsAndFeedsComponent]
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    const element = createCustomElement(SpeedsAndFeedsComponent, { injector: this.injector });
    customElements.define('speeds-and-feeds-calculator', element);
  }
}
