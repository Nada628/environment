import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateDefaultParser } from '@ngx-translate/core';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TxtIconComponent } from './components/txt-icon/txt-icon.component';
import { ServiceCardComponent } from './components/cards/service-card/service-card.component';
import { SharedServicesComponent } from './components/shared-services/shared-services.component';



@NgModule({
  declarations: [
    SharedServicesComponent,
    ServiceCardComponent,
    TxtIconComponent,
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
    SharedServicesComponent,
    ServiceCardComponent,
    TxtIconComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [
    TranslateDefaultParser,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class SharedModule {}
