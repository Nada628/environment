import { FormService } from '@shared/services/form.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentAttachementComponent } from '../document-attachement/document-attachement.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicErrorComponent } from '@shared/components/dynamic-form/components/dynamic-error/dynamic-error.component';
import { Field } from '@shared/model/input.model';
import { DynamicDownloadComponent } from '@shared/components/dynamic-form/components/dynamic-field/components/dynamic-download/dynamic-download.component';

@Component({
  selector: 'app-attached-documents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DocumentAttachementComponent,
    SharedModule,
    DynamicErrorComponent,
    DynamicDownloadComponent,
  ],
  templateUrl: './attached-documents.component.html',
  styleUrl: './attached-documents.component.scss',
})
export class AttachedDocumentsComponent {
  @Input() header: string;
  @Input() model: any;
  @Input() checkerForm: boolean;
  @Input() case: boolean = true;
  formGroup: FormGroup;
  fields: Field[];

  constructor(private formService: FormService) {}
  ngOnInit() {
    let form = this.formService.buildForm(this.model, this.checkerForm);
    this.formGroup = form.formgroup;
    this.fields = form.fields;
  }
}
