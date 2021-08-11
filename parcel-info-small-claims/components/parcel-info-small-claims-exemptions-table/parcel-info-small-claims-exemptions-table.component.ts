import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { SMALL_CLAIMS_PENDING_EXEMPTIONS_TABLE_DISPLAYED_COLUMNS } from '../../constants';
import { ISmallClaimExemptionTableRow } from '../../interfaces';
import { ParcelInfoSmallClaimsExemptionsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-exemptions-table',
  templateUrl: './parcel-info-small-claims-exemptions-table.component.html',
  styleUrls: ['./parcel-info-small-claims-exemptions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsExemptionsTableComponent {
  constructor(private readonly _parcelInfoSmallClaimsExemptionsFacade: ParcelInfoSmallClaimsExemptionsFacade) {}

  public readonly displayedColumns = SMALL_CLAIMS_PENDING_EXEMPTIONS_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsExemptionsFacade.sortedSmallClaimExemptionRows$.pipe(
    map((smallClaims) => {
      this._dataSource.data = smallClaims;

      return this._dataSource;
    })
  );

  public readonly sortDirection$ = this._parcelInfoSmallClaimsExemptionsFacade.sortDirection$;

  public readonly sortActive$ = this._parcelInfoSmallClaimsExemptionsFacade.sortActive$;

  public readonly isLoaded$ = this._parcelInfoSmallClaimsExemptionsFacade.isLoaded$;

  private readonly _dataSource = new MatTableDataSource([] as ISmallClaimExemptionTableRow[]);

  public onSortChange(sort: Sort): void {
    this._parcelInfoSmallClaimsExemptionsFacade.setSortParams(sort);
  }
}
