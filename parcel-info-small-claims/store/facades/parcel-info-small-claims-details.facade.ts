import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimDetailsActions } from '../actions';
import { IState } from '../reducers';
import { ParcelInfoSmallClaimDetailsSelectors } from '../selectors';
import { UpdateAppealViewModel } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsDetailsFacade {
  constructor(private readonly _store: Store<IState>) {}

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectIsLoading);

  public readonly params$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectParams);

  public readonly formProps$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectFormProps);

  public readonly overallInformationFormControls$ = this._store.select(
    ParcelInfoSmallClaimDetailsSelectors.selectOverallInformationFormControls
  );

  public readonly lastChanged$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectLastChanged);

  public readonly lastChangedBy$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectLastChangedBy);

  public readonly ownerInformationFormControls$ = this._store.select(
    ParcelInfoSmallClaimDetailsSelectors.selectOwnerInformationFormControls
  );

  public readonly petitionerInformationFormControls$ = this._store.select(
    ParcelInfoSmallClaimDetailsSelectors.selectPetitionerInformationFormControls
  );

  public readonly totalsFormControls$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectTotalsFormControls);

  public readonly initialPetitioner$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectInitialPetitioner);

  public readonly initialLawyer$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectInitialLawyer);

  public readonly petitionerInformationDetailColumns$ = this._store.select(
    ParcelInfoSmallClaimDetailsSelectors.selectPetitionerInformationDetailColumns
  );

  public readonly updatedLawyer$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectUpdatedLawyer);

  public readonly complaintReasonValue$ = this._store.select(ParcelInfoSmallClaimDetailsSelectors.selectComplaintReasonValue);

  public initContacts(): void {
    this._store.dispatch(ParcelInfoSmallClaimDetailsActions.initContacts());
  }

  public reset(): void {
    this._store.dispatch(ParcelInfoSmallClaimDetailsActions.resetContactDetails());
  }

  public loadPetitionerDetails(petitionerId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimDetailsActions.loadPetitionerDetails({ petitionerId }));
  }

  public loadLawyerDetails(lawyerId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimDetailsActions.loadLawyerDetails({ lawyerId }));
  }

  public save(updateSmallClaim: UpdateAppealViewModel): void {
    this._store.dispatch(ParcelInfoSmallClaimDetailsActions.save({ updateSmallClaim }));
  }
}
