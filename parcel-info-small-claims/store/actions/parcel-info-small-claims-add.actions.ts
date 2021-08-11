import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { FieldViewModel } from 'src/app/shared/services';
import { ISmallClaimGrievanceProps } from '../../interfaces';
import { GrievanceExemptionModel } from '../../../parcel-info-grievances/models';

const ADD = '[Parcel Info Small Claim Add] Add';
const ADD_SUCCESS = '[Parcel Info Small Claim Add] Add Success';
const ADD_ERROR = '[Parcel Info Small Claim Add] Add Error';

const add = createAction(ADD, props<{ formValue: IDefaultFormValue }>());
const addSuccess = createAction(ADD_SUCCESS);
const addError = createAction(ADD_ERROR, apiExceptionProps);

const SET_ADD_MODE = '[Parcel Info Small Claim Add] Set Add Mode';

const setAddMode = createAction(SET_ADD_MODE, props<{ isAddMode: boolean }>());

const LOAD_PARCEL_DETAILS = '[Parcel Info Small Claim Add] Load Parcel Details';
const LOAD_PARCEL_DETAILS_SUCCESS = '[Parcel Info Small Claim Add] Load Parcel Details Success';
const LOAD_PARCEL_DETAILS_ERROR = '[Parcel Info Small Claim Add] Load Parcel Details Error';

const loadParcelDetails = createAction(LOAD_PARCEL_DETAILS);
const loadParcelDetailsSuccess = createAction(LOAD_PARCEL_DETAILS_SUCCESS, props<{ fields: FieldViewModel[] }>());
const loadParcelDetailsError = createAction(LOAD_PARCEL_DETAILS_ERROR, apiExceptionProps);

const SET_GRIEVANCE_PROPS = '[Parcel Info Small Claim Add] Set Grievance Props';

const setGrievanceProps = createAction(SET_GRIEVANCE_PROPS, props<{ grievanceProps: ISmallClaimGrievanceProps }>());

const RESET = '[Parcel Info Small Claim Add] Reset';

const reset = createAction(RESET);

const SET_REASON_VALUE = '[Parcel Info Small Claim Add] Set Reason Value';
const RESET_REASON_VALUE = '[Parcel Info Small Claim Add] Reset Reason Value';

const setReasonValue = createAction(SET_REASON_VALUE, props<{ reasonValue: string }>());
const resetReasonValue = createAction(RESET_REASON_VALUE);

const ADD_EXEMPTION = '[Parcel Info Small Claim Add] Add Exemption';
const SET_EXEMPTIONS = '[Parcel Info Small Claim Add] Set Exemptions';

const addExemption = createAction(ADD_EXEMPTION, props<{ model: GrievanceExemptionModel }>());
const setExemptions = createAction(SET_EXEMPTIONS, props<{ exemptions: GrievanceExemptionModel[] }>());

export const ParcelInfoSmallClaimAddActions = {
  add,
  addSuccess,
  addError,
  setAddMode,
  loadParcelDetails,
  loadParcelDetailsSuccess,
  loadParcelDetailsError,
  setGrievanceProps,
  reset,
  setReasonValue,
  addExemption,
  setExemptions,
  resetReasonValue,
};
