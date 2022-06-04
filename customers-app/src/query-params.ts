import {concat, fromEvent, map, of} from 'rxjs';

export namespace QueryParams {

  /**
   * Observes query params of the current location. The Observable never completes.
   */
  export const observe$ = concat(of(null), fromEvent(window, 'hashchange'))
    .pipe(
      map(() => new URL(location.href).hash.substring(1)),
      map(params => new URLSearchParams(params)),
    );
}
