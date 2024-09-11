import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicCheckerComponent } from '../dynamic-checker/dynamic-checker.component';
import { Field } from '@shared/model/input.model';
import { FormService } from '@shared/services/form.service';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicCheckerComponent,
  ],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent implements OnInit {
  @Input() formName: FormGroup;
  @Input() field: Field;

  passwordsMatch: boolean = true;


  ngOnInit() {}

  checkPasswords() {
    this.passwordsMatch =
      this.formName.controls['password'].value ===
      this.formName.controls['confirmPassword'].value;
  }

  // Method to check for max value validation error
  hasMaxValueError(): boolean {
    return (
      this.formName.controls[this.field.fieldName]?.errors?.['maxValue'] || false
    );
  }
}
