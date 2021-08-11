import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { ParcelExemptionViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Small Claims Exemptions] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claims Exemptions] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Exemptions] Load Error';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ exemptions: ParcelExemptionViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

const SET_SORT_PARAMS = '[Parcel Info Small Claims Exemptions] Set Sort Params';

const setSortParams = createAction(SET_SORT_PARAMS, props<{ sortParams: Sort }>());

export const ParcelInfoSmallClaimsExemptionsActions = {
  load,
  loadSuccess,
  loadError,
  setSortParams,
};
