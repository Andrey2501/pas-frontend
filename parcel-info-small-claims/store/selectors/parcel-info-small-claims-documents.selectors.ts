import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash';
import { PermissionSelectors } from 'src/app/auth/store/selectors';
import { DEFAULT_DOCUMENTS_TABLE_MAT_SORT } from 'src/app/shared/constants';
import { DocumentsUtils } from 'src/app/shared/utils/documents.utils';
import { adapter } from '../reducers/parcel-info-small-claims-documents.reducer';
import { ParcelInfoSmallClaimsDocumentsPreviewSelectors } from './parcel-info-small-claims-documents-preview.selectors';
import { ParcelInfoSmallClaimsDocumentsUploadSelectors } from './parcel-info-small-claims-documents-upload.selectors';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const { selectAll, selectTotal } = adapter.getSelectors();

const selectState = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsDocuments);

const selectDocuments = createSelector(selectState, selectAll);

const selectDocumentsTotal = createSelector(selectState, selectTotal);

const selectSelectedDocumentId = createSelector(selectState, (state) => state.selectedDocumentId);

const selectIsLoadingDocuments = createSelector(selectState, (state) => state.isLoading);

const selectIsLoading = createSelector(
  selectIsLoadingDocuments,
  ParcelInfoSmallClaimsDocumentsPreviewSelectors.selectIsLoading,
  ParcelInfoSmallClaimsDocumentsUploadSelectors.selectIsLoading,
  (...props) => {
    return props.some(Boolean);
  }
);

const selectSortParams = createSelector(selectState, (state) => state.sortParams);

const selectTableSortParams = createSelector(selectSortParams, (sort) => {
  const isAbleToSort = Boolean(sort.direction);

  return isAbleToSort ? ({ id: sort.active, start: sort.direction } as MatSortable) : DEFAULT_DOCUMENTS_TABLE_MAT_SORT;
});

const selectDocumentsTableRows = createSelector(selectDocuments, selectSelectedDocumentId, (documents, selectedDocumentId) => {
  return documents.map((document) => DocumentsUtils.mapToDocumentTableRow(document, selectedDocumentId));
});

const selectSortedDocumentsRows = createSelector(selectDocumentsTableRows, selectTableSortParams, (documentsRows, sortParams) => {
  return orderBy(documentsRows, [sortParams.id], [sortParams.start]);
});

const selectSelectedDocumentIndex = createSelector(
  selectSortedDocumentsRows,
  selectSelectedDocumentId,
  (sortedDocumentRows, selectedDocumentId) => {
    return sortedDocumentRows.findIndex((documentRow) => documentRow.documentId === selectedDocumentId);
  }
);

const selectSelectedDocumentIndexLabel = createSelector(selectSelectedDocumentIndex, (selectedDocumentIndex) => selectedDocumentIndex + 1);

const selectIsSelectedFirstDocument = createSelector(selectSelectedDocumentIndex, (selectedGrievanceIndex) => selectedGrievanceIndex === 0);

const selectIsSelectedLastDocument = createSelector(
  selectSelectedDocumentIndex,
  selectDocumentsTotal,
  (selectedDocumentIndex, documentTotal) => selectedDocumentIndex === documentTotal - 1
);

const selectPreviousDocumentId = createSelector(
  selectSelectedDocumentIndex,
  selectSortedDocumentsRows,
  (selectedDocumentIndex, documents) => documents[selectedDocumentIndex - 1]?.documentId
);

const selectNextDocumentId = createSelector(
  selectSelectedDocumentIndex,
  selectSortedDocumentsRows,
  (selectedDocumentIndex, documents) => documents[selectedDocumentIndex + 1]?.documentId
);

const selectIsNavigationAvailable = createSelector(selectDocumentsTotal, (documentsTotal) => documentsTotal > 1);

const selectIsAbleToDeleteDocument = createSelector(
  selectSelectedDocumentId,
  PermissionSelectors.selectIsAbleToDeleteDocument,
  (selectedDocumentId, isAbleToDeleteDocument) => {
    return selectedDocumentId && isAbleToDeleteDocument;
  }
);

export const ParcelInfoSmallClaimsDocumentsSelectors = {
  selectIsLoading,
  selectSortedDocumentsRows,
  selectDocumentsTotal,
  selectSelectedDocumentId,
  selectSelectedDocumentIndexLabel,
  selectIsSelectedFirstDocument,
  selectIsSelectedLastDocument,
  selectPreviousDocumentId,
  selectNextDocumentId,
  selectIsNavigationAvailable,
  selectIsAbleToDeleteDocument,
};
