import { createSelector } from '@ngrx/store';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import {
  CURRENT_TITLE,
  PRIOR_TITLE,
  SMALL_CLAIM_PENDING_STATUS,
  SMALL_CLAIMS_EVENT_FULL_MARKET_TITLE,
  SMALL_CLAIMS_EVENT_LAND_TITLE,
  SMALL_CLAIMS_EVENT_TOTAL_TITLE,
} from '../../constants';
import { adapter } from '../reducers/parcel-info-small-claims-results.reducer';
import { SmallClaimsResultsViewModel } from 'src/app/shared/services';
import { ISmallClaimPriorCurrentColumn, ISmallClaimPriorCurrentYearTitles } from '../../interfaces';
import { AppealUtils } from 'src/app/shared/utils';

const { selectAll } = adapter.getSelectors();

const selectState = createSelector(selectFeature, (state) => {
  return state.parcelInfoSmallClaimsResults;
});

const selectSmallClaimResults = createSelector(selectState, (state) => {
  return state.results;
});

const selectPetitionerReason = createSelector(selectSmallClaimResults, (results) => results?.petitionerReason);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectLandColumn = createSelector(selectSmallClaimResults, (results) => {
  return {
    title: SMALL_CLAIMS_EVENT_LAND_TITLE,
    priorValue: results?.priorLand,
    currentValue: results?.currentLand,
  } as ISmallClaimPriorCurrentColumn;
});

const selectTotalColumn = createSelector(selectSmallClaimResults, (results) => {
  return {
    title: SMALL_CLAIMS_EVENT_TOTAL_TITLE,
    priorValue: results?.priorTotal,
    currentValue: results?.currentTotal,
  } as ISmallClaimPriorCurrentColumn;
});

const selectFullMarketColumn = createSelector(selectSmallClaimResults, (results) => {
  return {
    title: SMALL_CLAIMS_EVENT_FULL_MARKET_TITLE,
    priorValue: results?.priorFullMarket,
    currentValue: results?.currentFullMarket,
  } as ISmallClaimPriorCurrentColumn;
});

const selectPriorCurrentColumns = createSelector(
  selectLandColumn,
  selectTotalColumn,
  selectFullMarketColumn,
  (landColumn, totalColumn, fullMarketColumn) => {
    return [landColumn, totalColumn, fullMarketColumn];
  }
);

const selectYearsInfo = createSelector(selectSmallClaimResults, (results) => {
  const priorYearTitle = results?.priorYear ? `${PRIOR_TITLE} (${results.priorYear})` : PRIOR_TITLE;
  const currentYearTitle = results?.currentYear ? `${CURRENT_TITLE} (${results.currentYear})` : CURRENT_TITLE;

  return {
    priorYearTitle,
    currentYearTitle,
  } as ISmallClaimPriorCurrentYearTitles;
});

const selectFinalExemptions = createSelector(selectState, selectAll);

const selectSelectedParcelExemptionId = createSelector(selectState, (state) => state.selectedParcelExemptionId);

const selectSelectedParcelExemption = createSelector(
  selectFinalExemptions,
  selectSelectedParcelExemptionId,
  (finalExemptions, selectedParcelExemptionId) => {
    return finalExemptions.find((exemption) => exemption.parcelExemptionId === selectedParcelExemptionId);
  }
);

const selectFinalExemptionTableRows = createSelector(
  selectFinalExemptions,
  selectSelectedParcelExemptionId,
  (finalExemptions, selectedParcelExemptionId) => {
    return finalExemptions.map((finalExemption) => AppealUtils.mapToFinalExemptionTableRow(finalExemption, selectedParcelExemptionId));
  }
);

const selectResults = createSelector(selectSmallClaimResults, (results) => {
  if (results?.result === SMALL_CLAIM_PENDING_STATUS) {
    return { result: results.result } as SmallClaimsResultsViewModel;
  }

  return results;
});

const selectSelectedParcelExemptionNote = createSelector(
  selectSelectedParcelExemption,
  (selectedParcelExemption) => selectedParcelExemption?.note
);

const selectIsShowResultNotes = createSelector(
  selectSelectedParcelExemptionId,
  (selectedParcelExemptionId) => !Boolean(selectedParcelExemptionId)
);

export const ParcelInfoSmallClaimsResultsSelectors = {
  selectResults,
  selectIsLoading,
  selectPriorCurrentColumns,
  selectYearsInfo,
  selectFinalExemptions,
  selectPetitionerReason,
  selectSelectedParcelExemption,
  selectFinalExemptionTableRows,
  selectSelectedParcelExemptionId,
  selectSelectedParcelExemptionNote,
  selectIsShowResultNotes,
};
