import { Component, OnInit, Input } from '@angular/core';
import { FooterItem } from '../../../../models/footerItem';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrl: './footer-content.component.scss',
})
export class FooterContentComponent implements OnInit {
  @Input() footerItems: FooterItem[] = [];

  constructor() {}
  ngOnInit(): void {}
}
