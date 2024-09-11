import { AddButtonComponent } from '@shared/components/buttons/add-button/add-button.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Field } from '@shared/model/input.model';

@Component({
  selector: 'app-dynamic-attachment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AddButtonComponent,
    FormsModule,
  ],
  templateUrl: './dynamic-attachment.component.html',
  styleUrl: './dynamic-attachment.component.scss',
})
export class DynamicAttachmentComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;
  fileName;

  // handleCategoryBanner(files) {
  //   this.numberOfFiles = files.length;
  //   let data = new FormData();
  //   let fileItem = files[0];
  //   data.append(files[0].name, fileItem);
  // }

  onFileChange(files, inputElementId) {
    if (files[0]) {
      this.fileName = files[0].name;
      const formControlName = inputElementId; // Set the form control name dynamically
      const formControlValue = files[0]; // File to set in the form control
      this.formName.patchValue({
        [formControlName]: formControlValue,
      });
    }
  }
}
