import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private renderer: Renderer2;
  private requestsNumber = 0;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Starts the loader by adding the 'show' class to the loader wrapper element
   *  and incrementing the number of active requests.
   */
  startLoader(): void {
    this.requestsNumber++;
    this.renderer.addClass(document.querySelector('.loader-wrapper'), 'show');
  }

  /**
   * Stops the loader by removing the 'show' class from the loader wrapper element
   *  and decrementing the number of active requests. If the number of active
   *  requests is less than or equal to zero, sets it to zero to prevent negative
   * values.
   */
  stopLoader(): void {
    this.requestsNumber--;
    if (this.requestsNumber <= 0) {
      this.requestsNumber = 0;
      this.renderer.removeClass(
        document.querySelector('.loader-wrapper'),
        'show'
      );
    }
  }
}
