import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  isLoading;
  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;
  }
}
