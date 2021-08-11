import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParcelInfoSmallClaimsParcelInformationFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-parcel-information',
  templateUrl: './parcel-info-small-claims-parcel-information.component.html',
  styleUrls: ['./parcel-info-small-claims-parcel-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsParcelInformationComponent {
  constructor(private readonly _parcelInfoSmallClaimsParcelInformationFacade: ParcelInfoSmallClaimsParcelInformationFacade) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsParcelInformationFacade.isLoading$;
}
