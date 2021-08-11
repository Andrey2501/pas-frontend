import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IApiStateProps } from 'src/app/shared/interfaces';
import { SmallClaimSaleViewModel } from 'src/app/shared/services';
import { DEFAULT_SMALL_CLAIMS_SALES_TABLE_SORT } from '../../constants';
import { ParcelInfoSmallClaimsParcelInformationSalesActions } from '../actions';

export interface IState extends EntityState<SmallClaimSaleViewModel>, IApiStateProps {
  selectedSaleId: number;
  sortParams: Sort;
}

function selectId(sale: SmallClaimSaleViewModel): number {
  return sale.saleId;
}

export const adapter = createEntityAdapter<SmallClaimSaleViewModel>({
  selectId,
});

const initialState: IState = adapter.getInitialState({
  selectedSaleId: null,
  sortParams: DEFAULT_SMALL_CLAIMS_SALES_TABLE_SORT,
  isLoading: null,
  error: null,
});

const parcelInfoSmallClaimsParcelInformationSalesReducer = createReducer(
  initialState,
  on(ParcelInfoSmallClaimsParcelInformationSalesActions.load, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ParcelInfoSmallClaimsParcelInformationSalesActions.loadSuccess, (state, action) => {
    return adapter.setAll(action.sales, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(ParcelInfoSmallClaimsParcelInformationSalesActions.loadError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(ParcelInfoSmallClaimsParcelInformationSalesActions.select, (state, action) => ({
    ...state,
    selectedSaleId: action.saleId,
  })),
  on(ParcelInfoSmallClaimsParcelInformationSalesActions.setSortParams, (state, action) => ({
    ...state,
    sortParams: action.params,
  }))
);

export function reducer(state: IState, action: Action): IState {
  return parcelInfoSmallClaimsParcelInformationSalesReducer(state, action);
}
