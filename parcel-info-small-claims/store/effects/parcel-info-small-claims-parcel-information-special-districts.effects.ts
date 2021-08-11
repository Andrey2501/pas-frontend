import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoRefreshActions } from 'src/app/parcel-info/store/actions';
import { catchApiException } from 'src/app/shared/operators';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions } from '../actions';
import { ParcelInfoSmallClaimsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsParcelInformationSpecialDistrictsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.load, ParcelInfoRefreshActions.refresh),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, selectedSmallClaimId]) => {
        return this._pasSwaggerApiService.smallClaim_GetSpecialDistrict(selectedSmallClaimId).pipe(
          map((specialDistricts) => ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.loadSuccess({ specialDistricts })),
          catchApiException(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.loadError)
        );
      })
    );
  });
}
