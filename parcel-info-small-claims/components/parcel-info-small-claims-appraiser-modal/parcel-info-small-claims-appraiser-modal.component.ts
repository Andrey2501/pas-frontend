import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CreateContactViewModel, DialogService, FormService } from 'src/app/shared/services';
import { CONTACT_FORM_CONTROLS, DEFAULT_STATIC_VALIDATORS } from 'src/app/contact/constants';
import { DialogUtils } from 'src/app/shared/utils';
import { SMALL_CLAIMS_APPRAISER_ADD_TITLE } from '../../constants';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-appraiser-form',
  templateUrl: './parcel-info-small-claims-appraiser-modal.component.html',
  styleUrls: ['./parcel-info-small-claims-appraiser-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAppraiserModalComponent implements OnDestroy {
  constructor(
    private readonly _formService: FormService,
    private readonly _dialogService: DialogService,
    private readonly _modalRef: MatDialogRef<ParcelInfoSmallClaimsAppraiserModalComponent>
  ) {}

  public readonly title = SMALL_CLAIMS_APPRAISER_ADD_TITLE;

  public readonly formControls = CONTACT_FORM_CONTROLS;

  public readonly formGroup = this._formService.reduceToFormGroup(this.formControls, Object.fromEntries(DEFAULT_STATIC_VALIDATORS));

  public onCancel(): void {
    this._dialogService.handleCancelFormDialog({
      context: this,
      isDirty: this.formGroup.dirty,
      handleOpenDialog: () => this._dialogService.openConfirmationCancelDialog(this.title),
      handleClose: () => this._closeDialog(),
    });
  }

  public onSubmit(formValue: CreateContactViewModel): void {
    const dialogRef = this._dialogService.openConfirmationSaveDialog(this.title);

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => {
      this._closeDialog(formValue);
    });
  }

  public ngOnDestroy(): void {}

  private _closeDialog(formValue?: CreateContactViewModel): void {
    this._modalRef.close(formValue);
  }
}
