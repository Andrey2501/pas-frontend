import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoRefreshActions } from 'src/app/parcel-info/store/actions';
import { catchApiException } from 'src/app/shared/operators';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions } from '../actions';
import { ParcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade: ParcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.load, ParcelInfoRefreshActions.refresh),
      withLatestFrom(this._parcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade.params$),
      switchMap(([, { selectedSmallClaimId, visibleColumnsList }]) => {
        return this._pasSwaggerApiService.smallClaim_GetSmallClaimsDetails(selectedSmallClaimId, { names: visibleColumnsList }).pipe(
          map((timeOfSmallClaims) => ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.loadSuccess({ timeOfSmallClaims })),
          catchApiException(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.loadError)
        );
      })
    );
  });
}
