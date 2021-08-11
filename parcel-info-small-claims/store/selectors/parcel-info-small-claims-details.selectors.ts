import { createSelector } from '@ngrx/store';
import { flatten } from 'lodash';
import { ConfigurationSmallClaimsSelectors } from 'src/app/configuration/store/selectors';
import { ContactFullNameViewModel, FieldViewModel } from 'src/app/shared/services';
import { findEqualFieldValue, SelectorsUtils } from 'src/app/shared/utils';
import { DROPDOWN_FIELDS, ID_FIELDS, SMALL_CLAIM_COMPLAINT_REASON_CODE_FIELD, SMALL_CLAIM_COMPLAINT_REASON_FIELD } from '../../constants';
import { SelectorsUtils as SmallClaimSelectorsUtils } from '../utils/selectors.utils';
import { ParcelInfoSmallClaimAddSelectors } from './parcel-info-small-claims-add.selectors';
import { ParcelInfoSmallClaimsComplaintReasonsSelectors } from './parcel-info-small-claims-complaint-reason.selectors';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ParcelInfoSmallClaimsSelectors } from './parcel-info-small-claims.selectors';
import { PENDING_EXEMPTIONS_CONTROL } from 'src/app/exemptions/constants';

const selectSmallClaimsDetails = createSelector(selectFeature, (state) => state.parcelInfoSmallClaimsDetails);

const selectIsLoading = createSelector(selectSmallClaimsDetails, (state) => state.isLoading);

const selectParams = createSelector(
  ParcelInfoSmallClaimsSelectors.selectComputedId,
  ConfigurationSmallClaimsSelectors.selectVisibleColumnsList,
  (selectedSmallClaimId, visibleColumnsList) => {
    return {
      selectedSmallClaimId,
      visibleColumnsList,
    };
  }
);

const selectDetails = createSelector(selectSmallClaimsDetails, (state) => state.details);
const selectIsFormDataExist = createSelector(selectDetails, (details) => Boolean(details));
const selectFields = createSelector(selectDetails, (details) => details?.fields);
const selectLastChanged = createSelector(selectDetails, (details) => details?.lastChanged);
const selectLastChangedBy = createSelector(selectDetails, (details) => details?.by);
const selectPetitionerDetails = createSelector(selectSmallClaimsDetails, (state) => state.petitionerDetails);
const selectIsPetitionerDataExist = createSelector(selectSmallClaimsDetails, (details) => Boolean(details.petitionerDetails));
const selectLawyerDetails = createSelector(selectSmallClaimsDetails, (state) => state.lawyerDetails);

const selectOverallInformationFields = createSelector(
  selectFields,
  ConfigurationSmallClaimsSelectors.selectOverallInformationColumnsList,
  (fields, overallInformationColumnsList) => {
    return SmallClaimSelectorsUtils.filterListFields(fields, [...overallInformationColumnsList, SMALL_CLAIM_COMPLAINT_REASON_CODE_FIELD]);
  }
);

const selectPetitionerInformationFields = createSelector(
  selectFields,
  ConfigurationSmallClaimsSelectors.selectPetitionerInformationColumnsList,
  (fields, petitionerInformationColumnsList) => {
    return SmallClaimSelectorsUtils.filterListFields(fields, [
      ...petitionerInformationColumnsList,
      ID_FIELDS.petitionerId,
      ID_FIELDS.lawyerId,
    ]);
  }
);

const selectTotalsFields = createSelector(
  selectFields,
  ConfigurationSmallClaimsSelectors.selectTotalsColumnsList,
  (fields, totalsColumnsList) => SmallClaimSelectorsUtils.filterListFields(fields, totalsColumnsList)
);

const selectOwnerInformationFields = createSelector(
  selectFields,
  ConfigurationSmallClaimsSelectors.selectOwnerInformationColumnsList,
  (fields, ownerInformationColumnsList) => SmallClaimSelectorsUtils.filterListFields(fields, ownerInformationColumnsList)
);

const selectOverallInformationSettingsItems = createSelector(
  ConfigurationSmallClaimsSelectors.selectSortedVisibleList,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (sortedVisibleList, isAddMode) => {
    return isAddMode ? SmallClaimSelectorsUtils.filterAddMode(sortedVisibleList.overallInformation) : sortedVisibleList.overallInformation;
  }
);

const selectIsAddOrModifyMode = createSelector(
  ParcelInfoSmallClaimsSelectors.selectIsModifyMode,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (...props) => props.some(Boolean)
);

const selectInitialComplaintReasonCode = createSelector(selectFields, (fields) => {
  return findEqualFieldValue(fields, SMALL_CLAIM_COMPLAINT_REASON_CODE_FIELD);
});

