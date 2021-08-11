import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { SMALL_CLAIMS_APPRAISALS_DISPLAYED_COLUMNS } from '../../constants';
import { ParcelInfoSmallClaimsAppraisalsFacade } from '../../store';
import { ISmallClaimsAppraisalsTableRow } from '../../interfaces';

@Component({
  selector: 'pas-parcel-info-small-claims-appraisals-table',
  templateUrl: './parcel-info-small-claims-appraisals-table.component.html',
  styleUrls: ['./parcel-info-small-claims-appraisals-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAppraisalsTableComponent {
  constructor(private readonly _parcelInfoSmallClaimsAppraisalsFacade: ParcelInfoSmallClaimsAppraisalsFacade) {}

  public readonly displayedColumns = SMALL_CLAIMS_APPRAISALS_DISPLAYED_COLUMNS;

  public readonly sortActive$ = this._parcelInfoSmallClaimsAppraisalsFacade.sortActive$;

  public readonly sortDirection$ = this._parcelInfoSmallClaimsAppraisalsFacade.sortDirection$;

  public readonly dataSource$ = this._parcelInfoSmallClaimsAppraisalsFacade.dataSource$.pipe(
    map((appraisals) => {
      this._dataSource.data = appraisals;

      return this._dataSource;
    })
  );

  private readonly _dataSource = new MatTableDataSource([] as ISmallClaimsAppraisalsTableRow[]);

  public trackByAppraisalsId(_: number, row: ISmallClaimsAppraisalsTableRow): number {
    return row.appraisalId;
  }

  public onSetSortParams(sort: Sort): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.setSortParams(sort);
  }

  public onSelect(row: ISmallClaimsAppraisalsTableRow): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.select(row.appraisalId);
  }

  public onPrev(): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.selectNext();
  }
}
