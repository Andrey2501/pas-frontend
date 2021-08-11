import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade {
  constructor(private readonly _store: Store) {}

  public readonly params$ = this._store.select(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors.selectParams);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors.selectIsLoading);

  public readonly fieldsWithValues$ = this._store.select(
    ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors.selectFieldsWithValues
  );
}
