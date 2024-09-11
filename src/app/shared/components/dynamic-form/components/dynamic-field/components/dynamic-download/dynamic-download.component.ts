import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '@shared/model/input.model';
import { SharedModule } from '@shared/shared.module';
import { DynamicCheckerComponent } from '../dynamic-checker/dynamic-checker.component';

@Component({
  selector: 'app-dynamic-download',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicCheckerComponent,
  ],
  templateUrl: './dynamic-download.component.html',
  styleUrl: './dynamic-download.component.scss',
})
export class DynamicDownloadComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;

  downloadURI() {
    var link = document.createElement('a');
    link.download = this.field.fieldName;
    link.href = this.field.value;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
