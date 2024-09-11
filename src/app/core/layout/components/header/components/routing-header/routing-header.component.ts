import { Component, OnInit, Input } from '@angular/core';
import { Breadcrumb } from '../../../../models/breadcrumb.model';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routing-header',
  templateUrl: './routing-header.component.html',
  styleUrl: './routing-header.component.scss',
})
export class RoutingHeaderComponent implements OnInit {
  breadcrumbs: Observable<Breadcrumb[]>;
  @Input() currentUrl: string;

  constructor(private breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs$;
  }

  isNumber(value: any): boolean {
    return typeof parseInt(value) === 'number' && !isNaN(value);
  }
}
