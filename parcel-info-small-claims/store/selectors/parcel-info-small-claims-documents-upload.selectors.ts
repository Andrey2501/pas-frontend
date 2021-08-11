import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/parcel-info-small-claims-documents-upload.reducer';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const { selectAll, selectTotal } = adapter.getSelectors();

const selectDocumentsUploadState = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsDocumentsUpload);

const selectIsLoading = createSelector(selectDocumentsUploadState, (state) => state.isLoading);

const selectDocuments = createSelector(selectDocumentsUploadState, selectAll);

const selectDocument = createSelector(selectDocuments, (documents) => documents[0]);

const selectDocumentName = createSelector(selectDocument, (document) => document?.file.name);

const selectCount = createSelector(selectDocumentsUploadState, selectTotal);

const selectIsUploadDisabled = createSelector(selectCount, (total) => total === 0);

export const ParcelInfoSmallClaimsDocumentsUploadSelectors = {
  selectDocuments,
  selectDocument,
  selectDocumentName,
  selectIsUploadDisabled,
  selectIsLoading,
};
