import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() rate: number;
  color: string[] = [];

  @Output() selectingRate = new EventEmitter<number>();
  constructor() {}
  ngOnInit() {
    if (this.rate !== undefined) {
      for (let x = 0; x <= this.rate; x++) {
        this.color[x] = 'var(--yellow-50)';
      }
    } else {
      for (let x = 0; x <= 4; x++) {
        this.color[x] = 'var(--white-400)';
      }
    }
  }

  onHovering(i) {
    for (let x = 0; x <= 4; x++) {
      if (x <= i) {
        this.color[x] = 'var(--yellow-50)';
      } else {
        this.color[x] = 'var(--white-400)';
      }
    }
  }
  outOfHovering(i) {
    if (this.rate === undefined) {
      for (let x = 0; x <= i; x++) {
        this.color[x] = 'var(--white-400)';
      }
    } else {
      for (let x = 0; x <= 4; x++) {
        if (x <= this.rate) {
          this.color[x] = 'var(--yellow-50)';
        } else {
          this.color[x] = 'var(--white-400)';
        }
      }
    }
  }

  onSubmit(i) {
    this.rate = i;
    this.selectingRate.emit(this.rate);
  }
}
