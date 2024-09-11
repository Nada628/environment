import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private currentUrl = new BehaviorSubject<string>('');
  currentUrl$ = this.currentUrl.asObservable();

  private currentRouteDataSubject = new BehaviorSubject<any>(null);
  currentRouteData$ = this.currentRouteDataSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.getCurrentUrl();
  }

  private getCurrentUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.currentRouteDataSubject.next(route.snapshot.data);
        this.currentUrl.next(this.router.url);
      });
  }
}
