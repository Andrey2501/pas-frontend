import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { AppraisalViewModel, CreateContactViewModel } from 'src/app/shared/services';
import { IDefaultFormValue } from 'src/app/shared/interfaces';

const LOAD = '[Parcel Info Small Claims Appraisals] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claims Appraisals] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Appraisals] Load Error';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ appraisals: AppraisalViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

const SELECT = '[Parcel Info Small Claims Appraisals] Select';
const SELECT_PREV = '[Parcel Info Small Claims Appraisals] Select Prev';
const SELECT_NEXT = '[Parcel Info Small Claims Appraisals] Select Next';

const select = createAction(SELECT, props<{ appraisalId: number }>());
const selectPrev = createAction(SELECT_PREV);
const selectNext = createAction(SELECT_NEXT);

const SET_SORT_PARAMS = '[Parcel Info Small Claims Appraisals] Set Sort Params';

const setSortParams = createAction(SET_SORT_PARAMS, props<{ params: Sort }>());

const ADD = '[Parcel Info Small Claims Appraisals] Add';
const ADD_SUCCESS = '[Parcel Info Small Claims Appraisals] Add Success';
const ADD_ERROR = '[Parcel Info Small Claims Appraisals] Add Error';

const add = createAction(ADD, props<{ formValue: IDefaultFormValue }>());
const addSuccess = createAction(ADD_SUCCESS, props<{ selectedAppraisalId: number }>());
const addError = createAction(ADD_ERROR, apiExceptionProps);

const EDIT = '[Parcel Info Small Claims Appraisals] Edit';
const EDIT_SUCCESS = '[Parcel Info Small Claims Appraisals] Edit Success';
const EDIT_ERROR = '[Parcel Info Small Claims Appraisals] Edit Error';

const edit = createAction(EDIT, props<{ formValue: IDefaultFormValue }>());
const editSuccess = createAction(EDIT_SUCCESS, props<{ selectedAppraisalId: number }>());
const editError = createAction(EDIT_ERROR, apiExceptionProps);

const SET_EDIT_MODE = '[Parcel Info Small Claims Appraisals] Set Edit Mode';

const setEditMode = createAction(SET_EDIT_MODE, props<{ isEditMode: boolean }>());

const INIT_APPRAISER = '[Parcel Info Small Claims Appraisals] Init Appraiser';

const initAppraiser = createAction(INIT_APPRAISER);

const SAVE = '[Parcel Info Small Claims Appraisals] Save';

const save = createAction(SAVE, props<{ formValue: IDefaultFormValue }>());

const REMOVE = '[Parcel Info Small Claims Appraisals] Remove';
const REMOVE_SUCCESS = '[Parcel Info Small Claims Appraisals] Remove Success';
const REMOVE_ERROR = '[Parcel Info Small Claims Appraisals] Remove Error';

const remove = createAction(REMOVE);
const removeSuccess = createAction(REMOVE_SUCCESS);
const removeError = createAction(REMOVE_ERROR, apiExceptionProps);

const ADD_APPRAISER = '[Parcel Info Small Claims Appraisals] Add Appraiser';

const addAppraiser = createAction(ADD_APPRAISER, props<{ contact: CreateContactViewModel }>());

const SET_APPRAISER_ID = '[Parcel Info Small Claims Appraisals] Set Appraiser Id';

const setAppraiserId = createAction(SET_APPRAISER_ID, props<{ appraiserId: number }>());

export const ParcelInfoSmallClaimsAppraisalsActions = {
  load,
  loadSuccess,
  loadError,
  select,
  selectPrev,
  selectNext,
  setSortParams,
  add,
  addSuccess,
  addError,
  setEditMode,
  edit,
  editSuccess,
  editError,
  initAppraiser,
  save,
  remove,
  removeSuccess,
  removeError,
  addAppraiser,
  setAppraiserId,
};
