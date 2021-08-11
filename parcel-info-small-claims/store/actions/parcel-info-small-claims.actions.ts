import { createAction, props } from '@ngrx/store';
import { apiExceptionProps, sortProps } from 'src/app/shared/constants';
import { SmallClaimViewModel } from 'src/app/shared/services';
import { SmallClaimsDetailsMenu } from '../../enums';

const LOAD = '[Parcel Info Small Claims] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claims] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims] Load Error';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ smallClaims: SmallClaimViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

const LOAD_DETAILS = '[Parcel Info Small Claims] Load Details';

const loadDetails = createAction(LOAD_DETAILS);

const SELECT = '[Parcel Info Small Claims] Select';
const SELECT_NEXT = '[Parcel Info Small Claims] Select Next';
const SELECT_PREV = '[Parcel Info Small Claims] Select Prev';

const select = createAction(SELECT, props<{ smallClaimId: number }>());
const selectNext = createAction(SELECT_NEXT);
const selectPrev = createAction(SELECT_PREV);

const SET_SORT_PARAMS = '[Parcel Info Small Claims] Set Sort Params';

const setSortParams = createAction(SET_SORT_PARAMS, sortProps);

const CHOOSE_DETAILS_MENU = '[Parcel Info Small Claims] Choose Details Menu';

const chooseDetailsMenu = createAction(CHOOSE_DETAILS_MENU, props<{ menu: SmallClaimsDetailsMenu }>());

const SET_VIEW_FORM_MODE = '[Parcel Info  Small Claims] Set View Form Mode';

const setViewFormMode = createAction(SET_VIEW_FORM_MODE, props<{ isViewFormMode: boolean }>());

const REMOVE = '[Parcel Info Small Claims] Remove';
const REMOVE_SUCCESS = '[Parcel Info Small Claims] Remove Success';
const REMOVE_ERROR = '[Parcel Info Small Claims] Remove Error';

const remove = createAction(REMOVE);
const removeSuccess = createAction(REMOVE_SUCCESS);
const removeError = createAction(REMOVE_ERROR, apiExceptionProps);

const SELECT_NEW_SMALL_CLAIM = '[Parcel Info Small Claims] Select New Small Claim';
const selectNewSmallClaim = createAction(SELECT_NEW_SMALL_CLAIM, props<{ smallClaimId: number }>());

export const ParcelInfoSmallClaimsActions = {
  load,
  loadSuccess,
  loadError,
  loadDetails,
  select,
  selectNext,
  selectPrev,
  setSortParams,
  chooseDetailsMenu,
  setViewFormMode,
  remove,
  removeSuccess,
  removeError,
  selectNewSmallClaim,
};
