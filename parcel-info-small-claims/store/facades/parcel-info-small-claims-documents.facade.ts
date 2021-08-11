import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsDocumentsActions } from '../actions';
import { ParcelInfoSmallClaimsDocumentsSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsDocumentsFacade {
  constructor(private readonly _store: Store) {}

  public readonly sortedDocumentsRows$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectSortedDocumentsRows);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectIsLoading);

  public readonly documentsTotal$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectDocumentsTotal);

  public readonly selectedDocumentIndexLabel$ = this._store.select(
    ParcelInfoSmallClaimsDocumentsSelectors.selectSelectedDocumentIndexLabel
  );

  public readonly selectPreviousDocumentId$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectPreviousDocumentId);

  public readonly selectNextDocumentId$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectNextDocumentId);

  public readonly isSelectedFirstDocument$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectIsSelectedFirstDocument);

  public readonly isSelectedLastDocument$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectIsSelectedLastDocument);

  public readonly selectedDocumentId$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectSelectedDocumentId);

  public readonly isNavigationAvailable$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectIsNavigationAvailable);

  public readonly isAbleToDeleteDocument$ = this._store.select(ParcelInfoSmallClaimsDocumentsSelectors.selectIsAbleToDeleteDocument);

  public load(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.load());
  }

  public resetState(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.resetState());
  }

  public remove(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.remove());
  }

  public select(documentId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.select({ documentId }));
  }

  public setSortParams(params: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.setSortParams({ params }));
  }

  public selectPrev(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.selectPrev());
  }

  public selectNext(): void {
    this._store.dispatch(ParcelInfoSmallClaimsDocumentsActions.selectNext());
  }
}
