import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormComponent,
    SearchBarComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  formModel;

  constructor(private requestSubmittedService: RequestSubmittedService) {
    this.formModel = this.requestSubmittedService.date;
  }

  search(e) {
    console.log('search', e);
  }
  filter(e) {
    console.log('filter', e);
  }
}
