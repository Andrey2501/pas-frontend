import { Component, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { CreateContactViewModel, DialogService } from 'src/app/shared/services';
import { FieldValidators, StaticValidators } from 'src/app/shared/constants';
import { DialogUtils } from 'src/app/shared/utils';
import { ParcelInfoSmallClaimsAppraisalsFacade } from '../../store';
import { ContactFeatures } from 'src/app/contact/enums';
import { PermissionFacade } from 'src/app/auth/store';
import { IDialogData } from 'src/app/shared/interfaces';
import { ParcelInfoSmallClaimsAppraiserModalComponent } from '../parcel-info-small-claims-appraiser-modal/parcel-info-small-claims-appraiser-modal.component';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-appraisals-form-dialog',
  templateUrl: './parcel-info-small-claims-appraisals-form-dialog.component.html',
  styleUrls: ['./parcel-info-small-claims-appraisals-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAppraisalsFormDialogComponent implements OnDestroy {
  constructor(
    private readonly _dialogRef: MatDialogRef<ParcelInfoSmallClaimsAppraisalsFormDialogComponent>,
    private readonly _dialogService: DialogService,
    private readonly _formBuilder: FormBuilder,
    private readonly _parcelInfoSmallClaimsAppraisalsFacade: ParcelInfoSmallClaimsAppraisalsFacade,
    private readonly _permissionFacade: PermissionFacade,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}

  public readonly contactFeatures = ContactFeatures;

  public readonly isAbleToAddContact$ = this._permissionFacade.isAbleToAddContact$;

  public readonly form$ = this._parcelInfoSmallClaimsAppraisalsFacade.selectedAppraisalForm$.pipe(
    map((value) => {
      if (!this._form) {
        this._createForm();
      }

      if (value) {
        this._form.patchValue(value);
      }

      return this._form;
    })
  );

  public readonly isEditMode$ = this._parcelInfoSmallClaimsAppraisalsFacade.isEditMode$;

  private _form: FormGroup;

  public get noteControl(): FormControl {
    return this._form.controls.text as FormControl;
  }

  public ngOnDestroy(): void {}

  public onAddAppraiser(): void {
    const dialogRef = this._dialogService.openDialog(ParcelInfoSmallClaimsAppraiserModalComponent);

    DialogUtils.getDialogClose$(this, dialogRef).subscribe((contact: CreateContactViewModel) => {
      if (contact) {
        this._parcelInfoSmallClaimsAppraisalsFacade.addAppraiser(contact);
      }
    });
  }

  public onCancel(): void {
    this._dialogService.handleCancelFormDialog({
      context: this,
      isDirty: this._form.dirty,
      handleOpenDialog: () => this._dialogService.openConfirmationCancelDialog(this.data.title),
      handleClose: () => this._handleCancel(),
    });
  }

  public onSave(): void {
    const dialogRef = this._dialogService.openConfirmationSaveDialog(this.data.title);

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => {
      this._parcelInfoSmallClaimsAppraisalsFacade.save(this._form.value);
      this._handleCancel();
    });
  }

  private _handleCancel(): void {
    this._dialogRef.close();
  }

  private _createForm(): void {
    this._form = this._formBuilder.group({
      dateOrdered: [null, [Validators.required, StaticValidators.dateTime]],
      type: [null, [Validators.required, StaticValidators.stringShort]],
      appraiserId: [null, [Validators.required]],
      value: [null, [StaticValidators.decimalMediumFloatShort]],
      dateReceived: [null, StaticValidators.dateTime],
      datePaid: [null, StaticValidators.dateTime],
      amountPaid: [null, [StaticValidators.decimalMediumFloatShort]],
      text: [null, [FieldValidators.note]],
    });
  }
}
