import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../../../language/translation.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
})
export class BtnComponent implements OnInit {
  // If you want to hide the button text in small screens use display none
  @Input() displayNone: boolean = false;
  // To display a specific icon in the button
  @Input() btnIcon: string;
  // To display button name
  @Input() btnText: string;
  // Button color
  @Input() color: string = 'var(--white-100)';
  @Input() background: string = 'var(--light-blue-100)';
  // If you want to give color in hove mode
  @Input() hoverColor: string = 'var(--white-100)';
  @Input() hoverBackground: string = 'var(--light-blue-100)';
  @Input() btnRadius: string;
  @Input() additionalCss: string;

  currentLang: string = '';
  hover: boolean;

  //Event Emitters
  @Output() onBtnClick = new EventEmitter();

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.currentLang;
  }
  ngOnInit(): void {}

  onBtnClickEmitt() {
    this.onBtnClick.emit();
  }
}
