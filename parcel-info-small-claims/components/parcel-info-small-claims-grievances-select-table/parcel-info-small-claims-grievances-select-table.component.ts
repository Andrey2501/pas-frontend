import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

import { IGrievanceTableRow } from 'src/app/parcel-info-grievances/interfaces';
import { GRIEVANCES_SELECT_TABLE_DISPLAYED_COLUMNS } from 'src/app/parcel-info-grievances/constants';
import { ParcelInfoSmallClaimsAddFacade, ParcelInfoSmallClaimsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-grievances-select-table',
  templateUrl: './parcel-info-small-claims-grievances-select-table.component.html',
  styleUrls: ['./parcel-info-small-claims-grievances-select-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsGrievancesSelectTableComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade
  ) {}

  public readonly displayedColumns = GRIEVANCES_SELECT_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsFacade.completedGrievanceTableRows$.pipe(
    map((grievances) => {
      this._dataSource.data = grievances;

      return this._dataSource;
    })
  );

  private readonly _dataSource = new MatTableDataSource([] as IGrievanceTableRow[]);

  public trackByGrievanceId(_: number, row: IGrievanceTableRow): number {
    return row.appealId;
  }

  public onSelectGrievance(row: IGrievanceTableRow): void {
    this._parcelInfoSmallClaimsAddFacade.setGrievanceProps({ grievanceId: row.appealId, assessmentYear: row.assessmentYear });
  }
}
