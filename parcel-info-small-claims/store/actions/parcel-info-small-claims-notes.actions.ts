import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { apiExceptionProps, noteProps } from 'src/app/shared/constants';
import { NoteViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Small Claims Notes] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claims Notes] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Notes] Load Error';
const SELECT = '[Parcel Info Small Claims Notes] Select';
const SET_SORT_PARAMS = '[Parcel Info Small Claims Notes] Set Sort Params';
const SELECT_PREV = '[Parcel Info Small Claims Notes] Select Prev';
const SELECT_NEXT = '[Parcel Info Small Claims Notes] Select Next';
const SET_EDIT_MODE = '[Parcel Info Small Claims Notes] Set Edit Mode';
const RESET_SELECTION = '[Parcel Info Small Claims Notes] Reset Selection';
const ADD = '[Parcel Info Small Claims Notes] Add';
const ADD_SUCCESS = '[Parcel Info Small Claims Notes] Add Success';
const ADD_ERROR = '[Parcel Info Small Claims Notes] Add Error';
const REMOVE = '[Parcel Info Small Claims Notes] Remove';
const REMOVE_SUCCESS = '[Parcel Info Small Claims Notes] Remove Success';
const REMOVE_ERROR = '[Parcel Info Small Claims Notes] Remove Error';
const UPDATE = '[Parcel Info Small Claims Notes] Update';
const UPDATE_SUCCESS = '[Parcel Info Small Claims Notes] Update Success';
const UPDATE_ERROR = '[Parcel Info Small Claims Notes] Update Error';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ notes: NoteViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);
const select = createAction(SELECT, props<{ noteId: number }>());
const selectPrev = createAction(SELECT_PREV);
const selectNext = createAction(SELECT_NEXT);
const setSortParams = createAction(SET_SORT_PARAMS, props<{ params: Sort }>());
const setEditMode = createAction(SET_EDIT_MODE, props<{ isEditMode: boolean }>());
const resetSelection = createAction(RESET_SELECTION);
const add = createAction(ADD, noteProps);
const addSuccess = createAction(ADD_SUCCESS);
const addError = createAction(ADD_ERROR, apiExceptionProps);
const remove = createAction(REMOVE);
const removeSuccess = createAction(REMOVE_SUCCESS);
const removeError = createAction(REMOVE_ERROR, apiExceptionProps);
const update = createAction(UPDATE, noteProps);
const updateSuccess = createAction(UPDATE_SUCCESS);
const updateError = createAction(UPDATE_ERROR, apiExceptionProps);

export const ParcelInfoSmallClaimsNotesActions = {
  load,
  loadSuccess,
  loadError,
  select,
  selectPrev,
  selectNext,
  setSortParams,
  setEditMode,
  resetSelection,
  add,
  addSuccess,
  addError,
  remove,
  removeSuccess,
  removeError,
  update,
  updateSuccess,
  updateError,
};
