import { ValidationErrors } from '@angular/forms';
import { SmallClaimsEditControls } from '../enums';
import { SMALL_CLAIM_EDIT_FIELDS_REQUIRED_ERROR_MAP } from '../constants';

function mapToFormError(control: SmallClaimsEditControls, isRequired: boolean, currentValue?: number): ValidationErrors | null {
  if (isRequired && !currentValue) {
    return SMALL_CLAIM_EDIT_FIELDS_REQUIRED_ERROR_MAP.get(control);
  }

  return null;
}

export const SmallClaimFormValidatorsUtils = {
  mapToFormError,
};
