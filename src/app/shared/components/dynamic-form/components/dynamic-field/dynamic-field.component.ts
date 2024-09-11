import { DynamicTextareaComponent } from './components/dynamic-textarea/dynamic-textarea.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicCheckboxComponent } from './components/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';
import { DynamicRadioComponent } from './components/dynamic-radio/dynamic-radio.component';
import { DynamicSelectComponent } from './components/dynamic-select/dynamic-select.component';
import { DynamicAttachmentComponent } from './components/dynamic-attachment/dynamic-attachment.component';
import { DynamicInputGroupComponent } from './components/dynamic-input-group/dynamic-input-group.component';
import { DocumentAttachementComponent } from '../../../../../operations/components/document-attachement/document-attachement.component';
import { DynamicLabelComponent } from '../dynamic-label/dynamic-label.component';
import { Field } from '@shared/model/input.model';
import { DynamicShowAttachmentComponent } from './components/dynamic-show-attachment/dynamic-show-attachment.component';
import { DynamicDownloadComponent } from './components/dynamic-download/dynamic-download.component';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicCheckboxComponent,
    DynamicRadioComponent,
    DynamicInputComponent,
    DynamicSelectComponent,
    DynamicAttachmentComponent,
    DynamicInputGroupComponent,
    DocumentAttachementComponent,
    DynamicLabelComponent,
    DynamicTextareaComponent,
    DynamicShowAttachmentComponent,
    DynamicDownloadComponent,
  ],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss',
})
export class DynamicFieldComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;
  @Input() checkerForm;
  @Input() isReviewing: boolean;
  @Input() isInlineInput: boolean;
  @Input() isDisabled: boolean;

  ngOnInit() {}
}
