import { GovernmentalWebsitesService } from '@public/services/governmental-websites.service';
import { Component } from '@angular/core';
import { GovernmentalLinks } from '../../models/governmental-links.model';

@Component({
  selector: 'app-governmental-websites',
  templateUrl: './governmental-websites.component.html',
  styleUrl: './governmental-websites.component.scss',
})
export class GovernmentalWebsitesComponent {
  links: GovernmentalLinks[];

  constructor(
    private governmentalWebsitesService: GovernmentalWebsitesService
  ) {
    this.links = this.governmentalWebsitesService.links;
  }
}
