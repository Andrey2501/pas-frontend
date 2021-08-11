import { createSelector } from '@ngrx/store';
import { ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors } from './parcel-info-small-claims-parcel-information-at-time-of-small-claims.selectors';
import { ParcelInfoSmallClaimsParcelInformationSalesSelectors } from './parcel-info-small-claims-parcel-information-sales.selectors';
import { ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors } from './parcel-info-small-claims-parcel-information-special-districts.selectors';

const selectIsLoading = createSelector(
  ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors.selectIsLoading,
  ParcelInfoSmallClaimsParcelInformationSalesSelectors.selectIsLoading,
  ParcelInfoSmallClaimsParcelInformationSpecialDistrictsSelectors.selectIsLoading,
  (isTimeOfSmallClaimsLoading, isSalesLoading, isSpecialDistrictsLoading) => {
    return isTimeOfSmallClaimsLoading || isSalesLoading || isSpecialDistrictsLoading;
  }
);

export const ParcelInfoSmallClaimsParcelInformationSelectors = {
  selectIsLoading,
};
