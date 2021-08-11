import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { ParcelInfoDetailsTables } from 'src/app/parcel-info/enums';
import { ParcelInfoFacade } from 'src/app/parcel-info/store';
import { DEFAULT_SMALL_CLAIMS_TABLE_MAT_SORT, SMALL_CLAIMS_TABLE_DISPLAYED_COLUMNS } from '../../constants';
import { ISmallClaimTableRow } from '../../interfaces';
import { ParcelInfoSmallClaimsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-table',
  templateUrl: './parcel-info-small-claims-table.component.html',
  styleUrls: ['./parcel-info-small-claims-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsTableComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoFacade: ParcelInfoFacade
  ) {}

  public readonly displayedColumns = SMALL_CLAIMS_TABLE_DISPLAYED_COLUMNS;

  public readonly isSmallClaimEntityActive$ = this._parcelInfoSmallClaimsFacade.isSmallClaimEntityActive$;

  public readonly activeSortColumn = DEFAULT_SMALL_CLAIMS_TABLE_MAT_SORT.id;

  public readonly sortDirection = DEFAULT_SMALL_CLAIMS_TABLE_MAT_SORT.start;

  public readonly dataSource$ = this._parcelInfoSmallClaimsFacade.smallClaimTableRows$.pipe(
    map((smallClaims) => {
      this._dataSource.data = smallClaims;

      return this._dataSource;
    })
  );

  private readonly _dataSource = new MatTableDataSource([] as ISmallClaimTableRow[]);

  public trackBySmallClaimId(_: number, row: ISmallClaimTableRow): number {
    return row.smallClaimId;
  }

  public onSelectTable(): void {
    this._parcelInfoFacade.setTable(ParcelInfoDetailsTables.SmallClaims);
    this._parcelInfoSmallClaimsFacade.loadDetails();
  }

  public onSelectSmallClaim(row: ISmallClaimTableRow): void {
    this._parcelInfoFacade.setTable(ParcelInfoDetailsTables.SmallClaims);
    this._parcelInfoSmallClaimsFacade.select(row.smallClaimId);
  }

  public onPrevSmallClaim(): void {
    this._parcelInfoSmallClaimsFacade.selectPrev();
  }

  public onNextSmallClaim(): void {
    this._parcelInfoSmallClaimsFacade.selectNext();
  }

  public onSetSortParams(sort: Sort): void {
    this._parcelInfoSmallClaimsFacade.setSortParams(sort);
  }
}
