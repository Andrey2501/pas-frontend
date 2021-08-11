import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { AppraisalViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsAppraisalsActions } from '../actions';

export interface IState extends EntityState<AppraisalViewModel>, IApiStateProps {
  selectedAppraisalId: number;
  sortParams: Sort;
  isEditMode: boolean;
  appraiserIdCreated: number;
}

function selectId(appraisal: AppraisalViewModel): number {
  return appraisal.appraisalId;
}

export const adapter = createEntityAdapter<AppraisalViewModel>({
  selectId,
});

const initialState: IState = adapter.getInitialState({
  selectedAppraisalId: null,
  sortParams: { active: 'dateOrdered', direction: 'desc' },
  isLoading: null,
  error: null,
  isEditMode: false,
  appraiserIdCreated: null,
});

const parcelInfoSmallClaimsAppraisalsReducer = createReducer(
  initialState,
  on(
    ParcelInfoSmallClaimsAppraisalsActions.edit,
    ParcelInfoSmallClaimsAppraisalsActions.add,
    ParcelInfoSmallClaimsAppraisalsActions.remove,
    ParcelInfoSmallClaimsAppraisalsActions.load,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(ParcelInfoSmallClaimsAppraisalsActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.appraisals, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(ParcelInfoSmallClaimsAppraisalsActions.setAppraiserId, (state, { appraiserId }) => ({
    ...state,
    appraiserIdCreated: appraiserId,
  })),
  on(ParcelInfoSmallClaimsAppraisalsActions.select, (state, action) => ({
    ...state,
    selectedAppraisalId: action.appraisalId,
  })),
  on(ParcelInfoSmallClaimsAppraisalsActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.params,
  })),
  on(
    ParcelInfoSmallClaimsAppraisalsActions.removeError,
    ParcelInfoSmallClaimsAppraisalsActions.editError,
    ParcelInfoSmallClaimsAppraisalsActions.addError,
    ParcelInfoSmallClaimsAppraisalsActions.loadError,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(
    ParcelInfoSmallClaimsAppraisalsActions.addSuccess,
    ParcelInfoSmallClaimsAppraisalsActions.editSuccess,
    (state, { selectedAppraisalId }) => ({
      ...state,
      isLoading: false,
      selectedAppraisalId,
    })
  ),
  on(ParcelInfoSmallClaimsAppraisalsActions.removeSuccess, (state) => ({
    ...state,
    isLoading: false,
    selectedAppraisalId: null,
  })),
  on(ParcelInfoSmallClaimsAppraisalsActions.setEditMode, (state, action) => ({
    ...state,
    isEditMode: action.isEditMode,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsAppraisalsReducer(state, action);
}
