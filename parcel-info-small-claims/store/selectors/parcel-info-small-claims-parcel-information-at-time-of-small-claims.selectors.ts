import { createSelector } from '@ngrx/store';
import { ConfigurationSmallClaimsSelectors } from 'src/app/configuration/store/selectors';
import { SelectorsUtils as SmallClaimsSelectorsUtils } from '../utils/selectors.utils';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ParcelInfoSmallClaimsSelectors } from './parcel-info-small-claims.selectors';

const selectParams = createSelector(
  ParcelInfoSmallClaimsSelectors.selectComputedId,
  ConfigurationSmallClaimsSelectors.selectTimeOfSmallClaimsParcelInformationColumnsList,
  (selectedSmallClaimId, visibleColumnsList) => {
    return {
      selectedSmallClaimId,
      visibleColumnsList,
    };
  }
);

const selectState = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaims);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectTimeOfSmallClaims = createSelector(selectState, (state) => state.timeOfSmallClaims);

const selectFields = createSelector(selectTimeOfSmallClaims, (timeOfSmallClaims) => timeOfSmallClaims?.fields);

const selectRawFields = createSelector(
  selectFields,
  ConfigurationSmallClaimsSelectors.selectTimeOfSmallClaimsParcelInformationColumnsList,
  (fields, timeOfSmallClaimsColumnsList) => {
    return SmallClaimsSelectorsUtils.filterListFields(fields, timeOfSmallClaimsColumnsList);
  }
);

const selectFieldsWithValues = createSelector(
  ConfigurationSmallClaimsSelectors.selectTimeOfSmallClaimsSettingsItems,
  selectRawFields,
  (timeOfSmallClaimsSettingItems, fields) => {
    return SmallClaimsSelectorsUtils.getSortedFieldsWithValues(fields, timeOfSmallClaimsSettingItems);
  }
);

export const ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsSelectors = {
  selectParams,
  selectIsLoading,
  selectTimeOfSmallClaims,
  selectFieldsWithValues,
};
