import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { GrievanceReasonModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsComplaintReasonsActions } from '../actions';

export interface IState extends IApiStateProps, EntityState<GrievanceReasonModel> {
  selectedComplaintReason: GrievanceReasonModel;
  selectedRowCode: string;
}

function selectReasonCode(reason: GrievanceReasonModel): string {
  return reason.grievanceReasonCode;
}

export const adapter: EntityAdapter<GrievanceReasonModel> = createEntityAdapter<GrievanceReasonModel>({
  selectId: selectReasonCode,
});

const initialState: IState = adapter.getInitialState({
  isLoading: false,
  error: null,
  selectedComplaintReason: null,
  selectedRowCode: null,
});

const parcelInfoSmallClaimsComplaintReasonsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsComplaintReasonsActions.load, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimsComplaintReasonsActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.complaintReasons, {
      ...state,
      isLoading: false,
    });
  }),
  on(ParcelInfoSmallClaimsComplaintReasonsActions.loadError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(ParcelInfoSmallClaimsComplaintReasonsActions.select, (state, action) => ({
    ...state,
    selectedComplaintReason: action.complaintReason,
    selectedRowCode: null,
  })),
  on(ParcelInfoSmallClaimsComplaintReasonsActions.selectRow, (state, action) => ({
    ...state,
    selectedRowCode: action.reasonCode,
  })),
  on(ParcelInfoSmallClaimsComplaintReasonsActions.resetComplaintReason, (state) => ({
    ...state,
    selectedComplaintReason: null,
    selectedRowCode: null,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsComplaintReasonsReducer(state, action);
}
