import { TranslationService } from './../../../../../../language/translation.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() sendingDataSource = new EventEmitter<string>();
  @Input() placeHolder: string = 'header.searchWords';
  @Input() barWidth: number = 4;
  @Input() placeHolderWidth: number = 80;
  @Input() buttonWidth: number = 2;

  currentLang: string;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.currentLang;
  }

  ngOnInit(): void {}

  getSearchValue(queryString) {
    this.sendingDataSource.emit(queryString);
  }
}
