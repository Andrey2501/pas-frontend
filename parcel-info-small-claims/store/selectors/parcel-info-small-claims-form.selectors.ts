import { createSelector } from '@ngrx/store';
import { isNil } from 'lodash';
import { SMALL_CLAIM_EDIT_CONDITIONAL_CONTROLS } from '../../constants';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const selectState = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsForm);

const selectFormGroupValue = createSelector(selectState, (state) => state.formGroupValue);

const selectIsSmallClaimExemptionsOnly = createSelector(selectFormGroupValue, (formGroupValue) => {
  return SMALL_CLAIM_EDIT_CONDITIONAL_CONTROLS.every((controlName) => isNil(formGroupValue[controlName]));
});

export const ParcelInfoSmallClaimsFormSelectors = {
  selectIsSmallClaimExemptionsOnly,
  selectFormGroupValue,
};
