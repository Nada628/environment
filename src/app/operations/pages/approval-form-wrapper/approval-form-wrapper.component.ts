import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApprovalFormComponent } from '@operations/components/approval-form/approval-form.component';

@Component({
  selector: 'app-approval-form-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    TranslateModule,
    ApprovalFormComponent,
  ],
  templateUrl: './approval-form-wrapper.component.html',
  styleUrl: './approval-form-wrapper.component.scss',
})
export class ApprovalFormWrapperComponent {}
