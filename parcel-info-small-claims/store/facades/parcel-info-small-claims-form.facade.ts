import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { ParcelInfoSmallClaimsFormActions } from '../actions';
import { IState } from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsFormFacade {
  constructor(private readonly _store: Store<IState>) {}

  public set(formGroupValue: IDefaultFormValue): void {
    this._store.dispatch(ParcelInfoSmallClaimsFormActions.set({ formGroupValue }));
  }

  public reset(): void {
    this._store.dispatch(ParcelInfoSmallClaimsFormActions.reset());
  }
}
