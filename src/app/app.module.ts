import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './core/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), provideAnimationsAsync(), { provide: NZ_I18N, useValue: en_US }, provideHttpClient() // Toastr providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
