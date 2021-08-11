import { Action, createReducer, on } from '@ngrx/store';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { ParcelInfoSmallClaimsFormActions } from '../actions';

export interface IState {
  formGroupValue: IDefaultFormValue;
}

const initialState: IState = {
  formGroupValue: null,
};

const parcelInfoSmallClaimsFormReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsFormActions.set, (state, { formGroupValue }) => ({
    ...state,
    formGroupValue,
  })),
  on(ParcelInfoSmallClaimsFormActions.reset, () => initialState)
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsFormReducer(state, action);
}
