import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsParcelInformationSalesActions } from '../actions';
import { ParcelInfoSmallClaimsParcelInformationSalesSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsParcelInformationSalesFacade {
  constructor(private readonly _store: Store) {}

  public readonly dataSource$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSalesSelectors.selectDataSource);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSalesSelectors.selectIsLoading);

  public readonly sortActive$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSalesSelectors.selectSortActive);

  public readonly sortDirection$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSalesSelectors.selectSortDirection);

  public select(saleId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsParcelInformationSalesActions.select({ saleId }));
  }

  public setSortParams(params: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsParcelInformationSalesActions.setSortParams({ params }));
  }
}
