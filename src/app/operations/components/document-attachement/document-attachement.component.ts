import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-document-attachement',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './document-attachement.component.html',
  styleUrl: './document-attachement.component.scss',
})
export class DocumentAttachementComponent {
  @Input() formName: FormGroup;
  @Input() field: any;
  fileName;

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
