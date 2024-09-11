import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-dynamic-show-attachment',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dynamic-show-attachment.component.html',
  styleUrl: './dynamic-show-attachment.component.scss',
})
export class DynamicShowAttachmentComponent {}
