import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { SmallClaimEventViewModel } from 'src/app/shared/services';
import { DEFAULT_EVENTS_TABLE_SORT, DEFAULT_SMALL_CLAIMS_EVENTS_LIMIT } from '../../constants';
import { ParcelInfoSmallClaimsEventsActions } from '../actions';

export interface IState extends EntityState<SmallClaimEventViewModel>, IApiStateProps {
  offset: number;
  limit: number;
  sortParams: Sort;
  selectedId: number;
}

function selectEventId(event: SmallClaimEventViewModel): number {
  return event.eventId;
}

export const adapter: EntityAdapter<SmallClaimEventViewModel> = createEntityAdapter<SmallClaimEventViewModel>({
  selectId: selectEventId,
});

const initialState: IState = adapter.getInitialState({
  isLoading: false,
  error: null,
  offset: 0,
  limit: DEFAULT_SMALL_CLAIMS_EVENTS_LIMIT,
  sortParams: DEFAULT_EVENTS_TABLE_SORT,
  selectedId: null,
});

const parcelInfoSmallClaimsEventsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsEventsActions.load, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    offset: 0,
    limit: DEFAULT_SMALL_CLAIMS_EVENTS_LIMIT,
  })),
  on(ParcelInfoSmallClaimsEventsActions.loadMoreError, ParcelInfoSmallClaimsEventsActions.loadError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ParcelInfoSmallClaimsEventsActions.loadSuccess, (state, { events }) => {
    return adapter.setAll(events, {
      ...state,
      isLoading: false,
    });
  }),
  on(ParcelInfoSmallClaimsEventsActions.setSortParams, (state, { sort }) => ({
    ...state,
    sortParams: sort,
  })),
  on(ParcelInfoSmallClaimsEventsActions.loadMore, (state) => ({
    ...state,
    isLoading: true,
    offset: state.offset + state.limit,
  })),
  on(ParcelInfoSmallClaimsEventsActions.loadMoreSuccess, (state, { events }) => {
    return adapter.addMany(events, {
      ...state,
      isLoading: false,
    });
  }),
  on(ParcelInfoSmallClaimsEventsActions.select, (state, { eventId }) => ({
    ...state,
    selectedId: eventId,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsEventsReducer(state, action);
}
