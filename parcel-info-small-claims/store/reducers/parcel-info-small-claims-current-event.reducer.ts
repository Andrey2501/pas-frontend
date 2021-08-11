import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { EventViewModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsCurrentEventActions } from '../actions';

export interface IState extends IApiStateProps {
  isViewMode: boolean;
  selectedEvent: EventViewModel;
}

const initialState: IState = {
  isViewMode: true,
  selectedEvent: null,
  isLoading: false,
  error: null,
};

const parcelInfoSmallClaimsCurrentEventReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsCurrentEventActions.loadEvent, (state) => ({ ...state, isLoading: true })),
  on(ParcelInfoSmallClaimsCurrentEventActions.loadEventSuccess, (state, action) => ({ ...state, selectedEvent: action.selectedEvent })),
  on(
    ParcelInfoSmallClaimsCurrentEventActions.loadEventError,
    ParcelInfoSmallClaimsCurrentEventActions.createEventError,
    ParcelInfoSmallClaimsCurrentEventActions.updateEventError,
    ParcelInfoSmallClaimsCurrentEventActions.deleteEventError,
    (state, action) => ({ ...state, isLoading: false, error: action.error })
  ),
  on(ParcelInfoSmallClaimsCurrentEventActions.reset, () => initialState),
  on(ParcelInfoSmallClaimsCurrentEventActions.setViewMode, (state, { isViewMode }) => ({ ...state, isViewMode }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsCurrentEventReducer(state, action);
}
