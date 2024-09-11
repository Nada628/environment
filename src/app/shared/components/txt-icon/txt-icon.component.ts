import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslationService } from '../../../language/translation.service';

@Component({
  selector: 'app-txt-icon',
  templateUrl: './txt-icon.component.html',
  styleUrl: './txt-icon.component.scss',
})
export class TxtIconComponent {
  @Input() icon: string;
  @Input() text: string;
  @Input() url: string;

  currentLang: string = '';

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
