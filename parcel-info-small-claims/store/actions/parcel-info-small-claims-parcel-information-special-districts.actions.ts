import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { SmallClaimSpecialDistrictViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Small Claims Parcel Information Special Districts] Load';
const LOAD_SUCCESS = '[Parcel InfoSmall Claims Parcel Information Special Districts] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Parcel Information Special Districts] Load Error';
const SELECT = '[Parcel Info Small Claims Parcel Information Special Districts] Select';
const SET_SORT_PARAMS = '[Parcel Info Small Claims Parcel Information Special Districts] Set Sort Params';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ specialDistricts: SmallClaimSpecialDistrictViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);
const select = createAction(SELECT, props<{ specialDistrictId: number }>());
const setSortParams = createAction(SET_SORT_PARAMS, props<{ params: Sort }>());

export const ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions = {
  load,
  loadSuccess,
  loadError,
  select,
  setSortParams,
};
