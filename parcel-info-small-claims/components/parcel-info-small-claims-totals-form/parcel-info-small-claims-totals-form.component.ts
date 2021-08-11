import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ParcelInfoSmallClaimsDetailsFacade } from '../../store';
import { SMALL_CLAIM_FULL_MARKET_KEY } from '../../constants';

@Component({
  selector: 'pas-parcel-info-small-claims-totals-form',
  templateUrl: './parcel-info-small-claims-totals-form.component.html',
  styleUrls: ['./parcel-info-small-claims-totals-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsTotalsFormComponent {
  constructor(private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade) {}

  @Input() public isViewMode: boolean;

  public readonly totalsFormControls$ = this._parcelInfoSmallClaimsDetailsFacade.totalsFormControls$;

  public isNoFullMarketField(key: string): boolean {
    return !key.startsWith(SMALL_CLAIM_FULL_MARKET_KEY);
  }
}
