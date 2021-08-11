import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { SALES_TABLE_DISPLAYED_COLUMNS } from '../../constants';
import { ISmallClaimParcelInformationSalesTableRow } from '../../interfaces';
import { ParcelInfoSmallClaimsParcelInformationSalesFacade } from '../../store/facades';

@Component({
  selector: 'pas-parcel-info-small-claims-parcel-information-sales',
  templateUrl: './parcel-info-small-claims-parcel-information-sales.component.html',
  styleUrls: ['./parcel-info-small-claims-parcel-information-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsParcelInformationSalesComponent {
  constructor(private readonly _parcelInfoSmallClaimsParcelInformationSalesFacade: ParcelInfoSmallClaimsParcelInformationSalesFacade) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsParcelInformationSalesFacade.isLoading$;

  public readonly displayedColumns = SALES_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsParcelInformationSalesFacade.dataSource$.pipe(
    map((sales) => {
      this._dataSource.data = sales;

      return this._dataSource;
    })
  );

  public readonly sortActive$ = this._parcelInfoSmallClaimsParcelInformationSalesFacade.sortActive$;

  public readonly sortDirection$ = this._parcelInfoSmallClaimsParcelInformationSalesFacade.sortDirection$;

  private _dataSource = new MatTableDataSource();

  public onSelect(row: ISmallClaimParcelInformationSalesTableRow): void {
    this._parcelInfoSmallClaimsParcelInformationSalesFacade.select(row.saleId);
  }

  public onSortChange(sort: Sort): void {
    this._parcelInfoSmallClaimsParcelInformationSalesFacade.setSortParams(sort);
  }
}
