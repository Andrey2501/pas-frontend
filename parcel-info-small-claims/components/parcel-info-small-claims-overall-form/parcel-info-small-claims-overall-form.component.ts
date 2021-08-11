import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ParcelInfoSmallClaimsDetailsFacade } from '../../store';
import { SMALL_CLAIM_COMPLAINT_REASON_FORM_FIELD } from '../../constants';
import { ParcelInfoSmallClaimsComplaintReasonTableComponent } from '../parcel-info-small-claims-complaint-reason-table/parcel-info-small-claims-complaint-reason-table.component';
import { DialogService } from 'src/app/shared/services';

@Component({
  selector: 'pas-parcel-info-small-claims-overall-form',
  templateUrl: './parcel-info-small-claims-overall-form.component.html',
  styleUrls: ['./parcel-info-small-claims-overall-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsOverallFormComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _dialogService: DialogService
  ) {}

  @Input() public isViewMode: boolean;

  public readonly overallInformationFormControls$ = this._parcelInfoSmallClaimsDetailsFacade.overallInformationFormControls$;

  public readonly smallClaimComplaintReasonField = SMALL_CLAIM_COMPLAINT_REASON_FORM_FIELD;

  public readonly complaintReasonValue$ = this._parcelInfoSmallClaimsDetailsFacade.complaintReasonValue$;

  public onSelectComplaintReason(): void {
    this._dialogService.openDialog(ParcelInfoSmallClaimsComplaintReasonTableComponent);
  }
}
