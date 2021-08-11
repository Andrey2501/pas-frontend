import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ParcelInfoSmallClaimsDetailsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-owner-form',
  templateUrl: './parcel-info-small-claims-owner-form.component.html',
  styleUrls: ['./parcel-info-small-claims-owner-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsOwnerFormComponent {
  constructor(private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade) {}

  @Input() public isViewMode: boolean;

  public readonly ownerInformationFormControls$ = this._parcelInfoSmallClaimsDetailsFacade.ownerInformationFormControls$;
}
