import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { SPECIAL_DISTRICTS_TABLE_DISPLAYED_COLUMNS } from '../../constants';
import { ISmallClaimParcelInformationSpecialDistrictsTableRow } from '../../interfaces';
import { ParcelInfoSmallClaimsParcelInformationSpecialDistrictsFacade } from '../../store/facades';

@Component({
  selector: 'pas-parcel-info-small-claims-parcel-information-special-districts',
  templateUrl: './parcel-info-small-claims-parcel-information-special-districts.component.html',
  styleUrls: ['./parcel-info-small-claims-parcel-information-special-districts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsParcelInformationSpecialDistrictsComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsSpecialDistrictsFacade: ParcelInfoSmallClaimsParcelInformationSpecialDistrictsFacade
  ) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsSpecialDistrictsFacade.isLoading$;

  public readonly displayedColumns = SPECIAL_DISTRICTS_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsSpecialDistrictsFacade.dataSource$.pipe(
    map((specialDistricts) => {
      this._dataSource.data = specialDistricts;

      return this._dataSource;
    })
  );

  public readonly sortActive$ = this._parcelInfoSmallClaimsSpecialDistrictsFacade.sortActive$;

  public readonly sortDirection$ = this._parcelInfoSmallClaimsSpecialDistrictsFacade.sortDirection$;

  private readonly _dataSource = new MatTableDataSource();

  public onSelect(row: ISmallClaimParcelInformationSpecialDistrictsTableRow): void {
    this._parcelInfoSmallClaimsSpecialDistrictsFacade.select(row.parcelSpecialDistrictId);
  }

  public onSortChange(sort: Sort): void {
    this._parcelInfoSmallClaimsSpecialDistrictsFacade.setSortParams(sort);
  }
}
