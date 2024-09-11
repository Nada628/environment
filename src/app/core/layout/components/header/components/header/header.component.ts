import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { RouteService } from '../../../../services/route.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isParent: boolean;
  currentUrl: string;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private routeService: RouteService
  ) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe((crumbs) => {
      crumbs.length == 1 ? (this.isParent = true) : (this.isParent = false);
    });
    this.routeService.currentUrl$.subscribe((url) => {
      this.currentUrl = url;
    });
  }
}
