import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '@shared/model/input.model';
import { FormService } from '@shared/services/form.service';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-waste-percentage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
  ],
  templateUrl: './waste-percentage.component.html',
  styleUrl: './waste-percentage.component.scss',
})
export class WastePercentageComponent {
  @Input() model: any;
  @Input() checkerForm: boolean;
  formGroup: FormGroup;
  fields: Field[];
  constructor(private formService: FormService) {}
  ngOnInit() {
    let form = this.formService.buildForm(this.model, this.checkerForm);
    this.formGroup = form.formgroup;
    this.fields = form.fields;
  }
}
