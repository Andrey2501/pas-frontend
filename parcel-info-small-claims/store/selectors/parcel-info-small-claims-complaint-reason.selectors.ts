import { createSelector } from '@ngrx/store';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { adapter } from '../reducers/parcel-info-small-claims-complaint-reasons.reducer';
import { mapToTableRows } from 'src/app/shared/utils';

const selectState = createSelector(selectFeature, ({ parcelInfoSmallClaimsComplaintReasons }) => parcelInfoSmallClaimsComplaintReasons);

const { selectAll } = adapter.getSelectors();
const selectComplaintReasons = createSelector(selectState, selectAll);
const selectSelectedComplaintReason = createSelector(selectState, (state) => state.selectedComplaintReason);
const selectSelectedRowCode = createSelector(selectState, (state) => state.selectedRowCode);

const selectSelectedRowReason = createSelector(selectComplaintReasons, selectSelectedRowCode, (complaintReasons, selectedRowCode) => {
  return complaintReasons.find((complaintReason) => complaintReason.grievanceReasonCode === selectedRowCode);
});

const selectComplaintReasonTableRows = createSelector(
  selectComplaintReasons,
  selectSelectedRowCode,
  (complaintReasons, selectedRowCode) => {
    return mapToTableRows(complaintReasons, 'grievanceReasonCode', selectedRowCode);
  }
);

const selectIsComplaintReasonSelectionInvalid = createSelector(selectSelectedRowCode, (selectedRowCode) => !Boolean(selectedRowCode));

export const ParcelInfoSmallClaimsComplaintReasonsSelectors = {
  selectSelectedComplaintReason,
  selectIsComplaintReasonSelectionInvalid,
  selectComplaintReasonTableRows,
  selectSelectedRowReason,
};
