import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash';
import { PermissionSelectors } from 'src/app/auth/store/selectors';
import { GRIEVANCE } from 'src/app/parcel-info-grievances/constants';
import { ParcelInfoGrievancesSelectors } from 'src/app/parcel-info-grievances/store/selectors';
import { SelectorsUtils as GrievanceSelectorsUtils } from 'src/app/parcel-info-grievances/store/utils';
import { ParcelInfoDetailsTables } from 'src/app/parcel-info/enums';
import { ParcelInfoDetailsSelectors, ParcelInfoSelectors } from 'src/app/parcel-info/store/selectors';
import { DEFAULT_SMALL_CLAIMS_TABLE_MAT_SORT, PENDING_APPEAL_STATUS_LEVEL, SMALL_CLAIM_PENDING_STATUS } from '../../constants';
import { SmallClaimsDetailsMenu } from '../../enums';
import { ISmallClaimTableRow } from '../../interfaces';
import { ParcelInfoSmallClaimsDetailsModel, ParcelInfoSmallClaimsTableInfoModel } from '../../models';
import { adapter } from '../reducers/parcel-info-small-claims.reducer';
import { ParcelInfoSmallClaimAddSelectors } from './parcel-info-small-claims-add.selectors';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ConfigurationExemptionsSelectors } from '../../../configuration/store/selectors';
import { ParcelInfoSmallClaimsExemptionsSelectors } from './parcel-info-small-claims-exemptions.selectors';
import { ParcelInfoExemptionFormSelectors } from '../../../parcel-info-exemption/store/selectors';
import { IExemptionsInputsParams } from '../../../exemptions/interfaces';

const selectState = createSelector(selectFeature, ({ parcelInfoSmallClaims }) => parcelInfoSmallClaims);
const { selectAll, selectTotal } = adapter.getSelectors();

const selectSmallClaims = createSelector(selectState, selectAll);
const selectSmallClaimsTotal = createSelector(selectState, selectTotal);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);
const selectIsDataExist = createSelector(selectSmallClaimsTotal, (total) => total > 0);
const selectIsModifyMode = createSelector(selectState, (state) => !state.isViewFormMode);
const selectIsViewMode = createSelector(selectState, (state) => state.isViewFormMode);
const selectSelectedMenu = createSelector(selectState, (state) => state.selectedMenu);
const selectSortParams = createSelector(selectState, (state) => state.sortParams);
const selectIsGlobalModifyMode = createSelector(
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  selectIsModifyMode,
  (isParcelModifyMode, isSmallClaimModifyMode) => isParcelModifyMode && !isSmallClaimModifyMode
);

const selectIsNavigationAvailable = createSelector(selectSmallClaimsTotal, (smallClaimsTotal) => smallClaimsTotal > 1);

const selectTableSortParams = createSelector(selectSortParams, (sort) => {
  const isCurrentSortValid = Boolean(sort.direction);

  return isCurrentSortValid ? ({ id: sort.active, start: sort.direction } as MatSortable) : DEFAULT_SMALL_CLAIMS_TABLE_MAT_SORT;
});
const selectSortedRows = createSelector(selectSmallClaims, selectTableSortParams, (rows, sortParams) => {
  return orderBy(rows, [sortParams.id], [sortParams.start]);
});
const selectSelectedId = createSelector(selectState, (state) => state.selectedSmallClaimId);
const selectDefaultId = createSelector(selectSortedRows, (smallClaims) => smallClaims[0]?.smallClaimId);
const selectComputedId = createSelector(selectSelectedId, selectDefaultId, (smallClaimId, defaultSmallClaimId) => {
  return smallClaimId ?? defaultSmallClaimId;
});
const selectIsSmallClaimEntityActive = createSelector(
  ParcelInfoSelectors.selectSelectedTable,
  (selectedEntity) => selectedEntity === ParcelInfoDetailsTables.SmallClaims
);

const selectTableRows = createSelector(
  selectSortedRows,
  selectComputedId,
  selectIsSmallClaimEntityActive,
  (smallClaims, selectedSmallClaimId, isActive) => {
    return smallClaims.map((smallClaim) => {
      const selectedId = isActive ? selectedSmallClaimId : null;

      return {
        ...smallClaim,
        isActive: smallClaim.smallClaimId === selectedId,
      } as ISmallClaimTableRow;
    });
  }
);

