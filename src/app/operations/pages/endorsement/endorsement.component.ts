import { EndorsementService } from './../../services/endorsement.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';

@Component({
  selector: 'app-endorsement',
  standalone: true,
  imports: [CommonModule, SharedModule, SubtitleComponent],
  templateUrl: './endorsement.component.html',
  styleUrl: './endorsement.component.scss',
})
export class EndorsementComponent {
  orgData;
  constructor(private endorsementService: EndorsementService) {
    this.orgData = this.endorsementService.endorsementData;
  }
}