const selectSelectedComplaintReasonCodeField = createSelector(
  ParcelInfoSmallClaimsComplaintReasonsSelectors.selectSelectedComplaintReason,
  selectInitialComplaintReasonCode,
  (selectedComplaintReason, initialComplaintReasonCode) => {
    const reasonCode = selectedComplaintReason ? selectedComplaintReason.grievanceReasonCode : initialComplaintReasonCode;

    return {
      name: SMALL_CLAIM_COMPLAINT_REASON_FIELD,
      value: reasonCode,
    } as FieldViewModel;
  }
);

const selectInitialComplaintReason = createSelector(selectFields, (fields) => {
  return findEqualFieldValue(fields, SMALL_CLAIM_COMPLAINT_REASON_FIELD);
});

const selectComplaintReasonValue = createSelector(
  ParcelInfoSmallClaimsComplaintReasonsSelectors.selectSelectedComplaintReason,
  selectInitialComplaintReason,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (selectedComplaintReason, initialComplaintReason, isAddMode) => {
    const isComplaintReasonChanged = selectedComplaintReason || isAddMode;

    return isComplaintReasonChanged
      ? SmallClaimSelectorsUtils.mapComplaintReasonToDisplayedValue(selectedComplaintReason)
      : initialComplaintReason;
  }
);

const selectOverallInformationAddModeFields = createSelector(
  ParcelInfoSmallClaimAddSelectors.selectParcelDetailsFields,
  selectSelectedComplaintReasonCodeField,
  (parcelDetailsFields, selectedComplaintReasonCodeField) => {
    const overallInfoDates = SmallClaimSelectorsUtils.getOverallInfoDefaultValuesDates();

    return parcelDetailsFields?.concat(overallInfoDates, selectedComplaintReasonCodeField);
  }
);

const selectOverallInformationAllFields = createSelector(
  selectOverallInformationFields,
  selectIsAddOrModifyMode,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  selectOverallInformationAddModeFields,
  selectSelectedComplaintReasonCodeField,
  (overallInformationFields, isAddOrModifyMode, isAddMode, addModeFields, selectedComplaintReasonCodeField) => {
    const fields = isAddMode ? addModeFields : overallInformationFields;

    return isAddOrModifyMode ? SmallClaimSelectorsUtils.replaceFieldValues(fields, true, [selectedComplaintReasonCodeField]) : fields;
  }
);

const selectOverallInformationFormControls = createSelector(
  selectOverallInformationSettingsItems,
  selectIsAddOrModifyMode,
  selectOverallInformationAllFields,
  (overallInformationSettingItems, isAddOrModifyMode, overallInformationAllFields) => {
    return SmallClaimSelectorsUtils.mapToConfiguredControls(overallInformationAllFields, overallInformationSettingItems, isAddOrModifyMode);
  }
);

const selectPetitionerInformationFormControls = createSelector(
  ConfigurationSmallClaimsSelectors.selectSortedVisibleList,
  selectPetitionerInformationFields,
  selectPetitionerDetails,
  selectLawyerDetails,
  selectIsAddOrModifyMode,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (sortedVisibleList, fields, petitionerDetails, lawyerDetails, isAddOrModifyMode, isAddMode) => {
    const updatedPetitionerFormFields = SmallClaimSelectorsUtils.replaceFieldValues(fields, true, petitionerDetails);
    const updatedPetitionerInformationFormFields = SmallClaimSelectorsUtils.replaceFieldValues(
      isAddMode ? petitionerDetails : updatedPetitionerFormFields,
      true,
      lawyerDetails
    );

    return SmallClaimSelectorsUtils.mapToConfiguredControls(
      updatedPetitionerInformationFormFields ? updatedPetitionerInformationFormFields : lawyerDetails,
      sortedVisibleList.petitionerInformation,
      isAddOrModifyMode
    );
  }
);

const selectOwnerInformationFormControls = createSelector(
  ConfigurationSmallClaimsSelectors.selectSortedVisibleList,
  selectOwnerInformationFields,
  ParcelInfoSmallClaimAddSelectors.selectParcelDetailsFields,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (sortedVisibleList, fields, parcelDetailsFields, isAddMode) => {
    const actualFields = isAddMode ? parcelDetailsFields : fields;

    return SelectorsUtils.mapToConfiguredFormControls(sortedVisibleList.ownerInformation, actualFields);
  }
);

const selectTotalsSettingsItems = createSelector(
  ConfigurationSmallClaimsSelectors.selectSortedVisibleList,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (sortedVisibleList, isAddMode) => {
    return isAddMode ? SmallClaimSelectorsUtils.filterAddMode(sortedVisibleList.totals) : sortedVisibleList.totals;
  }
);

