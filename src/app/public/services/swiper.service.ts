import { Injectable } from '@angular/core';
import { SwiperContent } from '@shared/model/card-data.model';

@Injectable({
  providedIn: 'root',
})
export class SwiperService {
  content: SwiperContent[] = [
    {
      title: 'swiper.swiperHeader',
      description: 'swiper.swiperText',
      url: '../../../../../assets/images/slider.jpg',
    },
    {
      title: 'swiper.swiperHeader',
      description: 'swiper.swiperText',
      url: '../../../../../assets/images/slider(1).jpg',
    },
    {
      title: 'swiper.swiperHeader',
      description: 'swiper.swiperText',
      url: '../../../../../assets/images/slider.jpg',
    },
  ];
  constructor() {}
}
