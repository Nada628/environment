import { Component, OnInit ,OnDestroy} from '@angular/core';
import { SidebarItem } from '@shared/model/sidebar-item';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteService } from 'app/core/layout/services/route.service';
import { OperationsService } from '@operations/services/operations.service';
import { AuthService } from 'app/core/services/auth.service';
import { LoginService } from '@login/services/login.service';

@Component({
  selector: 'app-operations-layout',
  templateUrl: './operations-layout.component.html',
  styleUrl: './operations-layout.component.scss',
})

export class OperationsLayoutComponent implements OnInit, OnDestroy{

  private dataSubscription: Subscription;
  sideBarItems: SidebarItem[];
  sideMenuVisible: boolean;


  constructor(
    private operationsService: OperationsService,
    private routeService: RouteService,
    private authService: AuthService // Inject AuthService

  ) {}

  ngOnInit() {
    const userRole = this.authService.getUserRole(); // Fetch the user role dynamically
    console.log('Current Role:', userRole);  // Debugging line

    if (userRole === 'SuperAdmin') {
      this.sideBarItems = this.operationsService.superadminSidebarItems; // Set SuperAdmin sidebar
    } else if (userRole === 'customer') {
      this.sideBarItems = this.operationsService.customerSidebarItems; 
    }
    else if (userRole === 'manager') {
      this.sideBarItems = this.operationsService.customerSidebarItems; 
    } else {
      console.error('Unknown role:', userRole); // Handle unknown role
    }

    this.dataSubscription = this.routeService.currentRouteData$.subscribe(
      (data) => {
        if (data['sideMenu'] !== undefined) {
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
