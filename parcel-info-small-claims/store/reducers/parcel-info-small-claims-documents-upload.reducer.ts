import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { FileUploaderModel } from 'src/app/shared/models';
import { ParcelInfoSmallClaimsDocumentUploadActions } from '../actions';

export interface IState extends IApiStateProps, EntityState<FileUploaderModel> {}

const selectId = (file: FileUploaderModel): string => file.source;

export const adapter = createEntityAdapter<FileUploaderModel>({ selectId });

export const selectors = adapter.getSelectors();

const initialState = adapter.getInitialState({
  isLoading: null,
  error: null,
});

const parcelInfoSmallClaimsDocumentsUploadReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsDocumentUploadActions.setDocumentToUpload, (state, action) => adapter.setAll([action.document], state)),
  on(ParcelInfoSmallClaimsDocumentUploadActions.removeDocumentToUpload, (state, action) => adapter.removeOne(action.documentSource, state)),
  on(
    ParcelInfoSmallClaimsDocumentUploadActions.getUploadLink,
    ParcelInfoSmallClaimsDocumentUploadActions.uploadDocument,
    ParcelInfoSmallClaimsDocumentUploadActions.createDocument,
    (state) => ({
      ...state,
      error: null,
      isLoading: true,
    })
  ),
  on(
    ParcelInfoSmallClaimsDocumentUploadActions.getUploadLinkSuccess,
    ParcelInfoSmallClaimsDocumentUploadActions.uploadDocumentSuccess,
    ParcelInfoSmallClaimsDocumentUploadActions.createDocumentSuccess,
    (state) => ({
      ...state,
      error: null,
      isLoading: false,
    })
  ),
  on(
    ParcelInfoSmallClaimsDocumentUploadActions.getUploadLinkError,
    ParcelInfoSmallClaimsDocumentUploadActions.uploadDocumentError,
    ParcelInfoSmallClaimsDocumentUploadActions.createDocumentError,
    (state, action) => ({
      ...state,
      error: action.error,
      isLoading: false,
    })
  ),
  on(ParcelInfoSmallClaimsDocumentUploadActions.resetState, () => initialState)
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsDocumentsUploadReducer(state, action);
}
