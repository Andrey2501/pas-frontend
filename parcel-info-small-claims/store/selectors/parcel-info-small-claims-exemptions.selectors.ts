import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_MAT_SORT } from '../../constants';
import { adapter } from '../reducers/parcel-info-small-claims-exemptions.reducer';
import { SelectorsUtils } from '../utils/selectors.utils';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const selectParcelSmallClaimsExemptions = createSelector(
  selectFeature,
  ({ parcelInfoSmallClaimsExemptions }) => parcelInfoSmallClaimsExemptions
);
const { selectAll } = adapter.getSelectors();

const selectSmallClaimsExemptions = createSelector(selectParcelSmallClaimsExemptions, selectAll);

const selectIsLoaded = createSelector(selectParcelSmallClaimsExemptions, (state) => state.isLoaded);

const selectSortParams = createSelector(selectParcelSmallClaimsExemptions, (state) => state.sortParams);

const selectTableSortParams = createSelector(selectSortParams, (sort) => {
  const isCurrentSortValid = Boolean(sort.direction);

  return isCurrentSortValid ? ({ id: sort.active, start: sort.direction } as MatSortable) : DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_MAT_SORT;
});

const selectSortActive = createSelector(selectSortParams, ({ active }) => active);

const selectSortDirection = createSelector(selectSortParams, ({ direction }) => direction);

const selectSortedSmallClaimExemptionRows = createSelector(selectSmallClaimsExemptions, selectTableSortParams, (exemptions, sortParams) => {
  return SelectorsUtils.sortSmallClaimExemptions(exemptions, sortParams);
});

export const ParcelInfoSmallClaimsExemptionsSelectors = {
  selectSmallClaimsExemptions,
  selectSortedSmallClaimExemptionRows,
  selectSortDirection,
  selectSortActive,
  selectIsLoaded,
};
