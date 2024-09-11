import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { Field } from '@shared/model/input.model';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './dynamic-checkbox.component.html',
  styleUrl: './dynamic-checkbox.component.scss',
})
export class DynamicCheckboxComponent {
  @Input() field: Field;
  @Input() formName: FormGroup;
}