const selectTotalsFormControls = createSelector(
  selectTotalsSettingsItems,
  selectTotalsFields,
  ParcelInfoSmallClaimAddSelectors.selectParcelDetailsFields,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (totalsSettingItems, fields, parcelDetailsFields, isAddMode) => {
    const actualFields = isAddMode ? parcelDetailsFields : fields;

    return SelectorsUtils.mapToConfiguredFormControls(totalsSettingItems, actualFields);
  }
);

const selectFormGroupControls = createSelector(
  selectOverallInformationFormControls,
  selectPetitionerInformationFormControls,
  selectOwnerInformationFormControls,
  selectTotalsFormControls,
  (...controls) => {
    return flatten(controls);
  }
);

const selectFormProps = createSelector(
  selectFormGroupControls,
  ParcelInfoSmallClaimsSelectors.selectIsModifyMode,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (controls, isModifyMode, isAddMode) => {
    const values = isAddMode ? SmallClaimSelectorsUtils.mapToValues(controls) : {};

    return {
      controls: [...controls, PENDING_EXEMPTIONS_CONTROL],
      isModifyMode,
      values,
    };
  }
);

const selectInitialLawyerName = createSelector(selectFields, selectIsFormDataExist, (fields, isFormDataExists) => {
  return isFormDataExists ? findEqualFieldValue(fields, DROPDOWN_FIELDS.lawyerName) : null;
});
const selectInitialLawyerId = createSelector(selectFields, selectIsFormDataExist, (fields, isFormDataExists) => {
  return isFormDataExists ? findEqualFieldValue(fields, ID_FIELDS.lawyerId) : null;
});
const selectInitialLawyer = createSelector(selectInitialLawyerName, selectInitialLawyerId, (lawyerName, lawyerId) => {
  return { contactId: lawyerId, fullName: lawyerName } as ContactFullNameViewModel;
});

const selectPetitionerName = createSelector(selectFields, selectIsFormDataExist, (fields, isFormDataExists) => {
  return isFormDataExists ? findEqualFieldValue(fields, DROPDOWN_FIELDS.petitionerName) : null;
});
const selectPetitionerId = createSelector(selectFields, selectIsFormDataExist, (fields, isFormDataExists) => {
  return isFormDataExists ? findEqualFieldValue(fields, ID_FIELDS.petitionerId) : null;
});
const selectInitialPetitioner = createSelector(selectPetitionerName, selectPetitionerId, (petitionerName, petitionerId) => {
  return { contactId: petitionerId, fullName: petitionerName } as ContactFullNameViewModel;
});

const selectPetitionerInformationDetailColumns = createSelector(
  ConfigurationSmallClaimsSelectors.selectSortedVisibleList,
  (sortedVisibleList) => SmallClaimSelectorsUtils.filterEditableDetailColumns(sortedVisibleList.petitionerInformation)
);

const selectUpdatedLawyerName = createSelector(
  selectPetitionerDetails,
  selectIsPetitionerDataExist,
  (petitionerDetails, isPetitionerDataExists) => {
    return isPetitionerDataExists ? findEqualFieldValue(petitionerDetails, DROPDOWN_FIELDS.lawyerName) : null;
  }
);
const selectUpdatedLawyerId = createSelector(
  selectPetitionerDetails,
  selectIsPetitionerDataExist,
  (petitionerDetails, isPetitionerDataExists) => {
    return isPetitionerDataExists ? findEqualFieldValue(petitionerDetails, ID_FIELDS.lawyerId) : null;
  }
);
const selectUpdatedLawyer = createSelector(
  selectUpdatedLawyerName,
  selectUpdatedLawyerId,
  selectInitialLawyer,
  (lawyerName, lawyerId, initialLawyer) => {
    return Boolean(lawyerName) ? ({ contactId: lawyerId, fullName: lawyerName } as ContactFullNameViewModel) : initialLawyer;
  }
);

export const ParcelInfoSmallClaimDetailsSelectors = {
  selectIsLoading,
  selectParams,
  selectFormProps,
  selectIsFormDataExist,
  selectLastChanged,
  selectLastChangedBy,
  selectOverallInformationFormControls,
  selectOwnerInformationFormControls,
  selectPetitionerInformationFormControls,
  selectInitialPetitioner,
  selectInitialLawyer,
  selectTotalsFormControls,
  selectPetitionerInformationDetailColumns,
  selectUpdatedLawyer,
  selectPetitionerId,
  selectInitialLawyerId,
  selectComplaintReasonValue,
};
