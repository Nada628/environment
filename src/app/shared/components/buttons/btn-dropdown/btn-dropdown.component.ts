import { TranslationService } from 'app/language/translation.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenutItem } from 'app/core/layout/models/menu-header.model';


@Component({
  selector: 'app-btn-dropdown',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './btn-dropdown.component.html',
  styleUrl: './btn-dropdown.component.scss',
})
export class BtnDropdownComponent implements OnInit {
  //Inputs
  @Input() btnText: string;
  @Input() menuList: MenutItem[];
  @Input() buttonWidth: string;
  // @Input() dropDownStyle: any;
  // @Input() translation: any;
  // @Input() btnIcon: any;

  currentLang: string;

  @Input() hoverColor: string = 'var(--white-100)';
  @Input() hoverBackground: string = 'var(--light-blue-100)';
  @Input() additionalCss: string;
  @Input() btnRadius;
  @Input() color;
  @Input() background;
  @Input() btnIcon;
  @Input() isRouting;

  hover: boolean;
  //Event Emitters
  @Output() onBtnClick = new EventEmitter();

  constructor(private translationService: TranslationService) {}
  ngOnInit(): void {
    this.currentLang = this.translationService.currentLang;
  }

  onBtnClickEmitt(menuItem: any) {
    this.onBtnClick.emit(menuItem);
  }
}
