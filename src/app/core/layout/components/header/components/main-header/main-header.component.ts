import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../../../../language/translation.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { HeaderService } from 'app/core/layout/services/header.service';
import { LoginService } from '@login/services/login.service';
import { MenutItem } from 'app/core/layout/models/menu-header.model';
import { Subscription } from 'rxjs';
import { CompanyValidationSerivce } from '@login/services/company-validation/company-validate.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent implements OnInit {
  currentLang: string = '';
  lang: string;
  menuItems: MenutItem[];
  companySubscription: Subscription;
  user;
  userSubscription$: Subscription;
  constructor(
    private translationService: TranslationService,
    private router: Router,
    public authService: AuthService,
    public loginService: LoginService,
    private headerService: HeaderService,
    private companyValidationService: CompanyValidationSerivce
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translationService.currentLang;
    this.menuItems = this.headerService.loggedInUserMenu;
    this.currentLang === 'en'
      ? (this.lang = 'languages.ar')
      : (this.lang = 'languages.en');

    this.companySubscription =
      this.companyValidationService.selectedCompany.subscribe((company) => {});

    // this.user = this.authService.user?.sub.name
    this.userSubscription$ = this.authService.updateUser.subscribe((user) => {
      this.user = user;
      // console.log('user from header', this.user);
    });
  }

  login() {
    this.router.navigate(['/main/login']);
  }

  logout() {
    this.loginService.logout();
  }

  //  changing Language
  changeLanguage() {
    this.translationService.changeLang();
  }

  excuteAction(event) {
    switch (event.action) {
      case 'route':
        this.router.navigate([event.path]);
        break;
      case 'logout':
        this.loginService.logout();
        break;
      default:
        break;
    }
  }
}
