import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { SmallClaimDetailViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions } from '../actions';

export interface IState extends IApiStateProps {
  timeOfSmallClaims: SmallClaimDetailViewModel;
}

const initialState: IState = {
  timeOfSmallClaims: null,
  isLoading: null,
  error: null,
};

const parcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.load, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.loadSuccess, (state, { timeOfSmallClaims }) => ({
    ...state,
    timeOfSmallClaims,
    isLoading: false,
  })),
  on(ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsActions.loadError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsReducer(state, action);
}
