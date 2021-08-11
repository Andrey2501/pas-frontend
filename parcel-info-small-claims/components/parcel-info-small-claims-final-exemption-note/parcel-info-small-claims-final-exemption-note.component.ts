import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParcelInfoSmallClaimsResultsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-final-exemption-note',
  templateUrl: './parcel-info-small-claims-final-exemption-note.component.html',
  styleUrls: ['./parcel-info-small-claims-final-exemption-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoGrievancesFinalExemptionNoteComponent {
  constructor(private readonly _parcelInfoSmallClaimsResultsFacade: ParcelInfoSmallClaimsResultsFacade) {}

  public readonly selectedParcelExemptionNote$ = this._parcelInfoSmallClaimsResultsFacade.selectedParcelExemptionNote$;
}
