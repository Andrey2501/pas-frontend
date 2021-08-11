import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsNotesActions } from '../actions';
import { ParcelInfoSmallClaimsNoteSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsNotesFacade {
  constructor(private readonly _store: Store) {}

  public readonly dataSource$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectDataSource);

  public readonly selectedNote$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectSelectedNote);

  public readonly computedNoteId$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectComputedNoteId);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsLoading);

  public readonly isShowNoteInfo$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsShowNoteInfo);

  public readonly isShowAddButton$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsShowAddButton);

  public readonly footerControlsOptions$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectFooterControlsOptions);

  public readonly isShowNoteActions$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsShowNoteActions);

  public readonly isEditMode$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsEditMode);

  public readonly isViewMode$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsViewMode);

  public readonly isFirstNote$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsFirstNote);

  public readonly isLastNote$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsLastNote);

  public readonly isShowNoteControls$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsShowNoteControls);

  public readonly isShowEditButton$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsShowEditButton);

  public readonly isShowDeleteButton$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectIsShowDeleteButton);

  public readonly prevNoteId$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectPrevNoteId);

  public readonly nextNoteId$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectNextNoteId);

  public readonly sortActive$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectSortActive);

  public readonly sortDirection$ = this._store.select(ParcelInfoSmallClaimsNoteSelectors.selectSortDirection);

  public selectPrev(): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.selectPrev());
  }

  public selectNext(): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.selectNext());
  }

  public select(noteId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.select({ noteId }));
  }

  public setSortParams(params: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.setSortParams({ params }));
  }

  public setEditMode(isEditMode: boolean): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.setEditMode({ isEditMode }));
  }

  public resetSelection(): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.resetSelection());
  }

  public add(note: string): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.add({ note }));
  }

  public remove(): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.remove());
  }

  public update(note: string): void {
    this._store.dispatch(ParcelInfoSmallClaimsNotesActions.update({ note }));
  }
}
