import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarItem } from '@shared/model/sidebar-item';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() sideBarItems: SidebarItem[];

  hover: boolean;

  constructor() {}
}
