import { ValidationErrors } from '@angular/forms';
import { SmallClaimsEditControls } from '../enums';

export const SMALL_CLAIM_EDIT_FIELDS_REQUIRED_ERROR_MAP = new Map<SmallClaimsEditControls, ValidationErrors>([
  [SmallClaimsEditControls.AskingTotalAV, { askingTotalValueRequiredError: 'Asking total value is required' }],
]);

export const SMALL_CLAIM_FORM_ERRORS = ['askingTotalValueRequiredError'];
