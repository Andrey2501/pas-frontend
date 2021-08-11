import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash';
import { ParcelInfoDetailsMenu } from 'src/app/shared/enums';
import { IFooterControlsOptions } from 'src/app/shared/interfaces';
import { ISmallClaimAppraisalParams, ISmallClaimsAppraisalsTableRow } from '../../interfaces';
import { adapter } from '../reducers/parcel-info-small-claims-appraisals.reducer';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { ParcelInfoSmallClaimsSelectors } from './parcel-info-small-claims.selectors';
import { PermissionSelectors } from 'src/app/auth/store/selectors';
import { ParcelInfoDetailsSelectors } from 'src/app/parcel-info/store/selectors';
import { YearSelectors } from 'src/app/assessment-year/store/selectors';
import { ContactFullNameViewModel } from 'src/app/shared/services';

const { selectAll, selectTotal } = adapter.getSelectors();

const selectState = createSelector(selectFeature, ({ parcelInfoSmallClaimsAppraisals }) => parcelInfoSmallClaimsAppraisals);

const selectAllAppraisals = createSelector(selectState, selectAll);

const selectTotalAppraisals = createSelector(selectState, selectTotal);

const selectSortParams = createSelector(selectState, (state) => state.sortParams);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectSelectedAppraisalId = createSelector(selectState, (state) => state.selectedAppraisalId);

const selectAppraiserIdCreated = createSelector(selectState, (state) => state.appraiserIdCreated);

const selectTableSortParams = createSelector(selectSortParams, (sort) => ({ id: sort.active, start: sort.direction } as MatSortable));

const selectSortActive = createSelector(selectSortParams, ({ active }) => active);

const selectSortDirection = createSelector(selectSortParams, ({ direction }) => direction);

const selectSortedAppraisals = createSelector(selectAllAppraisals, selectTableSortParams, (appraisals, tableSortParams) => {
  return orderBy(appraisals, [tableSortParams.id], [tableSortParams.start]);
});

const selectInitialAppraisal = createSelector(selectSortedAppraisals, (appraisals) => appraisals[0]);

const selectDefaultAppraisalId = createSelector(selectInitialAppraisal, (initialAppraisal) => initialAppraisal?.appraisalId);

const selectComputedAppraisalId = createSelector(
  selectSelectedAppraisalId,
  selectDefaultAppraisalId,
  (appraisalId, defaultAppraisalId) => appraisalId ?? defaultAppraisalId
);

const selectSelectedAppraisalIndex = createSelector(
  selectComputedAppraisalId,
  selectSortedAppraisals,
  (selectedAppraisalId, appraisals) => {
    return appraisals.findIndex((appraisal) => appraisal.appraisalId === selectedAppraisalId);
  }
);

const selectSelectedAppraisal = createSelector(
  selectSelectedAppraisalIndex,
  selectSortedAppraisals,
  (selectedAppraisalIndex, sortedAppraisals) => sortedAppraisals[selectedAppraisalIndex]
);

const selectSelectedAppraisalText = createSelector(selectSelectedAppraisal, (selectedAppraisal) => selectedAppraisal?.text);

const selectSelectedAppraisalLastChange = createSelector(selectSelectedAppraisal, (selectedAppraisal) => selectedAppraisal?.lastChange);

const selectSelectedAppraisalLastChangeBy = createSelector(selectSelectedAppraisal, (selectedAppraisal) => selectedAppraisal?.by);

const selectSelectedAppraiserId = createSelector(selectSelectedAppraisal, (selectedAppraisal) => selectedAppraisal?.appraiserId);

const selectSelectedAppraiserName = createSelector(selectSelectedAppraisal, (selectedAppraisal) => selectedAppraisal?.appraiser);

const selectIsViewMode = createSelector(selectState, (state) => !state.isEditMode);

const selectIsEditMode = createSelector(selectState, (state) => state.isEditMode);

const selectIsFirstAppraisal = createSelector(selectSelectedAppraisalIndex, (selectedAppraisalIndex) => selectedAppraisalIndex === 0);

const selectIsLastAppraisal = createSelector(
  selectSelectedAppraisalIndex,
  selectSortedAppraisals,
  (selectedAppraisalIndex, appraisals) => selectedAppraisalIndex === appraisals.length - 1
);

const selectIsMoreThenOneAppraisal = createSelector(selectTotalAppraisals, (total) => total > 1);

const selectAppraisalsLength = createSelector(selectSortedAppraisals, (appraisals) => appraisals.length);

