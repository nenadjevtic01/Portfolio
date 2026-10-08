import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

/**
 * Keeps the same page component alive when navigating between routes that render it,
 * e.g. switching from `/` to `/sr`. Only the text changes, so the scroll position is kept.
 */
@Injectable()
export class PageReuseStrategy extends BaseRouteReuseStrategy {
  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot,
  ): boolean {
    return (
      future.routeConfig === current.routeConfig ||
      (!!future.component && future.component === current.component)
    );
  }
}
