import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RoutingHeaderComponent } from './components/header/components/routing-header/routing-header.component';
import { FooterContentComponent } from './components/footer/components/footer-content/footer-content.component';
import { FooterCopyrightComponent } from './components/footer/components/footer-copyright/footer-copyright.component';
import { MainHeaderComponent } from './components/header/components/main-header/main-header.component';
import { SearchBarComponent } from './components/header/components/search-bar/search-bar.component';
import { MenuHeaderComponent } from './components/header/components/menu-header/menu-header.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Intercepter } from '../interceptors/interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: Intercepter, multi: true },
  ],
  declarations: [
    HeaderComponent,
    RoutingHeaderComponent,
    MainContentComponent,
    FooterComponent,
    FooterContentComponent,
    FooterCopyrightComponent,
    LayoutPageComponent,
    MainHeaderComponent,
    SearchBarComponent,
    MenuHeaderComponent,
    LogoComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    BtnComponent,
    BtnDropdownComponent,
  ],
  exports: [],
})
export class LayoutModule {}
