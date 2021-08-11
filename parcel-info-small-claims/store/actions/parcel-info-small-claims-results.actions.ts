import { createAction, props } from '@ngrx/store';
import { AppealExemptionViewModel, SmallClaimsResultsViewModel } from 'src/app/shared/services';
import { apiExceptionProps } from 'src/app/shared/constants';

const LOAD_RESULTS = '[Parcel Info Small Claim Results] Load Results';
const LOAD_RESULTS_SUCCESS = '[Parcel Info Small Claim Results] Load Results Success';
const LOAD_RESULTS_ERROR = '[Parcel Info Small Claim Results] Load Results Error';

const loadResults = createAction(LOAD_RESULTS);
const loadResultsSuccess = createAction(LOAD_RESULTS_SUCCESS, props<{ results: SmallClaimsResultsViewModel }>());
const loadResultsError = createAction(LOAD_RESULTS_ERROR, apiExceptionProps);

const LOAD_FINAL_EXEMPTIONS = '[Parcel Info Small Claim Results] Load Final Exemptions';
const LOAD_FINAL_EXEMPTIONS_SUCCESS = '[Parcel Info Small Claim Results] Load Final Exemptions Success';
const LOAD_FINAL_EXEMPTIONS_ERROR = '[Parcel Info Small Claim Results] Load Final Exemptions Error';

const SELECT_PARCEL_EXEMPTION = '[Parcel Info Small Claim Results] Select Parcel Exemption';

const loadFinalExemptions = createAction(LOAD_FINAL_EXEMPTIONS);
const loadFinalExemptionsSuccess = createAction(LOAD_FINAL_EXEMPTIONS_SUCCESS, props<{ finalExemptions: AppealExemptionViewModel[] }>());
const loadFinalExemptionsError = createAction(LOAD_FINAL_EXEMPTIONS_ERROR, apiExceptionProps);

const selectParcelExemption = createAction(SELECT_PARCEL_EXEMPTION, props<{ parcelExemptionId: number }>());

export const ParcelInfoSmallClaimsResultsActions = {
  loadResults,
  loadResultsSuccess,
  loadResultsError,
  loadFinalExemptions,
  loadFinalExemptionsSuccess,
  loadFinalExemptionsError,
  selectParcelExemption,
};
