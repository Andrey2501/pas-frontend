import { createAction, props } from '@ngrx/store';
import { Sort } from '@angular/material/sort';
import { SmallClaimEventViewModel } from 'src/app/shared/services';
import { apiExceptionProps } from 'src/app/shared/constants';

const LOAD = '[Parcel Info Small Claim Events] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claim Events] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claim Events] Load Error';

const eventsProps = props<{ events: SmallClaimEventViewModel[] }>();
const sortProps = props<{ sort: Sort }>();

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, eventsProps);
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

const SET_SORT_PARAMS = '[Parcel Info Small Claims Events] Set Sort Params';

const setSortParams = createAction(SET_SORT_PARAMS, sortProps);

const SCROLL = '[Parcel Info Small Claims Events] Scroll';

const scroll = createAction(SCROLL);

const LOAD_MORE = '[Parcel Info Small Claim Events] Load More';
const LOAD_MORE_SUCCESS = '[Parcel Info Small Claim Events] Load More Success';
const LOAD_MORE_ERROR = '[Parcel Info Small Claim Events] Load More Error';

const loadMore = createAction(LOAD_MORE);
const loadMoreSuccess = createAction(LOAD_MORE_SUCCESS, eventsProps);
const loadMoreError = createAction(LOAD_MORE_ERROR, apiExceptionProps);

const SELECT = '[Parcel Info Small Claim Events] Select';
const SELECT_PREV = '[Parcel Info Small Claim Events] Select Prev';
const SELECT_NEXT = '[Parcel Info Small Claim Events] Select Next';

const select = createAction(SELECT, props<{ eventId: number }>());
const selectPrev = createAction(SELECT_PREV);
const selectNext = createAction(SELECT_NEXT);

export const ParcelInfoSmallClaimsEventsActions = {
  setSortParams,
  scroll,
  load,
  loadSuccess,
  loadError,
  loadMore,
  loadMoreSuccess,
  loadMoreError,
  select,
  selectPrev,
  selectNext,
};
