import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsParcelInformationSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsParcelInformationFacade {
  constructor(private readonly _store: Store) {}

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsParcelInformationSelectors.selectIsLoading);
}
