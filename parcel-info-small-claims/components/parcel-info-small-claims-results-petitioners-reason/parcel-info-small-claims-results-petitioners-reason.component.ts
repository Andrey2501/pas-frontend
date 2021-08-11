import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IFormBuilder } from '@rxweb/types';
import { ParcelInfoSmallClaimsAddFacade, ParcelInfoSmallClaimsResultsFacade } from '../../store';
import { FieldValidators, formBuilderToken } from 'src/app/shared/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-results-petitioners-reason',
  templateUrl: './parcel-info-small-claims-results-petitioners-reason.component.html',
  styleUrls: ['./parcel-info-small-claims-results-petitioners-reason.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsResultsPetitionersReasonComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsResultsFacade: ParcelInfoSmallClaimsResultsFacade,
    @Inject(formBuilderToken) private readonly _formBuilder: IFormBuilder,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade
  ) {}

  @Input() public readonly isEditForm: boolean;

  @Input() public readonly isModifyMode: boolean;

  public readonly smallClaimReasonControl$ = this._parcelInfoSmallClaimsResultsFacade.petitionerReason$.pipe(
    map((petitionerReason) => {
      if (!this._control) {
        this._createControl(this.isEditForm ? petitionerReason : '');
      } else {
        this._control.setValue(petitionerReason);
      }

      return this._control;
    })
  );

  private _control: FormControl;

  private _createControl(reason?: string): void {
    this._control = this._formBuilder.control(reason, [FieldValidators.note]);
    this._control.valueChanges.pipe(untilDestroyed(this)).subscribe((reasonValue) => {
      this._parcelInfoSmallClaimsAddFacade.setReasonValue(reasonValue);
    });
  }
}
