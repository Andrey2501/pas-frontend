import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsResultsActions } from '../actions';

import { ParcelInfoSmallClaimsResultsSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsResultsFacade {
  constructor(private readonly _store: Store) {}

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectIsLoading);

  public readonly priorCurrentColumns$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectPriorCurrentColumns);

  public readonly yearsInfo$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectYearsInfo);

  public readonly results$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectResults);

  public readonly finalExemptions$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectFinalExemptions);

  public readonly petitionerReason$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectPetitionerReason);

  public readonly finalExemptionTableRows$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectFinalExemptionTableRows);

  public readonly selectedParcelExemptionId$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectSelectedParcelExemptionId);

  public readonly selectedParcelExemptionNote$ = this._store.select(
    ParcelInfoSmallClaimsResultsSelectors.selectSelectedParcelExemptionNote
  );

  public readonly isShowResultNotes$ = this._store.select(ParcelInfoSmallClaimsResultsSelectors.selectIsShowResultNotes);

  public selectParcelExemption(parcelExemptionId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsResultsActions.selectParcelExemption({ parcelExemptionId }));
  }
}
