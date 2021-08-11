import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-parcel-information-at-time-of-small-claims',
  templateUrl: './parcel-info-small-claims-parcel-information-at-time-of-small-claims.component.html',
  styleUrls: ['./parcel-info-small-claims-parcel-information-at-time-of-small-claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade: ParcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade
  ) {}

  public readonly fieldsWithValues$ = this._parcelInfoSmallClaimsParcelInfoAtTimeOfSmallClaimsFacade.fieldsWithValues$;
}
