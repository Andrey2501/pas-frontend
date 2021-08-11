import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsDocumentsPreviewActions } from '../actions';
import { ParcelInfoSmallClaimsDocumentsPreviewSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsDocumentsPreviewFacade {
  constructor(private readonly _store: Store) {}

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsDocumentsPreviewSelectors.selectIsLoading);

  public readonly selectedDocumentType$ = this._store.select(ParcelInfoSmallClaimsDocumentsPreviewSelectors.selectSelectedDocumentType);

  public readonly selectedDocumentUrl$ = this._store.select(ParcelInfoSmallClaimsDocumentsPreviewSelectors.selectSelectedDocumentUrl);

  public readonly isAbleToViewPreview$ = this._store.select(ParcelInfoSmallClaimsDocumentsPreviewSelectors.selectIsAbleToViewPreview);

  public readonly selectedDocumentViewerType$ = this._store.select(
    ParcelInfoSmallClaimsDocumentsPreviewSelectors.selectSelectedDocumentViewerType
  );

  public resetState(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsPreviewActions.resetState());
  }

  public downLoadDocument(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocument());
  }
}
