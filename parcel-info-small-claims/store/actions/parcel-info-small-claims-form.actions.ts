import { createAction, props } from '@ngrx/store';
import { IDefaultFormValue } from 'src/app/shared/interfaces';

const SET = '[Parcel Info Small Claim Form] Set';
const RESET = '[Parcel Info Small Claim Form] Reset';

const set = createAction(SET, props<{ formGroupValue: IDefaultFormValue }>());
const reset = createAction(RESET);

export const ParcelInfoSmallClaimsFormActions = {
  set,
  reset,
};
