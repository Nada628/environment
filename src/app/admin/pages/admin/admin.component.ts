import { AdminUtilitiesService } from '@admin/services/admin-utils.service';
import { Component } from '@angular/core';
import { SidebarItem } from '@shared/model/sidebar-item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  sideBarItems: SidebarItem[];
  constructor(private adminUtilsService: AdminUtilitiesService) {
    this.sideBarItems = adminUtilsService.adminSidebarItems;
  }
}
