import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUploaderModel } from 'src/app/shared/models';
import { ParcelInfoSmallClaimsDocumentUploadActions } from '../actions';
import { ParcelInfoSmallClaimsDocumentsUploadSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsDocumentsUploadFacade {
  constructor(private readonly _store: Store) {}

  public readonly documents$ = this._store.select(ParcelInfoSmallClaimsDocumentsUploadSelectors.selectDocuments);

  public readonly document$ = this._store.select(ParcelInfoSmallClaimsDocumentsUploadSelectors.selectDocument);

  public readonly documentName$ = this._store.select(ParcelInfoSmallClaimsDocumentsUploadSelectors.selectDocumentName);

  public readonly isUploadDisabled$ = this._store.select(ParcelInfoSmallClaimsDocumentsUploadSelectors.selectIsUploadDisabled);

  public setDocumentToUpload(document: FileUploaderModel): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentUploadActions.setDocumentToUpload({ document }));
  }

  public removeDocumentToUpload(documentSource: string): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentUploadActions.removeDocumentToUpload({ documentSource }));
  }

  public getUploadLink(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentUploadActions.getUploadLink());
  }

  public resetState(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentUploadActions.resetState());
  }
}
