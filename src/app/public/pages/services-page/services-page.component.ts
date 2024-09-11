import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, SubtitleComponent, SharedModule, TranslateModule],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
})
export class ServicesPageComponent {}