const selectSelectedIndex = createSelector(selectSortedRows, selectComputedId, (sortedSmallClaimRows, selectedSmallClaimId) => {
  return sortedSmallClaimRows.findIndex((smallClaimRow) => smallClaimRow.smallClaimId === selectedSmallClaimId);
});
const selectPreviousId = createSelector(
  selectSelectedIndex,
  selectSortedRows,
  (selectedIndex, smallClaims) => smallClaims[selectedIndex - 1]?.smallClaimId
);
const selectNextId = createSelector(
  selectSelectedIndex,
  selectSortedRows,
  (selectedIndex, smallClaims) => smallClaims[selectedIndex + 1]?.smallClaimId
);
const selectTableRowsInfo = createSelector(selectTableRows, (tableRows) => {
  return new ParcelInfoSmallClaimsTableInfoModel(tableRows);
});

const selectPermissionViewMap = createSelector(
  PermissionSelectors.selectIsAbleToViewNote,
  PermissionSelectors.selectIsAbleToViewAppraisal,
  (isAbleToViewNote, isAbleToViewAppraisal) => {
    return new Map<SmallClaimsDetailsMenu, boolean>([
      [SmallClaimsDetailsMenu.Notes, isAbleToViewNote],
      [SmallClaimsDetailsMenu.Appraisals, isAbleToViewAppraisal],
    ]);
  }
);

const selectsDetailsMenuModels = createSelector(selectSelectedMenu, selectPermissionViewMap, (selectedMenu, permissionViewMap) => {
  const detailsMenuValues = Object.values(SmallClaimsDetailsMenu);

  return detailsMenuValues.map((detailsMenuValue) => {
    const isAbleToView = !permissionViewMap.has(detailsMenuValue) || permissionViewMap.get(detailsMenuValue);

    return new ParcelInfoSmallClaimsDetailsModel(selectedMenu, detailsMenuValue, isAbleToView);
  });
});

const selectSelectedSmallClaim = createSelector(selectSmallClaims, selectComputedId, (smallClaims, selectedSmallClaimId) => {
  return smallClaims.find((smallClaim) => smallClaim.smallClaimId === selectedSmallClaimId);
});

const selectSelectedYear = createSelector(
  selectSelectedSmallClaim,
  ParcelInfoSmallClaimAddSelectors.selectSelectedGrievanceAssessmentYear,
  (selectedSmallClaim, assessmentYear) => {
    return selectedSmallClaim?.year ?? assessmentYear;
  }
);

const selectIsSelectedSmallClaimPending = createSelector(
  selectSelectedSmallClaim,
  (selectedSmallClaim) => selectedSmallClaim?.disposition === SMALL_CLAIM_PENDING_STATUS
);
const selectSelectedSmallClaimIndexLabel = createSelector(selectSelectedIndex, (selectedSmallClaimIndex) => selectedSmallClaimIndex + 1);
const selectIsSelectedFirstSmallClaim = createSelector(selectSelectedIndex, (selectedSmallClaimIndex) => selectedSmallClaimIndex === 0);
const selectIsSelectedLastSmallClaim = createSelector(
  selectSelectedIndex,
  selectSmallClaimsTotal,
  (selectedSmallClaimIndex, smallClaimTotal) => selectedSmallClaimIndex === smallClaimTotal - 1
);

const selectIsAbleToEditSmallClaim = createSelector(
  PermissionSelectors.selectIsAbleToModifyPendingSmallClaim,
  selectIsSelectedSmallClaimPending,
  (...props) => {
    return props.every(Boolean);
  }
);

const selectCompletedGrievanceTableRows = createSelector(
  ParcelInfoGrievancesSelectors.selectSortedGrievanceRows,
  ParcelInfoSmallClaimAddSelectors.selectSelectedGrievanceId,
  (grievances, selectedGrievanceId) => {
    const grievanceTableRows = grievances.map((grievance) => {
      return GrievanceSelectorsUtils.mapToGrievanceTableRow(grievance, selectedGrievanceId);
    });

    return grievanceTableRows.filter((grievance) => grievance.disposition !== GRIEVANCE.grievancePendingDisposition);
  }
);

