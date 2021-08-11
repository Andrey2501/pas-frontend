import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ParcelInfoSmallClaimAddActions, ParcelInfoSmallClaimsActions } from '../actions';
import { ParcelInfoSmallClaimsAddFacade } from '../facades';
import { SmallClaimModel } from '../../models';
import { catchApiException } from 'src/app/shared/operators';
import { SMALL_CLAIM_PARCEL_DETAILS_FIELD_KEYS } from '../../constants';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store';
import { AppealTypes, PasSwaggerApiService } from 'src/app/shared/services';

@Injectable()
export class ParcelInfoSmallClaimsAddEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _pasSwaggerApiService: PasSwaggerApiService
  ) {}

  public readonly add$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimAddActions.add),
      withLatestFrom(this._parcelInfoSmallClaimsAddFacade.addProps$),
      map(([{ formValue }, params]) => {
        return new SmallClaimModel(formValue, params);
      }),
      switchMap((model) => {
        return this._pasSwaggerApiService.smallClaim_Post(model).pipe(
          switchMap(({ appealId }) => [
            ParcelInfoSmallClaimAddActions.addSuccess(),
            ParcelInfoSmallClaimsActions.selectNewSmallClaim({ smallClaimId: appealId }),
            ParcelInfoSmallClaimsActions.load(),
          ]),
          catchApiException(ParcelInfoSmallClaimAddActions.addError)
        );
      })
    );
  });

  public readonly loadParcelDetails$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimAddActions.loadParcelDetails),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsAddFacade.grievanceProps$),
      switchMap(([, parcelId, { grievanceId, assessmentYear }]) => {
        return this._pasSwaggerApiService
          .appeals_GetParcelDetails(
            parcelId,
            assessmentYear,
            { names: SMALL_CLAIM_PARCEL_DETAILS_FIELD_KEYS },
            AppealTypes.SmallClaim,
            grievanceId
          )
          .pipe(
            map((fields) => ParcelInfoSmallClaimAddActions.loadParcelDetailsSuccess({ fields })),
            catchApiException(ParcelInfoSmallClaimAddActions.loadParcelDetailsError)
          );
      })
    );
  });
}
