import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SmallClaimsEditControls } from '../enums';
import { SmallClaimFormValidatorsUtils } from '../utils';

@Injectable({ providedIn: 'root' })
export class ParcelInfoSmallClaimFormValidator {
  public static landValueValidator(isAnyPendingExemptions: boolean, smallClaimsEditControl: SmallClaimsEditControls): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const landValueControl = formGroup.controls[smallClaimsEditControl];

      const landValue = landValueControl.value;

      const isLandValueRequired = !isAnyPendingExemptions && landValueControl.dirty;

      return SmallClaimFormValidatorsUtils.mapToFormError(smallClaimsEditControl, isLandValueRequired, landValue);
    };
  }
}
