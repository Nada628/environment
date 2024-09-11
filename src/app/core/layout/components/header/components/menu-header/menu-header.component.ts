import { Component, OnInit, Input } from '@angular/core';
import {
  MainHeaderItem,
} from '../../../../models/menu-header.model';
import { HeaderService } from '../../../../services/header.service';
import { TranslationService } from '../../../../../../language/translation.service';
import { AuthService } from 'app/core/services/auth.service';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
})
export class MenuHeaderComponent implements OnInit {
  @Input() currentUrl: string;

  menuItems: MainHeaderItem;
  currentLang: string;
  role = this.authSerivce.userRole;
  activate
  ifCompany
  constructor(
    private headerService: HeaderService,
    private translationService: TranslationService,
    private authSerivce: AuthService,
    private request: RequestSubmittedService,
    
    
  ) {
    this.currentLang = this.translationService.currentLang;
  }
  ngOnInit(): void {
    this.authSerivce.isLoggedInSubject$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        if (this.authSerivce.appUser.sub.administrativeId == 8) {
          return (this.menuItems =
            this.headerService.getMenuHeader('investor-agent'));
        } else if (this.authSerivce.appUser.sub.administrativeId == 7) {
          return (this.menuItems =
            this.headerService.getMenuHeader('top_manager'));
        }
        this.menuItems = this.headerService.getMenuHeader(
          this.authSerivce.userRole
        );
      } else {
        this.menuItems = this.headerService.getMenuHeader('default');
      }
    });
    this.request.activate.subscribe(((res)=>{
      this.activate = res

      console.log(this.activate);
    }))
    this.request.ifCompany.subscribe(((res)=>{
      this.ifCompany = res
      
    }))
    this.activate= JSON.parse(localStorage.getItem('activate'))
    this.ifCompany= JSON.parse(localStorage.getItem('ifCompany'))
  }
  

    
  
}
