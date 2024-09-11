import { Component, Input } from '@angular/core';
import { CardData } from '@shared/model/card-data.model';

@Component({
  selector: 'app-admission-step-unit',
  templateUrl: './admission-step-unit.component.html',
  styleUrl: './admission-step-unit.component.scss',
})
export class AdmissionStepUnitComponent {
  @Input() cardData: CardData;
}
