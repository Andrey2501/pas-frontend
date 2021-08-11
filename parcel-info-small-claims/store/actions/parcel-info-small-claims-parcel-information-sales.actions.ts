import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { SmallClaimSaleViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Small Claims Parcel Information Sales] Load';
const LOAD_SUCCESS = '[Parcel InfoSmall Claims Parcel Information Sales] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Parcel Information Sales] Load Error';
const SELECT = '[Parcel Info Small Claims Parcel Information Sales] Select';
const SET_SORT_PARAMS = '[Parcel Info Small Claims Parcel Information Sales] Set Sort Params';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ sales: SmallClaimSaleViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);
const select = createAction(SELECT, props<{ saleId: number }>());
const setSortParams = createAction(SET_SORT_PARAMS, props<{ params: Sort }>());

export const ParcelInfoSmallClaimsParcelInformationSalesActions = {
  load,
  loadSuccess,
  loadError,
  select,
  setSortParams,
};
