import { createSelector } from '@ngrx/store';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ParcelInfoDetailsSelectors } from 'src/app/parcel-info/store/selectors';
import { ISmallClaimPropsAdd } from '../../interfaces';

const selectSmallClaimAdd = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsAdd);

const selectIsAddMode = createSelector(selectSmallClaimAdd, (state) => state.isAddMode);

const selectParcelAssessmentYears = createSelector(selectSmallClaimAdd, (state) => state.assessmentYears);

const selectParcelDetailsFields = createSelector(selectSmallClaimAdd, (state) => state.parcelDetails);

const selectReasonValue = createSelector(selectSmallClaimAdd, (state) => state.reasonValue);

const selectGrievanceProps = createSelector(selectSmallClaimAdd, (state) => state.grievanceProps);

const selectSelectedGrievanceId = createSelector(selectGrievanceProps, (grievanceProps) => grievanceProps?.grievanceId);

const selectSelectedGrievanceAssessmentYear = createSelector(selectGrievanceProps, (grievanceProps) => grievanceProps?.assessmentYear);

const selectNewExemptions = createSelector(selectSmallClaimAdd, (state) => state.exemptions);

const selectAddProps = createSelector(
  ParcelInfoDetailsSelectors.selectParcelId,
  selectSelectedGrievanceId,
  selectReasonValue,
  selectNewExemptions,
  (parcelId, grievanceId, reason, newExemptions) => {
    return { parcelId, grievanceId, reason, newExemptions } as ISmallClaimPropsAdd;
  }
);

export const ParcelInfoSmallClaimAddSelectors = {
  selectIsAddMode,
  selectParcelAssessmentYears,
  selectParcelDetailsFields,
  selectNewExemptions,
  selectAddProps,
  selectSelectedGrievanceId,
  selectGrievanceProps,
  selectReasonValue,
  selectSelectedGrievanceAssessmentYear,
};
