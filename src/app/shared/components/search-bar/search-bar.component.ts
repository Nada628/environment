import { TranslationService } from 'app/language/translation.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, SharedModule, SearchBarComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() sendingDataSource = new EventEmitter<string>();
  @Input() placeHolder: string;
  currentLang: string;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.currentLang;
  }

  ngOnInit(): void {}

  getSearchValue(queryString) {
    this.sendingDataSource.emit(queryString);
  }
}
