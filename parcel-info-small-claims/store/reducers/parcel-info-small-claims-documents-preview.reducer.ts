import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { S3DownloadLinkResponse } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsDocumentsActions, ParcelInfoSmallClaimsDocumentsPreviewActions } from '../actions';

export interface IState extends IApiStateProps {
  s3DownloadLink: S3DownloadLinkResponse;
}

const initialState: IState = {
  error: null,
  isLoading: false,
  s3DownloadLink: null,
};

const parcelInfoSmallClaimsDocumentsPreviewReducer = createReducer(
  initialState,
  on(
    ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLink,
    ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocument,
    ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentByLink,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLinkSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    s3DownloadLink: action.s3DownloadLink,
  })),
  on(ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentByLinkSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(
    ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLinkError,
    ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentLinkError,
    (state, action) => ({
      ...state,
      selectedDocument: null,
      isLoading: false,
      error: action.error,
    })
  ),
  on(
    ParcelInfoSmallClaimsDocumentsPreviewActions.resetState,
    ParcelInfoSmallClaimsDocumentsActions.resetState,
    ParcelInfoSmallClaimsDocumentsActions.selectWithoutDownload,
    () => initialState
  )
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsDocumentsPreviewReducer(state, action);
}
