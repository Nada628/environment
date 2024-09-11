import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './pages/main/main.component';
import { SwiperComponent } from './components/swiper/swiper.component';

// Swiper
import { register } from 'swiper/element/bundle';
import { SharedModule } from '@shared/shared.module';
import { PublicRoutingModule } from '@public/public-routing.module';
import { AdmissionStepsComponent } from '@public-components/admission-steps/admission-steps.component';
import { AdmissionStepUnitComponent } from '@public-components/admission-step-unit/admission-step-unit.component';
import { ServicesSectionComponent } from '@public/components/services-section/services-section.component';
import { GovernmentalWebsitesComponent } from './components/governmental-websites/governmental-websites.component';
import { RelatedWebsitesCardComponent } from './components/related-websites-card/related-websites-card.component';
import { RelatedWebsitesComponent } from './components/related-websites/related-websites.component';

register();

@NgModule({
  declarations: [
    MainComponent,
    SwiperComponent,
    AdmissionStepsComponent,
    AdmissionStepUnitComponent,
    ServicesSectionComponent,
    GovernmentalWebsitesComponent,
    RelatedWebsitesCardComponent,
    RelatedWebsitesComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicModule {}
