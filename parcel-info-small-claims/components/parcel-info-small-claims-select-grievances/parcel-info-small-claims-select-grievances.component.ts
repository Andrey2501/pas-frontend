import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SMALL_CLAIM_ADD_TITLE } from '../../constants';
import { DialogService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsAddComponent } from '../parcel-info-small-claims-add/parcel-info-small-claims-add.component';
import { ParcelInfoSmallClaimsAddFacade, ParcelInfoSmallClaimsFacade } from '../../store';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-select-grievances',
  templateUrl: './parcel-info-small-claims-select-grievances.component.html',
  styleUrls: ['./parcel-info-small-claims-select-grievances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsSelectGrievancesComponent implements OnDestroy {
  constructor(
    private readonly _dialogRef: MatDialogRef<ParcelInfoSmallClaimsSelectGrievancesComponent>,
    private readonly _dialogService: DialogService,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade
  ) {}

  public readonly title = SMALL_CLAIM_ADD_TITLE;

  public readonly isSelectedCompletedGrievance$ = this._parcelInfoSmallClaimsFacade.isSelectedCompletedGrievance$;

  public readonly isSelectedUncompletedGrievance$ = this._parcelInfoSmallClaimsFacade.isSelectedUncompletedGrievance$;

  public ngOnDestroy(): void {}

  public onCancel(): void {
    this._dialogService.handleCancelFormDialog({
      context: this,
      isDirty: this.isSelectedCompletedGrievance$,
      handleOpenDialog: () => this._dialogService.openConfirmationCancelDialog(this.title),
      handleClose: () => this._closeDialog(),
    });
  }

  public onContinue(): void {
    this._parcelInfoSmallClaimsAddFacade.loadParcelDetails();
    this._dialogService.openDialog(ParcelInfoSmallClaimsAddComponent);
    this._dialogRef.close();
  }

  public onCloseDialog(): void {
    this._closeDialog();
  }

  private _closeDialog(): void {
    this._parcelInfoSmallClaimsAddFacade.reset();
    this._dialogRef.close();
  }
}
