import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { SqlSortDirections } from 'src/app/shared/enums';
import { SmallClaimEventSort, SqlSortOrder } from 'src/app/shared/services';
import { ISmallClaimEventsParams, SmallClaimEventTableRow } from '../../interfaces';
import { adapter } from '../reducers/parcel-info-small-claims-events.reducer';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ParcelInfoSmallClaimsSelectors } from './parcel-info-small-claims.selectors';

const { selectAll } = adapter.getSelectors();

const selectState = createSelector(selectFeature, ({ parcelInfoSmallClaimsEvents }) => parcelInfoSmallClaimsEvents);

const selectEvents = createSelector(selectState, selectAll);
const selectSelectedId = createSelector(selectState, ({ selectedId }) => selectedId);
const selectIndex = createSelector(selectEvents, selectSelectedId, (events, selectedId) => {
  return events.findIndex((event) => event.eventId === selectedId);
});
const selectPrevId = createSelector(selectEvents, selectIndex, (events, index) => {
  return events[index - 1]?.eventId;
});
const selectNextId = createSelector(selectEvents, selectIndex, (events, index) => {
  return events[index + 1]?.eventId;
});

const selectParams = createSelector(
  ParcelInfoSmallClaimsSelectors.selectComputedId,
  selectState,
  (smallClaimId, { sortParams, offset, limit }) => {
    const sortColumn = sortParams.active as SmallClaimEventSort;
    const sortOrder = sortParams.direction === SqlSortOrder.ASC.toLowerCase() ? SqlSortOrder.ASC : SqlSortOrder.DESC;

    return { sortColumn, sortOrder, offset, limit, smallClaimId } as ISmallClaimEventsParams;
  }
);

const selectSortParams = createSelector(selectState, ({ sortParams }) => {
  const start = sortParams.direction === SqlSortOrder.ASC.toLowerCase() ? SqlSortDirections.Asc : SqlSortDirections.Desc;

  return { id: sortParams.active, start } as MatSortable;
});

const selectDataSource = createSelector(selectEvents, selectSelectedId, (events, selectedId) => {
  return events.map((event) => {
    return ({
      ...event,
      isActive: event.eventId === selectedId,
    } as unknown) as SmallClaimEventTableRow;
  });
});

export const ParcelInfoSmallClaimsEventsSelectors = {
  selectParams,
  selectSortParams,
  selectPrevId,
  selectNextId,
  selectDataSource,
};
