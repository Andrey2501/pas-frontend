import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { SmallClaimSpecialDistrictViewModel } from 'src/app/shared/services';
import { DEFAULT_SMALL_CLAIMS_SPECIAL_DISTRICTS_TABLE_SORT } from '../../constants';
import { ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions } from '../actions';

export interface IState extends EntityState<SmallClaimSpecialDistrictViewModel>, IApiStateProps {
  selectedSpecialDistrictId: number;
  sortParams: Sort;
}

function selectId(specialDistrict: SmallClaimSpecialDistrictViewModel): number {
  return specialDistrict.parcelSpecialDistrictId;
}

export const adapter = createEntityAdapter<SmallClaimSpecialDistrictViewModel>({
  selectId,
});

const initialState: IState = adapter.getInitialState({
  selectedSpecialDistrictId: null,
  sortParams: DEFAULT_SMALL_CLAIMS_SPECIAL_DISTRICTS_TABLE_SORT,
  isLoading: null,
  error: null,
});

const parcelInfoSmallClaimsParcelInformationSpecialDistrictsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.load, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.specialDistricts, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.loadError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.select, (state, action) => ({
    ...state,
    selectedSpecialDistrictId: action.specialDistrictId,
  })),
  on(ParcelInfoSmallClaimsParcelInformationSpecialDistrictsActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.params,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsParcelInformationSpecialDistrictsReducer(state, action);
}
