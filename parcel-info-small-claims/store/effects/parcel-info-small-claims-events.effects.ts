import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsEventsFacade } from '../facades';
import { ParcelInfoSmallClaimsEventsActions } from '../actions';
import { catchApiException } from 'src/app/shared/operators';

@Injectable()
export class ParcelInfoSmallClaimsEventsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoSmallClaimsEventsFacade: ParcelInfoSmallClaimsEventsFacade
  ) {}

  public readonly loadEvents$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsEventsActions.load),
      withLatestFrom(this._parcelInfoSmallClaimsEventsFacade.params$),
      switchMap(([, { smallClaimId, offset, limit, sortColumn, sortOrder }]) => {
        return this._pasSwaggerApiService.events_GetBySmallClaim(smallClaimId, offset, limit, sortColumn, sortOrder).pipe(
          map((events) => ParcelInfoSmallClaimsEventsActions.loadSuccess({ events })),
          catchApiException(ParcelInfoSmallClaimsEventsActions.loadError)
        );
      })
    );
  });

  public readonly setSortParams$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsEventsActions.setSortParams),
      map(() => ParcelInfoSmallClaimsEventsActions.load())
    );
  });

  public readonly loadMore$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsEventsActions.loadMore),
      withLatestFrom(this._parcelInfoSmallClaimsEventsFacade.params$),
      switchMap(([, { smallClaimId, offset, limit, sortColumn, sortOrder }]) => {
        return this._pasSwaggerApiService.events_GetBySmallClaim(smallClaimId, offset, limit, sortColumn, sortOrder).pipe(
          map((events) => ParcelInfoSmallClaimsEventsActions.loadMoreSuccess({ events })),
          catchApiException(ParcelInfoSmallClaimsEventsActions.loadMoreError)
        );
      })
    );
  });

  public readonly selectPrev$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsEventsActions.selectPrev),
      withLatestFrom(this._parcelInfoSmallClaimsEventsFacade.prevId$),
      map(([, eventId]) => {
        return ParcelInfoSmallClaimsEventsActions.select({ eventId });
      })
    );
  });

  public readonly selectNext$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsEventsActions.selectNext),
      withLatestFrom(this._parcelInfoSmallClaimsEventsFacade.nextId$),
      map(([, eventId]) => {
        return ParcelInfoSmallClaimsEventsActions.select({ eventId });
      })
    );
  });
}
