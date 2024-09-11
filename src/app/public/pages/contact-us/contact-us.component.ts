import { ContactUsService } from './../../services/contact-us.service';
import { ContactUsDetails } from '../../models/contact-us.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { LocationMapComponent } from '@public/components/location-map/location-map.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  providers: [ContactUsService],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    LocationMapComponent,
    SubtitleComponent,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  contactUsDetails: ContactUsDetails[];
  constructor(private contactUsService: ContactUsService) {
    this.contactUsDetails = this.contactUsService.contactUsDetails;
  }
}
