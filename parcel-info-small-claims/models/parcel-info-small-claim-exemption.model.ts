import { FormGroup } from '@angular/forms';
import { CreateAppealExemptionViewModel } from 'src/app/shared/services';
import { FormControlsUtils } from 'src/app/shared/utils/form-controls.utils';
import { AddSmallClaimExemptionFields } from '../enums';

export class SmallClaimExemptionModel implements CreateAppealExemptionViewModel {
  constructor(form: FormGroup) {
    this.exemptionCode = FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.ExemptionCode);
    this.ownerPercentage = parseFloat(FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.OwnerPercentage));
    this.fixedPercentage = parseFloat(FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.Percent));
    this.fixedAmount = parseFloat(FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.Amount));
    this.removeForNewSTAR = FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.RemoveForNewSTAR);
    this.approvalPrinted = FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.ApprovalPrinted);
    this.renewalReceived = FormControlsUtils.getFormControlValue(form, AddSmallClaimExemptionFields.RenewalReceived);
  }

  public readonly exemptionCode: string;

  public readonly ownerPercentage?: number;

  public readonly fixedPercentage?: number;

  public readonly fixedAmount?: number;

  public readonly removeForNewSTAR?: boolean;

  public readonly approvalPrinted?: boolean;

  public readonly renewalReceived?: boolean;
}
