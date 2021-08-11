import { createSelector } from '@ngrx/store';
import { ParcelInfoDocumentViewerTypes } from 'src/app/parcel-info-documents/enum';
import { DocumentTypes } from 'src/app/shared/enums';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const selectState = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsDocumentsPreview);

const selectS3DownloadLink = createSelector(selectState, (state) => state.s3DownloadLink);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectSelectedDocumentUrl = createSelector(selectS3DownloadLink, (downloadLinkResponse) => downloadLinkResponse?.uri);

const selectSelectedDocumentContentType = createSelector(
  selectS3DownloadLink,
  (downloadLinkResponse) => downloadLinkResponse?.contentType as DocumentTypes
);

const selectSelectedDocumentType = createSelector(selectSelectedDocumentContentType, (selectedDocumentContentType) => {
  const isWordDocument = [DocumentTypes.Docx, DocumentTypes.Doc].includes(selectedDocumentContentType);
  const isExcelDocument = [DocumentTypes.Xls, DocumentTypes.Xlsx].includes(selectedDocumentContentType);

  if (selectedDocumentContentType?.includes(DocumentTypes.Image)) {
    return DocumentTypes.Image;
  }

  if (selectedDocumentContentType === DocumentTypes.Pdf) {
    return DocumentTypes.Document;
  }

  if (isWordDocument) {
    return DocumentTypes.Document;
  }

  if (isExcelDocument) {
    return DocumentTypes.Document;
  }

  return selectedDocumentContentType;
});

const selectIsAbleToViewPreview = createSelector(selectSelectedDocumentUrl, (selectedDocumentUrl) => {
  return selectedDocumentUrl;
});

const selectSelectedDocumentViewerType = createSelector(selectSelectedDocumentContentType, (selectedDocumentContentType) => {
  switch (selectedDocumentContentType) {
    case DocumentTypes.Pdf:
      return ParcelInfoDocumentViewerTypes.Pdf;

    case DocumentTypes.Docx:
    case DocumentTypes.Doc:
    case DocumentTypes.Xls:
    case DocumentTypes.Xlsx:
      return ParcelInfoDocumentViewerTypes.Office;

    default:
      return selectedDocumentContentType;
  }
});

export const ParcelInfoSmallClaimsDocumentsPreviewSelectors = {
  selectIsLoading,
  selectSelectedDocumentType,
  selectSelectedDocumentUrl,
  selectIsAbleToViewPreview,
  selectS3DownloadLink,
  selectSelectedDocumentViewerType,
};
