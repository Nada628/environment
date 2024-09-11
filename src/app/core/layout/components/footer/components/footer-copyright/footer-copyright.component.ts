import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-copyright',
  templateUrl: './footer-copyright.component.html',
  styleUrl: './footer-copyright.component.scss',
})
export class FooterCopyrightComponent implements OnInit {
  //Inputs
  @Input() footerLogo: any;
  @Input() copyrightTxt: string;

  constructor() {}

  ngOnInit(): void {}
}
