import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SmallClaimsDetailsMenu } from '../../enums';
import { ParcelInfoSmallClaimsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-details',
  templateUrl: './parcel-info-small-claims-details.component.html',
  styleUrls: ['./parcel-info-small-claims-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsDetailsComponent {
  constructor(private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade) {}

  public readonly selectedMenu$ = this._parcelInfoSmallClaimsFacade.selectedMenu$;

  public readonly smallClaimsDetailsMenuValues$ = this._parcelInfoSmallClaimsFacade.smallClaimsDetailsMenuValues$;

  public readonly smallClaimsDetailsMenu = SmallClaimsDetailsMenu;

  public onChooseMenu(menu: SmallClaimsDetailsMenu): void {
    this._parcelInfoSmallClaimsFacade.chooseDetailsMenu(menu);
  }
}
