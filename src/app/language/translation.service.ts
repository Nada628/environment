import { TranslateService } from '@ngx-translate/core';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lang } from './enum';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public currentLang = '';
  private renderer: Renderer2;
  private isArabic = new BehaviorSubject<boolean>(false);
  isArabic$ = this.isArabic.asObservable();
  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private toastr: ToastrService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.init();
  }
  init(): void {
    const currentLang = this.localStorage.getLocal('userLang');
    if (!currentLang) {
      this.currentLang = 'en';
      this.localStorage.setLocal('userLang', this.currentLang);
    } else {
      this.currentLang = this.localStorage.getLocal('userLang');
    }
    this.adjustApp();
  }
  changeLang(): void {
    this.currentLang =
      this.currentLang === Lang.Arabic ? Lang.English : Lang.Arabic;
    this.localStorage.setLocal('userLang', this.currentLang);
    this.adjustApp();
    window.location.reload();
  }

  adjustApp(): void {
    this.translate.use(this.currentLang);
    if (this.currentLang === Lang.Arabic) {
      this.renderer.addClass(document.body, 'rtl');
      this.isArabic.next(true);
    } else {
      this.renderer.removeClass(document.body, 'rtl');
      this.isArabic.next(false);
    }
  }
  toastrTranslation(action: string, toastrValue: string): void {
    this.translate.get(toastrValue).subscribe((r) => {
      if (action === 'success') {
        this.toastr.success(r, '');
      } else if (action === 'warning') {
        this.toastr.warning(r, '');
      } else if (action === 'error') {
        if (this.currentLang === 'ar') {
          this.toastr.error(r, '');
        }
      }
    });
  }
}
