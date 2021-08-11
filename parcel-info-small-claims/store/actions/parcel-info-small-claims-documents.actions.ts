import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { DocumentViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Small Claims Documents] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claims Documents] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Documents] Load Error';
const SELECT = '[Parcel Info Small Claims Documents] Select';
const SELECT_WITHOUT_DOWNLOAD = '[Parcel Info Small Claims Documents] Select Without Download';
const SET_SORT_PARAMS = '[Parcel Info Small Claims Documents] Set Sort Params';
const SELECT_PREV = '[Parcel Info Small Claims Documents] Select Prev';
const SELECT_NEXT = '[Parcel Info Small Claims Documents] Select Next';
const REMOVE = '[Parcel Info Small Claims Documents] Remove';
const REMOVE_SUCCESS = '[Parcel Info Small Claims Documents] Remove Success';
const REMOVE_ERROR = '[Parcel Info Small Claims Documents] Remove Error';
const RESET_STATE = '[Parcel Info Small Claims Documents] Reset State';

const documentIdProps = props<{ documentId: number }>();

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ documents: DocumentViewModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

const select = createAction(SELECT, documentIdProps);
const selectWithoutDownload = createAction(SELECT_WITHOUT_DOWNLOAD, documentIdProps);

const setSortParams = createAction(SET_SORT_PARAMS, props<{ params: Sort }>());

const selectPrev = createAction(SELECT_PREV);
const selectNext = createAction(SELECT_NEXT);

const remove = createAction(REMOVE);
const removeSuccess = createAction(REMOVE_SUCCESS);
const removeError = createAction(REMOVE_ERROR, apiExceptionProps);

const resetState = createAction(RESET_STATE);

export const ParcelInfoSmallClaimsDocumentsActions = {
  load,
  loadSuccess,
  loadError,
  select,
  selectWithoutDownload,
  setSortParams,
  selectPrev,
  selectNext,
  remove,
  removeSuccess,
  removeError,
  resetState,
};
