import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsExemptionsActions } from '../actions';
import { IState } from '../reducers';
import { ParcelInfoSmallClaimsExemptionsSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsExemptionsFacade {
  constructor(private readonly _store: Store<IState>) {}

  public readonly smallClaimsExemptions$ = this._store.select(ParcelInfoSmallClaimsExemptionsSelectors.selectSmallClaimsExemptions);

  public readonly sortedSmallClaimExemptionRows$ = this._store.select(
    ParcelInfoSmallClaimsExemptionsSelectors.selectSortedSmallClaimExemptionRows
  );

  public readonly sortDirection$ = this._store.select(ParcelInfoSmallClaimsExemptionsSelectors.selectSortDirection);

  public readonly sortActive$ = this._store.select(ParcelInfoSmallClaimsExemptionsSelectors.selectSortActive);

  public readonly isLoaded$ = this._store.select(ParcelInfoSmallClaimsExemptionsSelectors.selectIsLoaded);

  public load(): void {
    this._store.dispatch(ParcelInfoSmallClaimsExemptionsActions.load());
  }

  public setSortParams(sortParams: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsExemptionsActions.setSortParams({ sortParams }));
  }
}
