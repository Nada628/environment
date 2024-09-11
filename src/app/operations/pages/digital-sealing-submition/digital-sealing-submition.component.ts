import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-digital-sealing-submition',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './digital-sealing-submition.component.html',
  styleUrl: './digital-sealing-submition.component.scss',
})
export class DigitalSealingSubmitionComponent {}
