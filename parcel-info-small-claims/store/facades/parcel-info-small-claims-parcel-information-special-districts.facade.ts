import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions } from '../actions';
import { ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsParcelInformationSpecialDistrictsFacade {
  constructor(private readonly _store: Store) {}

  public readonly dataSource$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors.selectDataSource);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors.selectIsLoading);

  public readonly sortActive$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors.selectSortActive);

  public readonly sortDirection$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors.selectSortDirection);

  public select(specialDistrictId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.select({ specialDistrictId }));
  }

  public setSortParams(params: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.setSortParams({ params }));
  }
}
