import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { S3DownloadLinkResponse } from 'src/app/shared/services';

const LOAD_DOCUMENT_LINK = '[Parcel Info Small Claims Documents Document] Load Document Link';
const LOAD_DOCUMENT_LINK_SUCCESS = '[Parcel Info Small Claims Documents Document] Load Document Link Success';
const LOAD_DOCUMENT_LINK_ERROR = '[Parcel Info Small Claims Documents Document] Load Document Link Error';
const DOWNLOAD_DOCUMENT = '[Parcel Info Small Claims Documents Document] Download Document';
const DOWNLOAD_DOCUMENT_SUCCESS = '[Parcel Info Small Claims Documents Document] Download Document Success';
const DOWNLOAD_DOCUMENT_ERROR = '[Parcel Info Small Claims Documents Document] Download Document Error';
const DOWNLOAD_DOCUMENT_BY_LINK = '[Parcel Info Small Claims Documents Document] Download Document By Link';
const DOWNLOAD_DOCUMENT_BY_LINK_SUCCESS = '[Parcel Info Small Claims Documents Document] Download Document By Link Success';
const DOWNLOAD_DOCUMENT_BY_LINK_ERROR = '[Parcel Info Small Claims Documents Document] Download Document By Link Error';
const RESET_STATE = '[Parcel Info Small Claims Documents Document] Reset State';

const documentIdProps = props<{ documentId: number }>();
const s3DownloadLinkProps = props<{ s3DownloadLink: S3DownloadLinkResponse }>();
const documentDataProps = props<{ documentData: string }>();

const loadDocumentLink = createAction(LOAD_DOCUMENT_LINK, documentIdProps);
const loadDocumentLinkSuccess = createAction(LOAD_DOCUMENT_LINK_SUCCESS, s3DownloadLinkProps);
const loadDocumentLinkError = createAction(LOAD_DOCUMENT_LINK_ERROR, apiExceptionProps);

const downloadDocument = createAction(DOWNLOAD_DOCUMENT);

const downloadDocumentLink = createAction(DOWNLOAD_DOCUMENT, documentIdProps);
const downloadDocumentLinkSuccess = createAction(DOWNLOAD_DOCUMENT_SUCCESS);
const downloadDocumentLinkError = createAction(DOWNLOAD_DOCUMENT_ERROR, apiExceptionProps);

const downloadDocumentByLink = createAction(DOWNLOAD_DOCUMENT_BY_LINK, s3DownloadLinkProps);
const downloadDocumentByLinkSuccess = createAction(DOWNLOAD_DOCUMENT_BY_LINK_SUCCESS, documentDataProps);
const downloadDocumentByLinkError = createAction(DOWNLOAD_DOCUMENT_BY_LINK_ERROR, apiExceptionProps);

const resetState = createAction(RESET_STATE);

export const ParcelInfoSmallClaimsDocumentsPreviewActions = {
  loadDocumentLink,
  loadDocumentLinkSuccess,
  loadDocumentLinkError,
  downloadDocument,
  downloadDocumentLink,
  downloadDocumentLinkSuccess,
  downloadDocumentLinkError,
  downloadDocumentByLink,
  downloadDocumentByLinkSuccess,
  downloadDocumentByLinkError,
  resetState,
};
