import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PermissionFacade } from 'src/app/auth/store';
import {
  ParcelInfoSmallClaimsAddFacade,
  ParcelInfoSmallClaimsDetailsFacade,
  ParcelInfoSmallClaimsFacade,
  ParcelInfoSmallClaimsFormFacade,
} from '../../store';
import { ExemptionModel } from '../../../exemptions/models';
import { SMALL_CLAIM_FORM_ERRORS } from '../../constants';

@Component({
  selector: 'pas-parcel-info-small-claims-form',
  templateUrl: './parcel-info-small-claims-form.component.html',
  styleUrls: ['./parcel-info-small-claims-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsFormComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsFormFacade: ParcelInfoSmallClaimsFormFacade,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade,
    private readonly _permissionFacade: PermissionFacade
  ) {}

  @Input() public readonly isEditForm: boolean;

  @Input() public readonly form: FormGroup;

  @Input() public readonly isViewMode: boolean;

  public get isNotEditForm(): boolean {
    return !this.isEditForm;
  }

  public get isAddMode(): boolean {
    return !this.isEditForm && !this.isViewMode;
  }

  public get isNotAddMode(): boolean {
    return this.isEditForm || this.isViewMode;
  }

  public readonly isModifyMode$ = this._parcelInfoSmallClaimsFacade.isModifyMode$;

  public readonly computedSmallClaimId$ = this._parcelInfoSmallClaimsFacade.computedSmallClaimId$;

  public readonly isLoading$ = this._parcelInfoSmallClaimsDetailsFacade.isLoading$;

  public readonly isAbleToViewExemption$ = this._permissionFacade.isAbleToViewExemption$;

  public readonly exemptionParams$ = this._parcelInfoSmallClaimsFacade.exemptionParams$;

  public readonly smallClaimFormErrors = SMALL_CLAIM_FORM_ERRORS;

  public ngOnDestroy(): void {
    this._parcelInfoSmallClaimsFormFacade.reset();
  }

  public onAddExemption(exemptionModel: ExemptionModel): void {
    this._parcelInfoSmallClaimsAddFacade.addExemption(exemptionModel);
  }

  public onRemoveExemption(newExemptions: ExemptionModel[]): void {
    this._parcelInfoSmallClaimsAddFacade.setExemptions(newExemptions);
  }
}
