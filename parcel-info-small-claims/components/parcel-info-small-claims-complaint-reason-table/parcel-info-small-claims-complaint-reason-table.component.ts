import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { GrievanceReasonModel } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsComplaintReasonsFacade } from '../../store';
import { SMALL_CLAIMS_COMPLAINT_REASONS_TABLE_DISPLAYED_COLUMNS } from '../../constants';

@Component({
  selector: 'pas-parcel-info-small-claims-complaint-reason-table',
  templateUrl: './parcel-info-small-claims-complaint-reason-table.component.html',
  styleUrls: ['./parcel-info-small-claims-complaint-reason-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsComplaintReasonTableComponent implements OnInit {
  constructor(
    private readonly _parcelInfoSmallClaimsComplaintReasonsFacade: ParcelInfoSmallClaimsComplaintReasonsFacade,
    private readonly _dialogRef: MatDialogRef<ParcelInfoSmallClaimsComplaintReasonTableComponent>
  ) {}

  public readonly displayedColumns = SMALL_CLAIMS_COMPLAINT_REASONS_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsComplaintReasonsFacade.complaintReasons$.pipe(
    map((complaintReasons) => {
      this._dataSource.data = complaintReasons;

      return this._dataSource;
    })
  );

  public readonly isComplaintReasonSelectionInvalid$ = this._parcelInfoSmallClaimsComplaintReasonsFacade.isComplaintReasonSelectionInvalid$;

  private readonly _dataSource = new MatTableDataSource([] as GrievanceReasonModel[]);

  public ngOnInit(): void {
    this._parcelInfoSmallClaimsComplaintReasonsFacade.load();
  }

  public onSelectRow(row: GrievanceReasonModel): void {
    this._parcelInfoSmallClaimsComplaintReasonsFacade.selectRow(row.grievanceReasonCode);
  }

  public onSelect(): void {
    this._parcelInfoSmallClaimsComplaintReasonsFacade.confirmSelection();
    this._closePopup();
  }

  public onClose(): void {
    this._closePopup();
  }

  private _closePopup(): void {
    this._dialogRef.close();
  }
}
