import {NgZone} from '@angular/core';
import {ObservableDecorator} from '@scion/microfrontend-platform';
import {Observable} from 'rxjs';
import {observeInside, subscribeInside} from '@scion/toolkit/operators';

/**
 * Mirrors the source, but ensures subscription and emission {@link NgZone} to be identical.
 */
export class NgZoneObservableDecorator implements ObservableDecorator {

  constructor(private zone: NgZone) {
  }

  public decorate$<T>(source$: Observable<T>): Observable<T> {
    return new Observable<T>(observer => {
      const insideAngular = NgZone.isInAngularZone();
      const subscription = source$
        .pipe(
          subscribeInside(fn => this.zone.runOutsideAngular(fn)),
          observeInside(fn => insideAngular ? this.zone.run(fn) : this.zone.runOutsideAngular(fn)),
        )
        .subscribe(observer);
      return () => subscription.unsubscribe();
    });
  }
}
