import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
      if (Object.keys(route.params).length !== 0) {
        const breadcrumb = {
          label: route.params['id'] || route.params['requestId'],
          url: '/' + routeUrl.join('/'),
          parent: routeUrl.length == 2 ? false : true,
        };
        breadcrumbs.push(breadcrumb);
      }
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: route.data['breadcrumb'],
          url: '/' + routeUrl.join('/'),
          parent: routeUrl.length == 2 ? false : true,
        };
        breadcrumbs.push(breadcrumb);
      }
      if (route.firstChild)
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
