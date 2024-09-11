import { Component, OnInit } from '@angular/core';
import { SidebarItem } from '@shared/model/sidebar-item';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteService } from 'app/core/layout/services/route.service';
import { OperationsService } from '@operations/services/operations.service';

@Component({
  selector: 'app-operations-layout',
  templateUrl: './operations-layout.component.html',
  styleUrl: './operations-layout.component.scss',
})
export class OperationsLayoutComponent implements OnInit {
  private dataSubscription: Subscription;
  sideBarItems: SidebarItem[];
  sideMenuVisible: boolean;
  constructor(
    private operationsService: OperationsService,
    private routeService: RouteService
  ) {
    this.sideBarItems = this.operationsService.customerSidebarItems;
  }
  ngOnInit() {
    this.dataSubscription = this.routeService.currentRouteData$.subscribe(
      (data) => {
        if (data['sideMenu'] != undefined) {
          this.sideMenuVisible = data['sideMenu'];
        } else {
          this.sideMenuVisible = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
