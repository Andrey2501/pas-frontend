import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { AppealExemptionViewModel, SmallClaimsResultsViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsResultsActions } from '../actions';

export interface IState extends EntityState<AppealExemptionViewModel>, IApiStateProps {
  results: SmallClaimsResultsViewModel;
  selectedParcelExemptionId: number;
}

const selectId = (model: AppealExemptionViewModel): string => model.exemptionCode;

export const adapter = createEntityAdapter<AppealExemptionViewModel>({ selectId });

const initialState: IState = adapter.getInitialState({
  isLoading: false,
  results: null,
  selectedParcelExemptionId: null,
  error: null,
});

const parcelInfoSmallClaimsResultsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsResultsActions.loadResults, ParcelInfoSmallClaimsResultsActions.loadFinalExemptions, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    selectedParcelExemptionId: null,
  })),
  on(ParcelInfoSmallClaimsResultsActions.loadResultsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    results: action.results,
  })),
  on(ParcelInfoSmallClaimsResultsActions.loadResultsError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ParcelInfoSmallClaimsResultsActions.loadFinalExemptionsSuccess, (state, action) => {
    return adapter.setAll(action.finalExemptions, {
      ...state,
      isLoading: false,
      finalExemptions: action.finalExemptions,
    });
  }),
  on(ParcelInfoSmallClaimsResultsActions.loadFinalExemptionsError, (state, action) => {
    return adapter.removeAll({
      ...state,
      isLoading: false,
      error: action.error,
    });
  }),
  on(ParcelInfoSmallClaimsResultsActions.selectParcelExemption, (state, action) => ({
    ...state,
    selectedParcelExemptionId: action.parcelExemptionId,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsResultsReducer(state, action);
}
