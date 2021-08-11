import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ParcelInfoSmallClaimsResultsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-prior-current-info',
  templateUrl: './parcel-info-small-claims-prior-current-info.component.html',
  styleUrls: ['./parcel-info-small-claims-prior-current-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsPriorCurrentInfoComponent {
  constructor(private readonly _parcelInfoSmallClaimsResultsFacade: ParcelInfoSmallClaimsResultsFacade) {}

  public readonly priorCurrentColumns$ = this._parcelInfoSmallClaimsResultsFacade.priorCurrentColumns$;

  public readonly yearsInfo$ = this._parcelInfoSmallClaimsResultsFacade.yearsInfo$;
}
