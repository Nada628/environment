import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-accept-template-plant',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    AttachedDocumentsComponent,
    DigitalSealingFormComponent,
    SubmitButtonComponent,
    SubtitleComponent,
    RdfFormComponent,
    ReviewerFormComponent,
    TranslateModule
  ],
  templateUrl: './accept-template-plant.component.html',
  styleUrl: './accept-template-plant.component.scss'
})
export class AcceptTemplatePlantComponent implements OnInit{

  constructor(){
    
  }
  ngOnInit(): void {
    
}
}
