import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsComplaintReasonsSelectors } from '../selectors';
import { ParcelInfoSmallClaimsComplaintReasonsActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsComplaintReasonsFacade {
  constructor(private readonly _store: Store) {}

  public readonly complaintReasons$ = this._store.select(ParcelInfoSmallClaimsComplaintReasonsSelectors.selectComplaintReasonTableRows);

  public readonly isComplaintReasonSelectionInvalid$ = this._store.select(
    ParcelInfoSmallClaimsComplaintReasonsSelectors.selectIsComplaintReasonSelectionInvalid
  );

  public readonly selectedRowReason$ = this._store.select(ParcelInfoSmallClaimsComplaintReasonsSelectors.selectSelectedRowReason);

  public load(): void {
    this._store.dispatch(ParcelInfoSmallClaimsComplaintReasonsActions.load());
  }

  public confirmSelection(): void {
    this._store.dispatch(ParcelInfoSmallClaimsComplaintReasonsActions.confirmSelection());
  }

  public selectRow(reasonCode: string): void {
    this._store.dispatch(ParcelInfoSmallClaimsComplaintReasonsActions.selectRow({ reasonCode }));
  }

  public resetComplaintReason(): void {
    this._store.dispatch(ParcelInfoSmallClaimsComplaintReasonsActions.resetComplaintReason());
  }
}
