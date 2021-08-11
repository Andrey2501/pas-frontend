import { MatSortable } from '@angular/material/sort';
import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash';
import { ISmallClaimParcelInformationSalesTableRow } from '../../interfaces';
import { adapter } from '../reducers/parcel-info-small-claims-parcel-information-sales.reducer';
import { selectFeature } from './parcel-info-small-claims-feature.selector';

const { selectAll } = adapter.getSelectors();

const selectState = createSelector(
  selectFeature,
  ({ parcelInfoSmallClaimsParcelInformationSales }) => parcelInfoSmallClaimsParcelInformationSales
);

const selectAllSales = createSelector(selectState, selectAll);

const selectSortParams = createSelector(selectState, (state) => state.sortParams);

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectSelectedSaleId = createSelector(selectState, (state) => state.selectedSaleId);

const selectTableSortParams = createSelector(selectSortParams, (sort) => ({ id: sort.active, start: sort.direction } as MatSortable));

const selectSortActive = createSelector(selectSortParams, ({ active }) => active);

const selectSortDirection = createSelector(selectSortParams, ({ direction }) => direction);

const selectSortedSales = createSelector(selectAllSales, selectTableSortParams, (sales, tableSortParams) => {
  return orderBy(sales, [tableSortParams.id], [tableSortParams.start]);
});

const selectInitialSale = createSelector(selectSortedSales, (sales) => sales[0]);

const selectDefaultSaleId = createSelector(selectInitialSale, (initialSale) => initialSale?.saleId);

const selectComputedSaleId = createSelector(selectSelectedSaleId, selectDefaultSaleId, (saleId, defaultSaleId) => saleId ?? defaultSaleId);

const selectSelectedSaleIndex = createSelector(selectComputedSaleId, selectSortedSales, (selectedSaleId, sales) => {
  return sales.findIndex((sale) => sale.saleId === selectedSaleId);
});

const selectSelectedSale = createSelector(
  selectSelectedSaleIndex,
  selectSortedSales,
  (selectedSaleIndex, sortedSales) => sortedSales[selectedSaleIndex]
);

const selectDataSource = createSelector(selectSortedSales, selectComputedSaleId, (sortedSales, selectedSaleId) => {
  return sortedSales.map((sale) => {
    return {
      ...sale,
      isActive: sale.saleId === selectedSaleId,
    } as ISmallClaimParcelInformationSalesTableRow;
  });
});

export const ParcelInfoSmallClaimsParcelInformationSalesSelectors = {
  selectDataSource,
  selectIsLoading,
  selectSelectedSale,
  selectComputedSaleId,
  selectSortActive,
  selectSortDirection,
};
