import { Component } from '@angular/core';
import { FooterItem } from '../../models/footerItem';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  menuItems: FooterItem[] = [];
  copyrightTxt: string;

  constructor(private footerService: FooterService) {}
  ngOnInit(): void {
    this.menuItems = this.footerService.menuItems;
    this.copyrightTxt = 'footer.copyright';
  }
}
