import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ParcelInfoSmallClaimsAppraisalsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-appraisals-overview',
  templateUrl: './parcel-info-small-claims-appraisals-overview.component.html',
  styleUrls: ['./parcel-info-small-claims-appraisals-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAppraisalsOverviewComponent {
  constructor(private readonly _parcelInfoSmallClaimsAppraisalsFacade: ParcelInfoSmallClaimsAppraisalsFacade) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsAppraisalsFacade.isLoading$;

  public readonly selectedAppraisal$ = this._parcelInfoSmallClaimsAppraisalsFacade.selectedAppraisal$;
}
