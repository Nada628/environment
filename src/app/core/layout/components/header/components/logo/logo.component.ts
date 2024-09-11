import { TranslationService } from './../../../../../../language/translation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
@Input() position : string = "center";
currentLang :string;

constructor(private translationService : TranslationService){
this.currentLang = this.translationService.currentLang;
}
}
