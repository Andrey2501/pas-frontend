import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogService } from 'src/app/shared/services';
import { ConfiguredControlModel } from 'src/app/shared/models';
import { DialogUtils } from 'src/app/shared/utils';
import { SMALL_CLAIM_ADD_TITLE } from '../../constants';
import {
  ParcelInfoSmallClaimsAddFacade,
  ParcelInfoSmallClaimsComplaintReasonsFacade,
  ParcelInfoSmallClaimsDetailsFacade,
  ParcelInfoSmallClaimsFormFacade,
} from '../../store';
import { ParcelInfoSmallClaimFormService } from '../../services';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-add',
  templateUrl: './parcel-info-small-claims-add.component.html',
  styleUrls: ['./parcel-info-small-claims-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAddComponent implements OnDestroy {
  constructor(
    private readonly _dialogRef: MatDialogRef<ParcelInfoSmallClaimsAddComponent>,
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _parcelInfoSmallClaimFormService: ParcelInfoSmallClaimFormService,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade,
    private readonly _parcelInfoSmallClaimsComplaintReasonsFacade: ParcelInfoSmallClaimsComplaintReasonsFacade,
    private readonly _dialogService: DialogService,
    private readonly _parcelInfoSmallClaimsFormFacade: ParcelInfoSmallClaimsFormFacade
  ) {}

  public readonly title = SMALL_CLAIM_ADD_TITLE;

  public readonly form$ = this._parcelInfoSmallClaimsDetailsFacade.formProps$.pipe(
    map(({ controls, values }) => {
      if (this._form) {
        const result = this._parcelInfoSmallClaimFormService.mergeFormValuesPartial(values, this._form);

        this._form.patchValue(result);
      } else {
        this._createForm(controls);
      }

      return this._form;
    })
  );

  private _form: FormGroup;

  public ngOnDestroy(): void {
    this._parcelInfoSmallClaimsAddFacade.reset();
    this._parcelInfoSmallClaimsComplaintReasonsFacade.resetComplaintReason();
    this._parcelInfoSmallClaimsDetailsFacade.reset();
  }

  public onCancel(): void {
    this._dialogService.handleCancelFormDialog({
      context: this,
      isDirty: this._form.dirty,
      handleOpenDialog: () => this._dialogService.openConfirmationCancelDialog(this.title),
      handleClose: () => this._handleCancel(),
    });
  }

  public onAdd(): void {
    const dialogRef = this._dialogService.openConfirmationSaveDialog(this.title);

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => {
      this._parcelInfoSmallClaimsAddFacade.add(this._form.value);
      this._handleCancel();
    });
  }

  private _handleCancel(): void {
    this._dialogRef.close();
  }

  private _createForm(controls: ConfiguredControlModel[]): void {
    this._form = this._parcelInfoSmallClaimFormService.createAddForm(controls);

    this._form.controls.pendingExemptions.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      const isAnyPendingExemptions = value?.length > 0;

      this._parcelInfoSmallClaimFormService.updateOptionalControlsValidators(isAnyPendingExemptions, this._form);
    });
    this._form.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this._parcelInfoSmallClaimsFormFacade.set(this._form.value);
    });
  }
}
