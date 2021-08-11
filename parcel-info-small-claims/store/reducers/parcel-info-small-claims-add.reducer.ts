import { Action, createReducer, on } from '@ngrx/store';
import { FieldViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimAddActions } from '../actions';
import { ISmallClaimGrievanceProps } from '../../interfaces';
import { ExemptionModel } from 'src/app/exemptions/models';

export interface IState {
  error: string;
  parcelDetails: FieldViewModel[];
  exemptions: ExemptionModel[];
  assessmentYears: number[];
  isLoading: boolean;
  isAddMode: boolean;
  grievanceProps: ISmallClaimGrievanceProps;
  reasonValue: string;
}

const initialState: IState = {
  error: null,
  parcelDetails: [],
  exemptions: [],
  assessmentYears: [],
  reasonValue: null,
  isLoading: false,
  isAddMode: false,
  grievanceProps: null,
};

const parcelInfoSmallClaimAddReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimAddActions.add, ParcelInfoSmallClaimAddActions.loadParcelDetails, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimAddActions.loadParcelDetailsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    parcelDetails: action.fields,
  })),
  on(ParcelInfoSmallClaimAddActions.addSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ParcelInfoSmallClaimAddActions.addError, ParcelInfoSmallClaimAddActions.loadParcelDetailsError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ParcelInfoSmallClaimAddActions.setAddMode, (state, action) => ({
    ...state,
    parcelDetails: [],
    exemptions: [],
    isAddMode: action.isAddMode,
  })),
  on(ParcelInfoSmallClaimAddActions.addExemption, (state, action) => ({
    ...state,
    exemptions: [...state.exemptions, action.model],
  })),
  on(ParcelInfoSmallClaimAddActions.setExemptions, (state, action) => ({
    ...state,
    exemptions: action.exemptions,
  })),
  on(ParcelInfoSmallClaimAddActions.setGrievanceProps, (state, { grievanceProps }) => ({
    ...state,
    grievanceProps,
  })),
  on(ParcelInfoSmallClaimAddActions.reset, () => initialState),
  on(ParcelInfoSmallClaimAddActions.setReasonValue, (state, action) => ({
    ...state,
    reasonValue: action.reasonValue,
  })),
  on(ParcelInfoSmallClaimAddActions.resetReasonValue, (state) => ({
    ...state,
    reasonValue: null,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimAddReducer(state, action);
}