const selectIsSelectedCompletedGrievance = createSelector(
  selectCompletedGrievanceTableRows,
  ParcelInfoSmallClaimAddSelectors.selectSelectedGrievanceId,
  (grievances, selectedGrievanceId) => {
    return grievances.some((grievance) => grievance.appealId === selectedGrievanceId);
  }
);

const selectIsSelectedUncompletedGrievance = createSelector(selectIsSelectedCompletedGrievance, (isSelectedCompletedGrievance) => {
  return !isSelectedCompletedGrievance;
});

const selectIsAbleToAddInModifyMode = createSelector(
  PermissionSelectors.selectIsAbleToAddSmallClaim,
  selectIsGlobalModifyMode,
  (...props) => {
    return props.every(Boolean);
  }
);

const selectSelectedSmallClaimAppealStatusLevel = createSelector(
  selectSelectedSmallClaim,
  (selectedSmallClaim) => selectedSmallClaim?.appealStatusLevel
);

const selectIsPendingSmallClaim = createSelector(selectSelectedSmallClaimAppealStatusLevel, (appealStatusLevel) => {
  return PENDING_APPEAL_STATUS_LEVEL === appealStatusLevel;
});

const selectIsAbleToRemoveSmallClaim = createSelector(
  selectSelectedSmallClaim,
  PermissionSelectors.selectIsAbleToDeleteSmallClaim,
  selectIsPendingSmallClaim,
  (...props) => {
    return props.every(Boolean);
  }
);

const selectIsCanModify = createSelector(
  selectIsSelectedSmallClaimPending,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (...props) => {
    return props.some(Boolean);
  }
);

const selectIsExemptionModifyMode = createSelector(
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (...props) => {
    return props.some(Boolean);
  }
);

const selectExemptionModes = createSelector(
  selectIsCanModify,
  selectIsExemptionModifyMode,
  ParcelInfoSmallClaimAddSelectors.selectIsAddMode,
  (isCanModify, isModifyMode, isAddMode) => {
    return { isCanModify, isModifyMode, isAddMode };
  }
);

const selectPermissionParams = createSelector(
  PermissionSelectors.selectIsAbleToDeleteExemption,
  PermissionSelectors.selectIsAbleToAddExemption,
  (isAbleToDelete, isAbleToAdd) => ({ isAbleToDelete, isAbleToAdd })
);

const selectExemptionProps = createSelector(
  ConfigurationExemptionsSelectors.selectVisibleOverallInformationList,
  ParcelInfoSmallClaimsExemptionsSelectors.selectSmallClaimsExemptions,
  ParcelInfoExemptionFormSelectors.selectExemptionCodes,
  (visibleOverallInformationList, existedExemptions, exemptionCodes) => ({
    visibleOverallInformationList,
    existedExemptions,
    exemptionCodes,
  })
);

const selectExemptionParams = createSelector(
  selectExemptionProps,
  ParcelInfoDetailsSelectors.selectParcelId,
  selectPermissionParams,
  selectExemptionModes,
  ParcelInfoSmallClaimAddSelectors.selectNewExemptions,
  (exemptionProps, parcelId, permissionParams, exemptionModes, newExemptions) => {
    return {
      parcelId,
      newExemptions,
      ...exemptionProps,
      ...permissionParams,
      ...exemptionModes,
    } as IExemptionsInputsParams;
  }
);

export const ParcelInfoSmallClaimsSelectors = {
  selectIsLoading,
  selectSmallClaims,
  selectSmallClaimsTotal,
  selectIsSmallClaimEntityActive,
  selectTableRows,
  selectPreviousId,
  selectNextId,
  selectIsDataExist,
  selectIsModifyMode,
  selectIsViewMode,
  selectSelectedMenu,
  selectTableRowsInfo,
  selectsDetailsMenuModels,
  selectComputedId,
  selectSelectedSmallClaimIndexLabel,
  selectIsGlobalModifyMode,
  selectIsAbleToEditSmallClaim,
  selectIsAbleToRemoveSmallClaim,
  selectIsSelectedFirstSmallClaim,
  selectIsSelectedLastSmallClaim,
  selectIsNavigationAvailable,
  selectIsSelectedSmallClaimPending,
  selectSelectedSmallClaim,
  selectCompletedGrievanceTableRows,
  selectIsSelectedCompletedGrievance,
  selectIsSelectedUncompletedGrievance,
  selectIsAbleToAddInModifyMode,
  selectSelectedYear,
  selectExemptionParams,
};
