import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { NoteViewModel } from 'src/app/shared/services';
import { DEFAULT_SMALL_CLAIMS_NOTES_TABLE_SORT } from '../../constants';
import { ParcelInfoSmallClaimsNotesActions } from '../actions';

export interface IState extends EntityState<NoteViewModel>, IApiStateProps {
  selectedNoteId: number;
  sortParams: Sort;
  isEditMode: boolean;
}

function selectId(note: NoteViewModel): number {
  return note.noteId;
}

export const adapter = createEntityAdapter<NoteViewModel>({
  selectId,
});

const initialState: IState = adapter.getInitialState({
  selectedNoteId: null,
  sortParams: DEFAULT_SMALL_CLAIMS_NOTES_TABLE_SORT,
  isLoading: null,
  error: null,
  isEditMode: false,
});

const parcelInfoSmallClaimsNotesReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsNotesActions.load, (state) => ({
    ...state,
    isLoading: true,
    selectedNoteId: null,
    error: null,
  })),
  on(ParcelInfoSmallClaimsNotesActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.notes, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(ParcelInfoSmallClaimsNotesActions.select, (state, action) => ({
    ...state,
    selectedNoteId: action.noteId,
  })),
  on(ParcelInfoSmallClaimsNotesActions.resetSelection, (state) => ({
    ...state,
    selectedNoteId: null,
  })),
  on(ParcelInfoSmallClaimsNotesActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.params,
  })),
  on(ParcelInfoSmallClaimsNotesActions.setEditMode, (state, action) => ({
    ...state,
    isEditMode: action.isEditMode,
  })),
  on(
    ParcelInfoSmallClaimsNotesActions.add,
    ParcelInfoSmallClaimsNotesActions.remove,
    ParcelInfoSmallClaimsNotesActions.update,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    ParcelInfoSmallClaimsNotesActions.addSuccess,
    ParcelInfoSmallClaimsNotesActions.removeSuccess,
    ParcelInfoSmallClaimsNotesActions.updateSuccess,
    (state) => ({
      ...state,
      isLoading: false,
      error: null,
    })
  ),
  on(
    ParcelInfoSmallClaimsNotesActions.loadError,
    ParcelInfoSmallClaimsNotesActions.addError,
    ParcelInfoSmallClaimsNotesActions.removeError,
    ParcelInfoSmallClaimsNotesActions.updateError,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  )
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsNotesReducer(state, action);
}
