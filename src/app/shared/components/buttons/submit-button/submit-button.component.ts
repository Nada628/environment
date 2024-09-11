import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss',
})
export class SubmitButtonComponent {
  @Input() buttonName: string;
  @Output() submitFormData = new EventEmitter<string>();
  @Input() class: string = 'gradient';
  @Input() i: string;

  onSubmit() {
    this.submitFormData.emit();
  }
}
