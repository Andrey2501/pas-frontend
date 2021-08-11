import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash';
import { ISmallClaimParcelInformationSpecialDistrictsTableRow } from '../../interfaces';
import { adapter } from '../reducers/parcel-info-small-claims-parcel-information-special-districts.reducer';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const { selectAll } = adapter.getSelectors();

const selectState = createSelector(
  selectFeature,
  ({ parcelInfoSmallClaimsParcelInformationSpecialDistricts }) => parcelInfoSmallClaimsParcelInformationSpecialDistricts
);

const selectAllSpecialDistricts = createSelector(selectState, selectAll);

const selectSortParams = createSelector(selectState, (state) => state.sortParams);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectSelectedSpecialDistrictId = createSelector(selectState, (state) => state.selectedSpecialDistrictId);

const selectTableSortParams = createSelector(selectSortParams, (sort) => ({ id: sort.active, start: sort.direction } as MatSortable));

const selectSortActive = createSelector(selectSortParams, ({ active }) => active);

const selectSortDirection = createSelector(selectSortParams, ({ direction }) => direction);

const selectSortedSpecialDistricts = createSelector(
  selectAllSpecialDistricts,
  selectTableSortParams,
  (specialDistricts, tableSortParams) => {
    return orderBy(specialDistricts, [tableSortParams.id], [tableSortParams.start]);
  }
);

const selectInitialSpecialDistrict = createSelector(selectSortedSpecialDistricts, (specialDistricts) => {
  return specialDistricts[0];
});

const selectDefaultSpecialDistrictId = createSelector(
  selectInitialSpecialDistrict,
  (initialSpecialDistrict) => initialSpecialDistrict?.parcelSpecialDistrictId
);

const selectComputedSpecialDistrictId = createSelector(
  selectSelectedSpecialDistrictId,
  selectDefaultSpecialDistrictId,
  (specialDistrictId, defaultSpecialDistrictId) => specialDistrictId ?? defaultSpecialDistrictId
);

const selectSelectedSpecialDistrictIndex = createSelector(
  selectComputedSpecialDistrictId,
  selectSortedSpecialDistricts,
  (selectedSpecialDistrictId, specialDistricts) => {
    return specialDistricts.findIndex((specialDistrict) => specialDistrict.parcelSpecialDistrictId === selectedSpecialDistrictId);
  }
);

const selectSelectedSpecialDistrict = createSelector(
  selectSelectedSpecialDistrictIndex,
  selectSortedSpecialDistricts,
  (selectedSpecialDistrictIndex, sortedSpecialDistricts) => sortedSpecialDistricts[selectedSpecialDistrictIndex]
);

const selectDataSource = createSelector(
  selectSortedSpecialDistricts,
  selectComputedSpecialDistrictId,
  (sortedSpecialDistricts, selectedSpecialDistrictId) => {
    return sortedSpecialDistricts.map((specialDistrict) => {
      return {
        ...specialDistrict,
        isActive: specialDistrict.parcelSpecialDistrictId === selectedSpecialDistrictId,
      } as ISmallClaimParcelInformationSpecialDistrictsTableRow;
    });
  }
);

export const ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors = {
  selectDataSource,
  selectIsLoading,
  selectSelectedSpecialDistrict,
  selectComputedSpecialDistrictId,
  selectSortActive,
  selectSortDirection,
};
