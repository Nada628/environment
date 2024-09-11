import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '@shared/model/input.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-dynamic-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './dynamic-textarea.component.html',
  styleUrl: './dynamic-textarea.component.scss',
})
export class DynamicTextareaComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;
}
