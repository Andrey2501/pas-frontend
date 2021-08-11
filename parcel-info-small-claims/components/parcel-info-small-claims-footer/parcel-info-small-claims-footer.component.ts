import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PermissionFacade } from 'src/app/auth/store';
import { OverlayFacade } from 'src/app/shared/store';
import { ParcelInfoSmallClaimsAddFacade, ParcelInfoSmallClaimsDetailsFacade, ParcelInfoSmallClaimsFacade } from '../../store';
import { DialogService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsSelectGrievancesComponent } from '../parcel-info-small-claims-select-grievances/parcel-info-small-claims-select-grievances.component';
import { DialogUtils } from 'src/app/shared/utils';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-footer',
  templateUrl: './parcel-info-small-claims-footer.component.html',
  styleUrls: ['./parcel-info-small-claims-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsFooterComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade,
    private readonly _permissionsFacade: PermissionFacade,
    private readonly _overlayFacade: OverlayFacade,
    private readonly _dialogService: DialogService
  ) {}

  public readonly smallClaimsTotal$ = this._parcelInfoSmallClaimsFacade.smallClaimsTotal$;

  public readonly selectedSmallClaim$ = this._parcelInfoSmallClaimsFacade.selectedSmallClaim$;

  public readonly selectedSmallClaimIndexLabel$ = this._parcelInfoSmallClaimsFacade.selectedSmallClaimIndexLabel$;

  public readonly isModifyMode$ = this._parcelInfoSmallClaimsFacade.isModifyMode$;

  public readonly isViewMode$ = this._parcelInfoSmallClaimsFacade.isViewMode$;

  public readonly isGlobalModifyMode$ = this._parcelInfoSmallClaimsFacade.isGlobalModifyMode$;

  public readonly isAbleToEditSmallClaim$ = this._parcelInfoSmallClaimsFacade.isAbleToEditSmallClaim$;

  public readonly isAbleToRemoveSmallClaim$ = this._parcelInfoSmallClaimsFacade.isAbleToRemoveSmallClaim$;

  public readonly isSelectedFirstSmallClaim$ = this._parcelInfoSmallClaimsFacade.isSelectedFirstSmallClaim$;

  public readonly isSelectedLastSmallClaim$ = this._parcelInfoSmallClaimsFacade.isSelectedLastSmallClaim$;

  public readonly isNavigationAvailable$ = this._parcelInfoSmallClaimsFacade.isNavigationAvailable$;

  public readonly isAbleToAddSmallClaim$ = this._permissionsFacade.isAbleToAddSmallClaim$;

  public readonly lastChanged$ = this._parcelInfoSmallClaimsDetailsFacade.lastChanged$;

  public readonly lastChangedBy$ = this._parcelInfoSmallClaimsDetailsFacade.lastChangedBy$;

  public ngOnDestroy(): void {
    this._overlayFacade.reset();
  }

  public onPrev(): void {
    this._parcelInfoSmallClaimsFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsFacade.selectNext();
  }

  public onEdit(): void {
    this._parcelInfoSmallClaimsFacade.setViewFormMode(false);
    this._overlayFacade.changeOverlay(false);
    this._parcelInfoSmallClaimsDetailsFacade.initContacts();
  }

  public onAdd(): void {
    this._dialogService.openDialog(ParcelInfoSmallClaimsSelectGrievancesComponent);
    this._parcelInfoSmallClaimsAddFacade.setAddMode(true);
    this._parcelInfoSmallClaimsAddFacade.resetReasonValue();
  }

  public onRemove(): void {
    const dialogRef = this._dialogService.openConfirmationDeleteDialog(
      'Delete Small Claim',
      'Are you sure you want to delete selected Small Claim?'
    );

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => this._parcelInfoSmallClaimsFacade.remove());
  }

  public onCopy(): void {}
}
