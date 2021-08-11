import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ParcelInfoSmallClaimsResultsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-results-overall',
  templateUrl: './parcel-info-small-claims-results-overall.component.html',
  styleUrls: ['./parcel-info-small-claims-results-overall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsResultsOverallComponent {
  constructor(private readonly _parcelInfoSmallClaimsResultsFacade: ParcelInfoSmallClaimsResultsFacade) {}

  public readonly results$ = this._parcelInfoSmallClaimsResultsFacade.results$;
}
