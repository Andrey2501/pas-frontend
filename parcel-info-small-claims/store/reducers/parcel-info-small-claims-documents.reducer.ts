import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { DEFAULT_DOCUMENTS_TABLE_SORT } from 'src/app/shared/constants';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { DocumentViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsDocumentsActions } from '../actions';

export interface IState extends IApiStateProps, EntityState<DocumentViewModel> {
  sortParams: Sort;
  selectedDocumentId: number;
}

const selectId = (document: DocumentViewModel): number => document.documentId;

export const adapter = createEntityAdapter<DocumentViewModel>({ selectId });

const initialState = adapter.getInitialState({
  error: null,
  isLoading: false,
  sortParams: DEFAULT_DOCUMENTS_TABLE_SORT,
  selectedDocumentId: null,
});

const parcelInfoSmallClaimsDocumentsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsDocumentsActions.select, ParcelInfoSmallClaimsDocumentsActions.selectWithoutDownload, (state, action) => ({
    ...state,
    selectedDocumentId: action.documentId,
  })),
  on(ParcelInfoSmallClaimsDocumentsActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.params,
  })),
  on(ParcelInfoSmallClaimsDocumentsActions.load, ParcelInfoSmallClaimsDocumentsActions.remove, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimsDocumentsActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.documents, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(ParcelInfoSmallClaimsDocumentsActions.removeSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
    selectedDocumentId: null,
  })),
  on(ParcelInfoSmallClaimsDocumentsActions.resetState, () => initialState),
  on(ParcelInfoSmallClaimsDocumentsActions.removeError, ParcelInfoSmallClaimsDocumentsActions.loadError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsDocumentsReducer(state, action);
}
