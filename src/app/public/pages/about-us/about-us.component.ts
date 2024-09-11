import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, SubtitleComponent, TranslateModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
