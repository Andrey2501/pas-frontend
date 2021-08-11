import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store';
import { catchApiException, positiveValue } from 'src/app/shared/operators';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsExemptionsActions } from '../actions';
import { ParcelInfoSmallClaimsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsExemptionsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsExemptionsActions.load),
      switchMap(() => this._parcelInfoSmallClaimsFacade.isDataExist$),
      positiveValue(),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsFacade.selectedYear$),
      switchMap(([, parcelId, selectedYear]) => {
        return this._pasSwaggerApiService.exemptions_GetParcelExemptions(parcelId, selectedYear, false).pipe(
          map((exemptions) => ParcelInfoSmallClaimsExemptionsActions.loadSuccess({ exemptions })),
          catchApiException(ParcelInfoSmallClaimsExemptionsActions.loadError)
        );
      })
    );
  });
}
