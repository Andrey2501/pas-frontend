import { createAction, props } from '@ngrx/store';
import { GrievanceReasonModel } from 'src/app/shared/services';
import { apiExceptionProps } from 'src/app/shared/constants';

const LOAD = '[Parcel Info SmallClaim Complaint Reasons] Load';
const LOAD_SUCCESS = '[Parcel Info SmallClaim Complaint Reasons] Load Success';
const LOAD_ERROR = '[Parcel Info SmallClaim Complaint Reasons] Load Error';
const SELECT = '[Parcel Info SmallClaim Complaint Reasons] Select';
const SELECT_ROW = '[Parcel Info SmallClaim Complaint Reasons] Select Row';
const CONFIRM_SELECTION = '[Parcel Info SmallClaim Complaint Reasons] Confirm Selection';
const RESET_COMPLAINT_REASON = '[Parcel Info SmallClaim Complaint Reasons] Reset Complaint Reason';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ complaintReasons: GrievanceReasonModel[] }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);
const select = createAction(SELECT, props<{ complaintReason: GrievanceReasonModel }>());
const selectRow = createAction(SELECT_ROW, props<{ reasonCode: string }>());
const confirmSelection = createAction(CONFIRM_SELECTION);
const resetComplaintReason = createAction(RESET_COMPLAINT_REASON);

export const ParcelInfoSmallClaimsComplaintReasonsActions = {
  load,
  loadSuccess,
  loadError,
  select,
  selectRow,
  confirmSelection,
  resetComplaintReason,
};
