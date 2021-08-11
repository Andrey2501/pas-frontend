import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoSmallClaimsComplaintReasonsFacade } from '../facades';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { catchApiException } from 'src/app/shared/operators';
import { ParcelInfoSmallClaimsComplaintReasonsActions } from '../actions';

@Injectable()
export class ParcelInfoSmallClaimsComplaintReasonsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _parcelInfoSmallClaimsComplaintReasonsFacade: ParcelInfoSmallClaimsComplaintReasonsFacade,
    private readonly _pasSwaggerApiService: PasSwaggerApiService
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsComplaintReasonsActions.load),
      switchMap(() => {
        return this._pasSwaggerApiService.grievances_GetReasons().pipe(
          map((complaintReasons) => ParcelInfoSmallClaimsComplaintReasonsActions.loadSuccess({ complaintReasons })),
          catchApiException(ParcelInfoSmallClaimsComplaintReasonsActions.loadError)
        );
      })
    );
  });

  public readonly confirmSelection$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsComplaintReasonsActions.confirmSelection),
      withLatestFrom(this._parcelInfoSmallClaimsComplaintReasonsFacade.selectedRowReason$),
      map(([, complaintReason]) => ParcelInfoSmallClaimsComplaintReasonsActions.select({ complaintReason }))
    );
  });
}
