import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../../language/translation.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
})
export class LayoutPageComponent implements OnInit {
  currentLang: string;

  constructor(ts: TranslationService, private router: Router) {
    this.currentLang = ts.currentLang;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
