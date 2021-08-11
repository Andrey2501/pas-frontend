import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DialogService } from 'src/app/shared/services';
import { DialogUtils } from 'src/app/shared/utils';
import {
  SMALL_CLAIMS_APPRAISALS_DELETE_CONTENT,
  SMALL_CLAIMS_APPRAISALS_DELETE_TITLE,
  SMALL_CLAIMS_APPRAISAL_ADD_TITLE,
  SMALL_CLAIMS_APPRAISAL_EDIT_TITLE,
} from '../../constants';
import { ParcelInfoSmallClaimsAppraisalsFacade, ParcelInfoSmallClaimsFacade } from '../../store';
import { ParcelInfoSmallClaimsAppraisalsFormDialogComponent } from '../parcel-info-small-claims-appraisals-form-dialog/parcel-info-small-claims-appraisals-form-dialog.component';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-appraisals-footer',
  templateUrl: './parcel-info-small-claims-appraisals-footer.component.html',
  styleUrls: ['./parcel-info-small-claims-appraisals-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAppraisalsFooterComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsAppraisalsFacade: ParcelInfoSmallClaimsAppraisalsFacade,
    private readonly _dialogService: DialogService,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly selectedAppraisalLastChange$ = this._parcelInfoSmallClaimsAppraisalsFacade.selectedAppraisalLastChange$;

  public readonly selectedAppraisalLastChangeBy$ = this._parcelInfoSmallClaimsAppraisalsFacade.selectedAppraisalLastChangeBy$;

  public readonly footerControlsOptions$ = this._parcelInfoSmallClaimsAppraisalsFacade.footerControlsOptions$;

  public readonly isShowAdd$ = this._parcelInfoSmallClaimsAppraisalsFacade.isShowAdd$;

  public readonly isShowEdit$ = this._parcelInfoSmallClaimsAppraisalsFacade.isShowEdit$;

  public readonly isShowDelete$ = this._parcelInfoSmallClaimsAppraisalsFacade.isShowDelete$;

  public readonly isShowControls$ = this._parcelInfoSmallClaimsAppraisalsFacade.isShowControls$;

  public readonly isShowInfo$ = this._parcelInfoSmallClaimsAppraisalsFacade.isShowInfo$;

  public readonly isGlobalModifyMode$ = this._parcelInfoSmallClaimsFacade.isGlobalModifyMode$;

  public ngOnDestroy(): void {}

  public onPrev(): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.selectNext();
  }

  public onAdd(): void {
    const dialogRef = this._dialogService.openDialog(ParcelInfoSmallClaimsAppraisalsFormDialogComponent, {
      title: SMALL_CLAIMS_APPRAISAL_ADD_TITLE,
    });

    DialogUtils.getDialogClose$(this, dialogRef).subscribe(() => {
      this._resetAppraiserId();
    });
  }

  public onEdit(): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.setEditMode(true);
    this._parcelInfoSmallClaimsAppraisalsFacade.initAppraiser();
    const dialogRef = this._dialogService.openDialog(ParcelInfoSmallClaimsAppraisalsFormDialogComponent, {
      title: SMALL_CLAIMS_APPRAISAL_EDIT_TITLE,
    });

    DialogUtils.getDialogClose$(this, dialogRef).subscribe(() => {
      this._resetAppraiserId();
      this._parcelInfoSmallClaimsAppraisalsFacade.setEditMode(false);
    });
  }

  public onDelete(): void {
    const dialogRef = this._dialogService.openConfirmationDeleteDialog(
      SMALL_CLAIMS_APPRAISALS_DELETE_TITLE,
      SMALL_CLAIMS_APPRAISALS_DELETE_CONTENT
    );

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => this._parcelInfoSmallClaimsAppraisalsFacade.remove());
  }

  private _resetAppraiserId(): void {
    this._parcelInfoSmallClaimsAppraisalsFacade.setAppraiserId(null);
  }
}
