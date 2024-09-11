import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldComponent } from '../../dynamic-field.component';
import { DynamicErrorComponent } from '../../../dynamic-error/dynamic-error.component';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
import { DynamicAttachmentComponent } from '../dynamic-attachment/dynamic-attachment.component';
import { DynamicRadioComponent } from '../dynamic-radio/dynamic-radio.component';
import { DynamicCheckboxComponent } from '../dynamic-checkbox/dynamic-checkbox.component';
import { DynamicSelectComponent } from '../dynamic-select/dynamic-select.component';
import { DynamicCheckerComponent } from '../dynamic-checker/dynamic-checker.component';
import { DynamicLabelComponent } from '../../../dynamic-label/dynamic-label.component';
import { Field } from '@shared/model/input.model';
import { DynamicShowAttachmentComponent } from '../dynamic-show-attachment/dynamic-show-attachment.component';
import { DynamicDownloadComponent } from '../dynamic-download/dynamic-download.component';

@Component({
  selector: 'app-dynamic-input-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFieldComponent,
    DynamicErrorComponent,
    DynamicInputComponent,
    DynamicAttachmentComponent,
    DynamicRadioComponent,
    DynamicCheckboxComponent,
    DynamicSelectComponent,
    DynamicCheckerComponent,
    DynamicLabelComponent,
    DynamicShowAttachmentComponent,
    DynamicDownloadComponent,
  ],
  templateUrl: './dynamic-input-group.component.html',
  styleUrl: './dynamic-input-group.component.scss',
})
export class DynamicInputGroupComponent {
  @Input() formName: FormGroup;
  nestedForm: FormGroup;
  @Input() checkerForm;
  @Input() field: Field;
  @Input() isReviewing: boolean;
  @Input() isInlineInput: boolean;
  ngOnInit() {
    this.nestedForm = this.formName.controls[this.field.fieldName] as FormGroup;
  }
}
