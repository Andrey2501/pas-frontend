import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ParcelInfoRefreshActions } from 'src/app/parcel-info/store/actions';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { SmallClaimViewModel } from 'src/app/shared/services';
import { DEFAULT_SMALL_CLAIMS_TABLE_SORT } from '../../constants';
import { SmallClaimsDetailsMenu } from '../../enums';
import { ParcelInfoSmallClaimsActions } from '../actions';

export interface IState extends EntityState<SmallClaimViewModel>, IApiStateProps {
  selectedSmallClaimId: number;
  sortParams: Sort;
  isViewFormMode: boolean;
  selectedMenu: SmallClaimsDetailsMenu;
}

function selectId(model: SmallClaimViewModel): number {
  return model.smallClaimId;
}

export const adapter: EntityAdapter<SmallClaimViewModel> = createEntityAdapter<SmallClaimViewModel>({
  selectId,
});

const initialState: IState = adapter.getInitialState({
  isLoading: false,
  error: null,
  selectedSmallClaimId: null,
  sortParams: DEFAULT_SMALL_CLAIMS_TABLE_SORT,
  isViewFormMode: true,
  selectedMenu: SmallClaimsDetailsMenu.Results,
});

const parcelInfoSmallClaimsReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsActions.remove, ParcelInfoSmallClaimsActions.load, ParcelInfoRefreshActions.refresh, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimsActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.smallClaims, {
      ...state,
      isLoading: false,
    });
  }),
  on(ParcelInfoSmallClaimsActions.removeSuccess, (state) => ({
    ...state,
    isLoading: false,
    selectedSmallClaimId: null,
  })),
  on(ParcelInfoSmallClaimsActions.removeError, ParcelInfoSmallClaimsActions.loadError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ParcelInfoSmallClaimsActions.selectNewSmallClaim, ParcelInfoSmallClaimsActions.select, (state, action) => ({
    ...state,
    selectedSmallClaimId: action.smallClaimId,
  })),
  on(ParcelInfoSmallClaimsActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.sortParams,
  })),
  on(ParcelInfoSmallClaimsActions.chooseDetailsMenu, (state, action) => ({
    ...state,
    selectedMenu: action.menu,
  })),
  on(ParcelInfoSmallClaimsActions.setViewFormMode, (state, action) => ({
    ...state,
    isViewFormMode: action.isViewFormMode,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsReducer(state, action);
}
