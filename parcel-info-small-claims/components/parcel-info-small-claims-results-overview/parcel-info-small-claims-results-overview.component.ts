import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParcelInfoSmallClaimsCurrentEventFacade, ParcelInfoSmallClaimsFacade, ParcelInfoSmallClaimsResultsFacade } from '../../store';
import { PermissionFacade } from 'src/app/auth/store';
import { ParcelInfoSmallClaimsPopupService } from '../../services';

@Component({
  selector: 'pas-parcel-info-small-claims-results-overview',
  templateUrl: './parcel-info-small-claims-results-overview.component.html',
  styleUrls: ['./parcel-info-small-claims-results-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsResultsOverviewComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsResultsFacade: ParcelInfoSmallClaimsResultsFacade,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _permissionFacade: PermissionFacade,
    private readonly _parcelInfoSmallClaimsCurrentEventFacade: ParcelInfoSmallClaimsCurrentEventFacade,
    private readonly _parcelInfoSmallClaimsPopupService: ParcelInfoSmallClaimsPopupService
  ) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsResultsFacade.isLoading$;

  public readonly isModifyMode$ = this._parcelInfoSmallClaimsFacade.isModifyMode$;

  public readonly isAbleToViewEvent$ = this._permissionFacade.isAbleToViewEvent$;

  public readonly results$ = this._parcelInfoSmallClaimsResultsFacade.results$;

  public readonly isAbleToAddEvent$ = this._parcelInfoSmallClaimsCurrentEventFacade.isAbleToAddEvent$;

  public readonly isShowResultNotes$ = this._parcelInfoSmallClaimsResultsFacade.isShowResultNotes$;

  public onAddEvent(): void {
    this._parcelInfoSmallClaimsCurrentEventFacade.setViewMode(false);

    this._parcelInfoSmallClaimsPopupService.openEventPopup();
  }
}
