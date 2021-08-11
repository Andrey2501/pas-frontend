import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { SmallClaimDetailViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Time Of Small Claims] Load';
const LOAD_SUCCESS = '[Parcel Info Time Of Small Claims] Load Success';
const LOAD_ERROR = '[Parcel Info Time Of Small Claims] Load Error';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ timeOfSmallClaims: SmallClaimDetailViewModel }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

export const ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions = {
  load,
  loadSuccess,
  loadError,
};
