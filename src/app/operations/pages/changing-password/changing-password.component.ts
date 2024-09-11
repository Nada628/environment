import { ChangingPasswordService } from './../../services/changing-password.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { TranslationService } from 'app/language/translation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changing-password',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    SharedModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    IsRequiredPipe,
    NzButtonModule,
  ],
  templateUrl: './changing-password.component.html',
  styleUrl: './changing-password.component.scss',
})
export class ChangingPasswordComponent {
  newPassword;
  confirmPassword;
  constructor(
    private changingPasswordService: ChangingPasswordService,
    private ts: ToastrService
  ) {}

  onSubmit() {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword == this.confirmPassword) {
        this.changingPasswordService
          .changingPassword({
            password: this.newPassword,
            confirm_password: this.confirmPassword,
          })
          .subscribe({
            next: (res) => {
              this.newPassword = '';
              this.confirmPassword = '';
              this.ts.success(res['error']);
            },
            error: (err) => {
              this.ts.error(err['error']);
            },
          });
      } else {
        this.ts.warning('Passwords do not match');
      }
    } else {
      this.ts.warning('Please fill all fields');
    }
  }
}