const selectPrevAppraisalId = createSelector(
  selectSortedAppraisals,
  selectSelectedAppraisalIndex,
  (sortedAppraisals, appraisalIndex) => sortedAppraisals[appraisalIndex - 1]?.appraisalId
);

const selectNextAppraisalId = createSelector(
  selectSortedAppraisals,
  selectSelectedAppraisalIndex,
  (sortedAppraisals, appraisalIndex) => sortedAppraisals[appraisalIndex + 1]?.appraisalId
);

const selectDataSource = createSelector(selectSortedAppraisals, selectComputedAppraisalId, (sortedAppraisals, selectedAppraisalId) => {
  return sortedAppraisals.map((appraisal) => {
    return {
      ...appraisal,
      isActive: appraisal.appraisalId === selectedAppraisalId,
    } as ISmallClaimsAppraisalsTableRow;
  });
});

const selectFooterControlsOptions = createSelector(
  selectIsMoreThenOneAppraisal,
  selectSelectedAppraisalIndex,
  selectAppraisalsLength,
  selectIsFirstAppraisal,
  selectIsLastAppraisal,
  (isMoreThenOneAppraisal, selectedAppraisalIndex, appraisalsLength, isFirstAppraisal, isLastAppraisal) => {
    return {
      isMoreThenOneItem: isMoreThenOneAppraisal,
      selectedIndex: selectedAppraisalIndex,
      itemsLength: appraisalsLength,
      isFirst: isFirstAppraisal,
      isLast: isLastAppraisal,
      itemName: ParcelInfoDetailsMenu.Appraisal,
    } as IFooterControlsOptions;
  }
);

const selectIsShowAdd = createSelector(
  ParcelInfoSmallClaimsSelectors.selectIsGlobalModifyMode,
  ParcelInfoSmallClaimsSelectors.selectSelectedSmallClaim,
  PermissionSelectors.selectIsAbleToAddAppraisal,
  (...props) => {
    return props.every(Boolean);
  }
);

const selectIsShowEdit = createSelector(selectSelectedAppraisal, PermissionSelectors.selectIsAbleToModifyAppraisal, (...props) => {
  return props.every(Boolean);
});

const selectAppraisalParams = createSelector(
  ParcelInfoSmallClaimsSelectors.selectComputedId,
  ParcelInfoDetailsSelectors.selectParcelId,
  YearSelectors.selectYear,
  (appealId, parcelId, assessmentYear) => {
    return { appealId, parcelId, assessmentYear } as ISmallClaimAppraisalParams;
  }
);

const selectSelectedAppraisalForm = createSelector(
  selectSelectedAppraisal,
  selectIsEditMode,
  selectAppraiserIdCreated,
  (selectedAppraisal, isEditMode, appraiserId) => {
    const appraisalValues = isEditMode ? selectedAppraisal : null;

    if (appraiserId) {
      return { ...appraisalValues, appraiserId };
    }

    return appraisalValues;
  }
);

const selectInitialAppraiser = createSelector(selectSelectedAppraiserName, selectSelectedAppraiserId, (appraiserName, appraiserId) => {
  return { contactId: appraiserId, fullName: appraiserName } as ContactFullNameViewModel;
});

const selectIsShowDelete = createSelector(selectSelectedAppraisal, PermissionSelectors.selectIsAbleToDeleteAppraisal, (...props) => {
  return props.every(Boolean);
});

const selectIsShowControls = createSelector(
  selectIsViewMode,
  selectSortedAppraisals,
  (isViewMode, sortedAppraisals) => sortedAppraisals.length > 0 && isViewMode
);

const selectIsShowInfo = createSelector(selectIsViewMode, selectSelectedAppraisal, (...props) => {
  return props.every(Boolean);
});

export const ParcelInfoSmallClaimsAppraisalsSelectors = {
  selectDataSource,
  selectIsLoading,
  selectIsViewMode,
  selectPrevAppraisalId,
  selectNextAppraisalId,
  selectSortActive,
  selectSortDirection,
  selectFooterControlsOptions,
  selectSelectedAppraisal,
  selectSelectedAppraisalText,
  selectSelectedAppraisalLastChange,
  selectSelectedAppraisalLastChangeBy,
  selectIsShowAdd,
  selectAppraisalParams,
  selectIsShowEdit,
  selectIsEditMode,
  selectComputedAppraisalId,
  selectInitialAppraiser,
  selectSelectedAppraisalForm,
  selectIsShowDelete,
  selectIsShowControls,
  selectIsShowInfo,
};
