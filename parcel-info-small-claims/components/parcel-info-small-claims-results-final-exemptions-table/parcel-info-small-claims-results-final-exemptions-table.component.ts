import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { FINAL_EXEMPTION_TABLE_DISPLAYED_COLUMNS } from '../../constants';
import { ParcelInfoSmallClaimsResultsFacade } from '../../store';
import { IAppealFinalExemptionTableRow } from 'src/app/shared/interfaces';

@Component({
  selector: 'pas-parcel-info-small-claims-results-final-exemptions-table',
  templateUrl: './parcel-info-small-claims-results-final-exemptions-table.component.html',
  styleUrls: ['./parcel-info-small-claims-results-final-exemptions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsResultsFinalExemptionsTableComponent {
  constructor(private readonly _parcelInfoSmallClaimsResultsFacade: ParcelInfoSmallClaimsResultsFacade) {}

  public readonly displayedColumns = FINAL_EXEMPTION_TABLE_DISPLAYED_COLUMNS;

  public readonly finalExemptions$ = this._parcelInfoSmallClaimsResultsFacade.finalExemptionTableRows$.pipe(
    map((exemption) => {
      this._dataSource.data = exemption;

      return this._dataSource;
    })
  );

  public readonly selectedParcelExemptionId$ = this._parcelInfoSmallClaimsResultsFacade.selectedParcelExemptionId$;

  private readonly _dataSource = new MatTableDataSource([] as IAppealFinalExemptionTableRow[]);

  public onSelectFinalExemption(parcelExemptionId: number, selectedParcelExemptionId: number): void {
    const newParcelExemptionId = parcelExemptionId !== selectedParcelExemptionId ? parcelExemptionId : null;

    this._parcelInfoSmallClaimsResultsFacade.selectParcelExemption(newParcelExemptionId);
  }
}
