import { CardData } from '@shared/model/card-data.model';
import { AdmissionStepsService } from '@public/services/addmission-steps.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admission-steps',
  templateUrl: './admission-steps.component.html',
  styleUrl: './admission-steps.component.scss',
})
export class AdmissionStepsComponent {
  admissionStepsCards: CardData[];

  constructor(private admissionStepsService: AdmissionStepsService) {
    this.admissionStepsCards = this.admissionStepsService.admissionStepsItems;
  }
}
