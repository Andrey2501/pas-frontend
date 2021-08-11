import { Action, createReducer, on } from '@ngrx/store';
import { FieldViewModel, SmallClaimDetailViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimAddActions, ParcelInfoSmallClaimDetailsActions, ParcelInfoSmallClaimsActions } from '../actions';

export interface IState {
  details: SmallClaimDetailViewModel;
  isLoading: boolean;
  error: string;
  petitionerDetails: FieldViewModel[];
  lawyerDetails: FieldViewModel[];
}

const initialState: IState = {
  details: null,
  isLoading: false,
  error: null,
  petitionerDetails: [],
  lawyerDetails: [],
};

const parcelInfoSmallClaimsDetailsReducer = createReducer(
  initialState,
  on(
    ParcelInfoSmallClaimDetailsActions.load,
    ParcelInfoSmallClaimDetailsActions.loadPetitionerDetails,
    ParcelInfoSmallClaimDetailsActions.loadLawyerDetails,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(ParcelInfoSmallClaimDetailsActions.loadSuccess, (state, action) => ({
    ...state,
    details: action.smallClaimDetails,
    isLoading: false,
  })),
  on(
    ParcelInfoSmallClaimDetailsActions.loadError,
    ParcelInfoSmallClaimDetailsActions.loadPetitionerDetailsError,
    ParcelInfoSmallClaimDetailsActions.loadLawyerDetailsError,
    ParcelInfoSmallClaimDetailsActions.saveError,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(ParcelInfoSmallClaimDetailsActions.loadPetitionerDetailsSuccess, (state, action) => ({
    ...state,
    petitionerDetails: action.petitionerDetails,
    lawyerDetails: null,
    isLoading: false,
  })),
  on(
    ParcelInfoSmallClaimDetailsActions.resetContactDetails,
    ParcelInfoSmallClaimsActions.setViewFormMode,
    ParcelInfoSmallClaimAddActions.setAddMode,
    (state) => ({
      ...state,
      petitionerDetails: null,
      lawyerDetails: null,
    })
  ),
  on(ParcelInfoSmallClaimDetailsActions.loadLawyerDetailsSuccess, (state, action) => ({
    ...state,
    lawyerDetails: action.lawyerDetails,
    isLoading: false,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsDetailsReducer(state, action);
}
