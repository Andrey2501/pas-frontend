import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { FileUploaderModel } from 'src/app/shared/models';
import { S3UploadLinkResponse } from 'src/app/shared/services';

const SET_DOCUMENT_TO_UPLOAD = '[Parcel Info Small Claims Documents Upload] Set Document To Upload';
const REMOVE_DOCUMENT_TO_UPLOAD = '[Parcel Info Small Claims Documents Upload] Remove Document To Upload';

const GET_UPLOAD_LINK = '[Parcel Info Small Claims Documents Upload] Get Upload Link';
const GET_UPLOAD_LINK_SUCCESS = '[Parcel Info Small Claims Documents Upload] Upload Link Success';
const GET_UPLOAD_LINK_ERROR = '[Parcel Info Small Claims Documents Upload] Upload Link Error';

const UPLOAD_DOCUMENT = '[Parcel Info Small Claims Documents Upload] Upload Document';
const UPLOAD_DOCUMENT_SUCCESS = '[Parcel Info Small Claims Documents Upload] Upload Document Success';
const UPLOAD_DOCUMENT_ERROR = '[Parcel Info Small Claims Documents Upload] Upload Document Error';

const CREATE_DOCUMENT = '[Parcel Info Small Claims Documents Upload] Create Document';
const CREATE_DOCUMENT_SUCCESS = '[Parcel Info Small Claims Documents Upload] Create Document Success';
const CREATE_DOCUMENT_ERROR = '[Parcel Info Small Claims Documents Upload] Create Document Error';

const RESET_STATE = '[Parcel Info Documents Small Claims Upload] Reset State';

const setDocumentToUpload = createAction(SET_DOCUMENT_TO_UPLOAD, props<{ document: FileUploaderModel }>());
const removeDocumentToUpload = createAction(REMOVE_DOCUMENT_TO_UPLOAD, props<{ documentSource: string }>());

const getUploadLink = createAction(GET_UPLOAD_LINK);
const getUploadLinkSuccess = createAction(GET_UPLOAD_LINK_SUCCESS);
const getUploadLinkError = createAction(GET_UPLOAD_LINK_ERROR, apiExceptionProps);

const uploadDocument = createAction(UPLOAD_DOCUMENT, props<{ uploadLinkResponse: S3UploadLinkResponse }>());
const uploadDocumentSuccess = createAction(UPLOAD_DOCUMENT_SUCCESS);
const uploadDocumentError = createAction(UPLOAD_DOCUMENT_ERROR, apiExceptionProps);

const createDocument = createAction(CREATE_DOCUMENT, props<{ key: string }>());
const createDocumentSuccess = createAction(CREATE_DOCUMENT_SUCCESS);
const createDocumentError = createAction(CREATE_DOCUMENT_ERROR, apiExceptionProps);

const resetState = createAction(RESET_STATE);

export const ParcelInfoSmallClaimsDocumentUploadActions = {
  setDocumentToUpload,
  removeDocumentToUpload,
  getUploadLink,
  getUploadLinkSuccess,
  getUploadLinkError,
  uploadDocument,
  uploadDocumentSuccess,
  uploadDocumentError,
  createDocument,
  createDocumentSuccess,
  createDocumentError,
  resetState,
};
