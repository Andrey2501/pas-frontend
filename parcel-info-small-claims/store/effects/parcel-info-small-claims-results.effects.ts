import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { catchApiException } from 'src/app/shared/operators';
import { ParcelInfoSmallClaimsFacade } from '../facades';
import { ParcelInfoSmallClaimsResultsActions } from '../actions';

@Injectable()
export class ParcelInfoSmallClaimsResultsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsResultsActions.loadResults),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, smallClaimId]) => {
        return this._pasSwaggerApiService.smallClaim_GetResults(smallClaimId).pipe(
          map((results) => ParcelInfoSmallClaimsResultsActions.loadResultsSuccess({ results })),
          catchApiException(ParcelInfoSmallClaimsResultsActions.loadResultsError)
        );
      })
    );
  });

  public readonly loadFinalExemptions$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsResultsActions.loadFinalExemptions),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, smallClaimId]) => {
        return this._pasSwaggerApiService.exemptions_GetFinalAppealExemptions(smallClaimId).pipe(
          map((finalExemptions) => ParcelInfoSmallClaimsResultsActions.loadFinalExemptionsSuccess({ finalExemptions })),
          catchApiException(ParcelInfoSmallClaimsResultsActions.loadFinalExemptionsError)
        );
      })
    );
  });
}
