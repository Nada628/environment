import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { TranslationService } from 'app/language/translation.service';
import { Subscription } from 'rxjs';
import { AppUser } from 'app/core/models/app-user';
import { CompanyValidationSerivce } from '@login/services/company-validation/company-validate.service';
import { CompanyApiService } from '@shared/services/company.api.service';
import { ToastrService } from 'ngx-toastr';
import { Company } from '@shared/model/company';

@Component({
  selector: 'app-register-section',
  templateUrl: './register-section.component.html',
  styleUrl: './register-section.component.scss',
})
export class RegisterSectionComponent {
  currentLang: string = '';
  companiesList: any;
  subscription: Subscription;
  user: AppUser;
  selectedCompany: Company;
  constructor(
    private route: Router,
    public authService: AuthService,
    private translationService: TranslationService,
    private companyApiService: CompanyApiService,
    private companyValidationService: CompanyValidationSerivce,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.currentLang = this.translationService.currentLang;
    if (this.authService.loginSignal() && this.authService.user) {
      // this.getCompaniesListByOwnerId();
    }
  }

  routeTo(route) {
    // if (
    //   route == '/main/login/validateCompany' &&
    //   this.companyValidationService.getSelectedCompany == null
    // ) {
    //   this.toastr.warning('برجاء اختيار منشأة اولا');
    //   return;
    // }
    this.route.navigate([route]);
  }

  onSelectItem(item) {
    console.log('item', item);
    this.companyValidationService._selectedCompanyId = item;
  }

  getCompaniesListByOwnerId() {
    this.companyApiService.getCompanyByOwnerId(this.authService.userId).subscribe((response) => {
      this.companiesList = response['companies'];
      this.companyValidationService._companiesList = response['companies'];
    });
  }
}
