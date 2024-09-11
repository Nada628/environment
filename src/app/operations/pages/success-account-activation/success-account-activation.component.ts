import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';

@Component({
  selector: 'app-success-account-activation',
  standalone: true,
  imports: [CommonModule, SharedModule, SubmitButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './success-account-activation.component.html',
  styleUrl: './success-account-activation.component.scss',
})
export class SuccessAccountActivationComponent {
  userName: string = 'Mohamed Ali';
  password: string = '231457';
}
