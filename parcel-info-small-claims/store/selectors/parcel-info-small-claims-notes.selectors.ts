import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash';
import { PermissionSelectors } from 'src/app/auth/store/selectors';
import { ParcelInfoDetailsSelectors } from 'src/app/parcel-info/store/selectors';
import { ParcelInfoDetailsMenu } from '../../../shared/enums';
import { IFooterControlsOptions, INoteTableRow } from '../../../shared/interfaces';
import { adapter } from '../reducers/parcel-info-small-claims-notes.reducer';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ParcelInfoSmallClaimsSelectors } from './parcel-info-small-claims.selectors';

const { selectAll, selectTotal } = adapter.getSelectors();

const selectState = createSelector(selectFeature, ({ parcelInfoSmallClaimsNotes }) => parcelInfoSmallClaimsNotes);

const selectAllNotes = createSelector(selectState, selectAll);

const selectTotalNotes = createSelector(selectState, selectTotal);

const selectSortParams = createSelector(selectState, (state) => state.sortParams);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectSelectedNoteId = createSelector(selectState, (state) => state.selectedNoteId);

const selectTableSortParams = createSelector(selectSortParams, (sort) => ({ id: sort.active, start: sort.direction } as MatSortable));

const selectSortActive = createSelector(selectSortParams, ({ active }) => active);

const selectSortDirection = createSelector(selectSortParams, ({ direction }) => direction);

const selectSortedNotes = createSelector(selectAllNotes, selectTableSortParams, (notes, tableSortParams) => {
  return orderBy(notes, [tableSortParams.id], [tableSortParams.start]);
});

const selectInitialNote = createSelector(selectSortedNotes, (notes) => notes[0]);

const selectDefaultNoteId = createSelector(selectInitialNote, (initialNote) => initialNote?.noteId);

const selectComputedNoteId = createSelector(selectSelectedNoteId, selectDefaultNoteId, (noteId, defaultNoteId) => noteId ?? defaultNoteId);

const selectSelectedNoteIndex = createSelector(selectComputedNoteId, selectSortedNotes, (selectedNoteId, notes) => {
  return notes.findIndex((note) => note.noteId === selectedNoteId);
});

const selectSelectedNote = createSelector(
  selectSelectedNoteIndex,
  selectSortedNotes,
  (selectedNoteIndex, sortedNotes) => sortedNotes[selectedNoteIndex]
);

const selectIsShowAddButton = createSelector(
  ParcelInfoSmallClaimsSelectors.selectSelectedSmallClaim,
  PermissionSelectors.selectIsAbleToAddNote,
  (selectedSmallClaim, isAbleToAddNote) => isAbleToAddNote && selectedSmallClaim
);

const selectIsEditMode = createSelector(selectState, (state) => state.isEditMode);

const selectIsViewMode = createSelector(selectState, (state) => !state.isEditMode);

const selectIsShowNoteActions = createSelector(
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  selectIsEditMode,
  selectSelectedNote,
  (isParcelModifyMode, isSmallClaimModifyMode) => isParcelModifyMode && !isSmallClaimModifyMode
);

const selectIsFirstNote = createSelector(selectSelectedNoteIndex, (selectedNoteIndex) => selectedNoteIndex === 0);

const selectIsLastNote = createSelector(
  selectSelectedNoteIndex,
  selectSortedNotes,
  (selectedNoteIndex, notes) => selectedNoteIndex === notes.length - 1
);

const selectIsMoreThenOneNote = createSelector(selectTotalNotes, (total) => total > 1);

const selectIsShowEditButton = createSelector(
  selectSelectedNote,
  PermissionSelectors.selectIsAbleToModifyNote,
  (selectedNote, isAbleToModifyNote) => selectedNote && isAbleToModifyNote
);

const selectIsShowDeleteButton = createSelector(
  selectSelectedNote,
  PermissionSelectors.selectIsAbleToDeleteNote,
  (selectedNote, isAbleToDeleteNote) => selectedNote && isAbleToDeleteNote
);

const selectNotesLength = createSelector(selectSortedNotes, (notes) => notes?.length);

const selectPrevNoteId = createSelector(
  selectSortedNotes,
  selectSelectedNoteIndex,
  (sortedNotes, noteIndex) => sortedNotes[noteIndex - 1]?.noteId
);

const selectNextNoteId = createSelector(
  selectSortedNotes,
  selectSelectedNoteIndex,
  (sortedNotes, noteIndex) => sortedNotes[noteIndex + 1]?.noteId
);

const selectDataSource = createSelector(selectSortedNotes, selectComputedNoteId, (sortedNotes, selectedNoteId) => {
  return sortedNotes.map((note) => {
    return {
      ...note,
      isActive: note.noteId === selectedNoteId,
    } as INoteTableRow;
  });
});

const selectIsShowNoteInfo = createSelector(selectIsViewMode, selectSelectedNote, (isViewMode, selectedNote) => isViewMode && selectedNote);

const selectIsShowNoteControls = createSelector(
  selectIsViewMode,
  selectSortedNotes,
  (isViewMode, sortedNotes) => sortedNotes.length > 0 && isViewMode
);

const selectFooterControlsOptions = createSelector(
  selectIsMoreThenOneNote,
  selectSelectedNoteIndex,
  selectNotesLength,
  selectIsFirstNote,
  selectIsLastNote,
  (isMoreThenOneNote, selectedNoteIndex, notesLength, isFirstNote, isLastNote) => {
    return {
      isMoreThenOneItem: isMoreThenOneNote,
      selectedIndex: selectedNoteIndex,
      itemsLength: notesLength,
      isFirst: isFirstNote,
      isLast: isLastNote,
      itemName: ParcelInfoDetailsMenu.Note,
    } as IFooterControlsOptions;
  }
);

export const ParcelInfoSmallClaimsNoteSelectors = {
  selectDataSource,
  selectIsLoading,
  selectSelectedNote,
  selectComputedNoteId,
  selectIsShowAddButton,
  selectIsShowNoteActions,
  selectIsEditMode,
  selectIsViewMode,
  selectIsFirstNote,
  selectIsLastNote,
  selectIsShowEditButton,
  selectIsShowDeleteButton,
  selectPrevNoteId,
  selectNextNoteId,
  selectSortActive,
  selectSortDirection,
  selectIsShowNoteInfo,
  selectIsShowNoteControls,
  selectFooterControlsOptions,
};
