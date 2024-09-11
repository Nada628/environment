import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { RegisterSectionComponent } from './components/register-section/register-section.component';
import { LoginComponent } from './pages/login/login.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';

@NgModule({
  providers: [],
  declarations: [
    LoginComponent,
    LoginSectionComponent,
    RegisterSectionComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LoginRoutingModule,
    SubtitleComponent,
    ReactiveFormsModule,
    BtnDropdownComponent,
    SelectDropdownComponent
  ],
})
export class LoginModule {}
