import { Component, ElementRef, ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { SwiperService } from '../../services/swiper.service';
import { SwiperContent } from '@shared/model/card-data.model';
import { TranslationService } from 'app/language/translation.service';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
})
export class SwiperComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;

  content: SwiperContent[];

  currentLang: string;

  index = 0;

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
  };
  constructor(
    private translationService: TranslationService,
    private swiperService: SwiperService
  ) {
    this.currentLang = this.translationService.currentLang;
    this.content = this.swiperService.content;
  }

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
    this.swiperThumbs.nativeElement.swiper.activeIndex = this.index;
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }
}
