import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store';
import { ParcelInfoRefreshActions } from 'src/app/parcel-info/store/actions';
import { catchApiException, positiveValue } from 'src/app/shared/operators';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_SORT } from '../../constants';
import {
  ParcelInfoSmallClaimDetailsActions,
  ParcelInfoSmallClaimsActions,
  ParcelInfoSmallClaimsAppraisalsActions,
  ParcelInfoSmallClaimsEventsActions,
  ParcelInfoSmallClaimsExemptionsActions,
  ParcelInfoSmallClaimsNotesActions,
  ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions,
  ParcelInfoSmallClaimsParcelInformationSalesActions,
  ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions,
  ParcelInfoSmallClaimsResultsActions,
} from '../actions';
import { ParcelInfoSmallClaimsFacade } from '../facades';
import { EventResourcesActions } from 'src/app/events/store/actions';
import { AuthPermissionWrapperUtils } from 'src/app/auth/utils';

@Injectable()
export class ParcelInfoSmallClaimsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsActions.load, ParcelInfoRefreshActions.refresh),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsFacade.isSmallClaimEntityActive$),
      switchMap(([, parcelId, isSmallClaimEntityActive]) => {
        return this._pasSwaggerApiService.smallClaim_GetSmallClaims(parcelId).pipe(
          switchMap((smallClaims) => {
            if (isSmallClaimEntityActive) {
              return [ParcelInfoSmallClaimsActions.loadSuccess({ smallClaims }), ParcelInfoSmallClaimsActions.loadDetails()];
            }

            return [ParcelInfoSmallClaimsActions.loadSuccess({ smallClaims })];
          }),
          catchApiException(ParcelInfoSmallClaimsActions.loadError)
        );
      })
    );
  });

  public readonly selectNext$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsActions.selectNext),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.nextSmallClaimId$),
      map(([, nextSmallClaimId]) => ParcelInfoSmallClaimsActions.select({ smallClaimId: nextSmallClaimId }))
    );
  });

  public readonly selectPrev$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsActions.selectPrev),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.previousSmallClaimId$),
      map(([, previousSmallClaimId]) => ParcelInfoSmallClaimsActions.select({ smallClaimId: previousSmallClaimId }))
    );
  });

  public readonly loadDetails$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsActions.loadDetails, ParcelInfoSmallClaimsActions.select),
      switchMap(() => this._parcelInfoSmallClaimsFacade.isDataExist$),
      positiveValue(),
      switchMap(() => {
        const actionsWithPermissions = [
          EventResourcesActions.loadEventTypes,
          EventResourcesActions.loadEventSubtypes,
          EventResourcesActions.loadEventUsers,
          ParcelInfoSmallClaimsNotesActions.load,
          ParcelInfoSmallClaimsEventsActions.load,
          ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.load,
          ParcelInfoSmallClaimsParcelInformationSalesActions.load,
          ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.load,
          ParcelInfoSmallClaimsAppraisalsActions.load,
        ];

        return [
          ParcelInfoSmallClaimDetailsActions.load(),
          ParcelInfoSmallClaimsExemptionsActions.load(),
          ParcelInfoSmallClaimsExemptionsActions.setSortParams({ sortParams: DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_SORT }),
          ParcelInfoSmallClaimsResultsActions.loadResults(),
          ParcelInfoSmallClaimsResultsActions.loadFinalExemptions(),
          AuthPermissionWrapperUtils.wrapMany(actionsWithPermissions),
        ];
      })
    );
  });

  public readonly remove$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsActions.remove),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, computedSmallClaimId]) => {
        return this._pasSwaggerApiService.smallClaim_DeactivatePending(computedSmallClaimId).pipe(
          switchMap(() => [ParcelInfoSmallClaimsActions.removeSuccess(), ParcelInfoSmallClaimsActions.load()]),
          catchApiException(ParcelInfoSmallClaimsActions.removeError)
        );
      })
    );
  });
}
