import { ServiceEvaluationService } from './../../services/service-evaluation.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DropDownItem } from '@shared/model/dropDown.model';
import { StarRatingComponent } from '@operations/components/star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { ServiceEvaluationForm } from '@operations/models/customerForm.model';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';

@Component({
  selector: 'app-service-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    StarRatingComponent,
    FormsModule,
    DynamicFormComponent,
    BtnDropdownComponent,
  ],
  templateUrl: './service-evaluation.component.html',
  styleUrl: './service-evaluation.component.scss',
})
export class ServiceEvaluationComponent {
  @ViewChild('form') form!: ElementRef;
  dropDownList: DropDownItem[];
  rate: number;
  dropDownItem: string;
  formModel: ServiceEvaluationForm;

  constructor(private serviceEvaluationService: ServiceEvaluationService) {
    this.dropDownList = this.serviceEvaluationService.dropDownList;
    this.formModel = this.serviceEvaluationService.formModel;
  }

  getDropDownItem(e) {
    this.dropDownItem = e;
    console.log(e);
  }

  getRate(rating: number) {
    this.rate = rating;
    console.log(this.rate);
  }

  onSubmit() {
    let suggestion = this.form['dynamicFormGroup'].value;
    let rating = { rateStar: this.rate, ...suggestion };
    this.serviceEvaluationService
      .sendingEvaluation(rating)
      .subscribe((res) => console.log(res));
  }
}
