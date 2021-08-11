import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store';
import { ParcelInfoSmallClaimFormService } from '../../services';
import { ParcelInfoSmallClaimsComplaintReasonsFacade, ParcelInfoSmallClaimsDetailsFacade, ParcelInfoSmallClaimsFacade } from '../../store';
import { SMALL_CLAIM_UPDATE_DIALOG_TITLE } from '../../constants';
import { DialogUtils } from 'src/app/shared/utils';
import { DialogService } from 'src/app/shared/services';
import { OverlayFacade } from 'src/app/shared/store';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-overview',
  templateUrl: './parcel-info-small-claims-overview.component.html',
  styleUrls: ['./parcel-info-small-claims-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsOverviewComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _parcelInfoSmallClaimFormService: ParcelInfoSmallClaimFormService,
    private readonly _parcelInfoSmallClaimsComplaintReasonsFacade: ParcelInfoSmallClaimsComplaintReasonsFacade,
    private readonly _dialogService: DialogService,
    private readonly _overlayFacade: OverlayFacade
  ) {}

  public readonly isModifyMode$ = this._parcelInfoSmallClaimsFacade.isModifyMode$;

  public readonly isListViewMode$ = this._parcelInfoDetailsFacade.isParcelListMode$;

  public readonly isViewMode$ = this._parcelInfoSmallClaimsFacade.isViewMode$;

  public readonly lastChanged$ = this._parcelInfoSmallClaimsDetailsFacade.lastChanged$;

  public readonly lastChangedBy$ = this._parcelInfoSmallClaimsDetailsFacade.lastChangedBy$;

  public form$ = this._parcelInfoSmallClaimsDetailsFacade.formProps$.pipe(
    map(({ controls, isModifyMode }) => {
      if (isModifyMode) {
        return this._parcelInfoSmallClaimFormService.updateFormValues(this._form, controls);
      }

      this._form = this._parcelInfoSmallClaimFormService.createEditForm(controls);

      return this._form;
    })
  );

  private _form: FormGroup;

  public ngOnDestroy(): void {}

  public onCancel(): void {
    this._dialogService.handleCancelFormDialog({
      context: this,
      isDirty: this._form.dirty,
      handleOpenDialog: () => this._dialogService.openConfirmationCancelDialog(SMALL_CLAIM_UPDATE_DIALOG_TITLE),
      handleClose: () => this._resetToViewMode(),
    });
  }

  public onUpdate(): void {
    const dialogRef = this._dialogService.openConfirmationSaveDialog(SMALL_CLAIM_UPDATE_DIALOG_TITLE);

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => {
      const updateSmallClaim = this._parcelInfoSmallClaimFormService.mapToUpdateModel(this._form.value);

      this._parcelInfoSmallClaimsDetailsFacade.save(updateSmallClaim);
      this._resetToViewMode();
    });
  }

  private _resetToViewMode(): void {
    this._parcelInfoSmallClaimsFacade.setViewFormMode(true);
    this._parcelInfoSmallClaimsComplaintReasonsFacade.resetComplaintReason();

    this._overlayFacade.changeOverlay(true);
  }
}
