import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimAddSelectors } from '../selectors';
import { ParcelInfoSmallClaimAddActions } from '../actions';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { ISmallClaimGrievanceProps } from '../../interfaces';
import { ExemptionModel } from 'src/app/exemptions/models';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsAddFacade {
  constructor(private readonly _store: Store) {}

  public readonly isAddMode$ = this._store.select(ParcelInfoSmallClaimAddSelectors.selectIsAddMode);

  public readonly addProps$ = this._store.select(ParcelInfoSmallClaimAddSelectors.selectAddProps);

  public readonly grievanceProps$ = this._store.select(ParcelInfoSmallClaimAddSelectors.selectGrievanceProps);

  public readonly reasonValue$ = this._store.select(ParcelInfoSmallClaimAddSelectors.selectReasonValue);

  public loadParcelDetails(): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.loadParcelDetails());
  }

  public setAddMode(isAddMode: boolean): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.setAddMode({ isAddMode }));
  }

  public add(formValue: IDefaultFormValue): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.add({ formValue }));
  }

  public setGrievanceProps(grievanceProps: ISmallClaimGrievanceProps): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.setGrievanceProps({ grievanceProps }));
  }

  public reset(): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.reset());
  }

  public setReasonValue(reasonValue: string): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.setReasonValue({ reasonValue }));
  }

  public resetReasonValue(): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.resetReasonValue());
  }

  public addExemption(model: ExemptionModel): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.addExemption({ model }));
  }

  public setExemptions(newExemptions: ExemptionModel[]): void {
    this._store.dispatch(ParcelInfoSmallClaimAddActions.setExemptions({ exemptions: newExemptions }));
  }
}
