import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '@shared/services/form.service';
import { DynamicCheckboxComponent } from '@shared/components/dynamic-form/components/dynamic-field/components/dynamic-checkbox/dynamic-checkbox.component';
import { Field } from '@shared/model/input.model';

@Component({
  selector: 'app-digital-sealing-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DynamicCheckboxComponent,
  ],
  templateUrl: './digital-sealing-form.component.html',
  styleUrl: './digital-sealing-form.component.scss',
})
export class DigitalSealingFormComponent {
  @Input() header: string;
  @Input() model: any;
  formGroup: FormGroup;
  fields: Field[];

  constructor(private formService: FormService) {}
  ngOnInit() {
    this.formGroup = this.formService.buildForm(this.model, false).formgroup;
    this.fields = this.formService.buildForm(this.model, false).fields;
  }
}
