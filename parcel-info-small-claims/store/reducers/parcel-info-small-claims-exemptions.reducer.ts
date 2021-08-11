import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ParcelExemptionViewModel } from 'src/app/shared/services';
import { DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_SORT } from '../../constants';
import { ParcelInfoSmallClaimsExemptionsActions } from '../actions';

export interface IState extends EntityState<ParcelExemptionViewModel> {
  isLoading: boolean;
  isLoaded: boolean;
  error: string;
  sortParams: Sort;
}

function selectExemptionId(exemption: ParcelExemptionViewModel): string {
  return [exemption.exemptionId, exemption.dateBegin.toString(), exemption.dateEnd?.toString()].join('_');
}

export const adapter: EntityAdapter<ParcelExemptionViewModel> = createEntityAdapter<ParcelExemptionViewModel>({
  selectId: selectExemptionId,
});

const initialState: IState = adapter.getInitialState({
  isLoading: false,
  isLoaded: false,
  error: null,
  sortParams: DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_SORT,
});

const parcelInfoSmallClaimsExemptionsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsExemptionsActions.load, (state) => ({ ...state, isLoading: true, error: null, isLoaded: false })),
  on(ParcelInfoSmallClaimsExemptionsActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.exemptions, {
      ...state,
      isLoading: false,
      isLoaded: true,
    });
  }),
  on(ParcelInfoSmallClaimsExemptionsActions.loadError, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    error: action.error,
  })),
  on(ParcelInfoSmallClaimsExemptionsActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.sortParams,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsExemptionsReducer(state, action);
}
