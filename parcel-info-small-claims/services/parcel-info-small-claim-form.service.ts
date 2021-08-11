import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { difference, upperFirst } from 'lodash';
import { addMinutes } from 'date-fns';
import { ConfiguredControlModel } from 'src/app/shared/models';
import {
  DROPDOWN_FIELDS_CONTROLS_VALUES,
  SMALL_CLAIM_ADD_DISABLED_FIELD_KEYS,
  SMALL_CLAIM_CONDITIONAL_CONTROLS,
  SMALL_CLAIM_DYNAMICALLY_UPDATED_FIELD_KEYS,
  SMALL_CLAIM_UPDATE_DISABLED_FIELD_KEYS,
  SMALL_CLAIM_DATE_FIELDS_KEYS,
  SMALL_CLAIM_FIXED_FIELDS_KEYS,
  DROPDOWN_FIELDS_CONTROLS,
} from '../constants';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { FormService, UpdateAppealViewModel } from 'src/app/shared/services';
import { SmallClaimUpdateModel } from '../models';
import { ParcelInfoSmallClaimFormValidator } from '../validators';
import { AcceptableConfiguredValueType } from 'src/app/shared/types';
import { SmallClaimsEditControls } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimFormService {
  constructor(private readonly _formService: FormService) {}

  public createEditForm(updateFormFields: ConfiguredControlModel[]): FormGroup {
    const formGroup = this._formService.reduceToFormGroup(updateFormFields);

    SMALL_CLAIM_UPDATE_DISABLED_FIELD_KEYS.forEach((fieldKey) => formGroup.controls[fieldKey]?.disable());

    return formGroup;
  }

  public createAddForm(updateFormFields: ConfiguredControlModel[]): FormGroup {
    const formGroup = this._formService.reduceToFormGroup(updateFormFields, null, this._getValidators(false));

    SMALL_CLAIM_ADD_DISABLED_FIELD_KEYS.forEach((fieldKey) => formGroup.controls[fieldKey]?.disable());
    this.updateOptionalControlsValidators(false, formGroup);
    this._updateDisabledFields(formGroup);

    return formGroup;
  }

  public mergeFormValuesPartial(
    values: IDefaultFormValue<AcceptableConfiguredValueType>,
    formGroup: FormGroup
  ): IDefaultFormValue<AcceptableConfiguredValueType> {
    const result = { ...values };
    const formValue = formGroup.value;
    const isAnyPendingExemptions = formGroup.value.pendingExemptions?.length > 0;

    difference(Object.keys(formValue), SMALL_CLAIM_FIXED_FIELDS_KEYS).forEach((key) => {
      const isDateField = SMALL_CLAIM_DATE_FIELDS_KEYS.includes(key);
      const isDateFieldExist = isDateField && formValue[key];
      const isFieldExistOrDateNotExist = isDateField || formValue[key] !== null;

      if (isDateFieldExist) {
        const date = new Date(Number(formValue[key]));

        result[key] = addMinutes(date, date.getTimezoneOffset());
      } else if (isFieldExistOrDateNotExist) {
        result[key] = formValue[key];
      }
    });

    const validators = this._getValidators(isAnyPendingExemptions);

    formGroup.setValidators(validators);

    this.updateOptionalControlsValidators(isAnyPendingExemptions, formGroup);
    this._updateDisabledFields(formGroup);

    formGroup.updateValueAndValidity();

    return result;
  }

  public mapToUpdateModel(formValue: IDefaultFormValue): UpdateAppealViewModel {
    const updateModel = new SmallClaimUpdateModel(formValue);

    const dynamicValuesKeys = this._getDynamicValuesKeys(formValue, updateModel);

    dynamicValuesKeys.forEach((key) => (updateModel.dynamicFields[upperFirst(key)] = formValue[key]));

    return updateModel;
  }

  public updateFormValues(formGroup: FormGroup, newControls: ConfiguredControlModel[]): FormGroup {
    SMALL_CLAIM_DYNAMICALLY_UPDATED_FIELD_KEYS.forEach((field) => {
      const newValue = newControls.find((control) => control.key === field)?.value;

      formGroup.controls[field]?.setValue(newValue);
    });

    formGroup.updateValueAndValidity();

    return formGroup;
  }

  public updateOptionalControlsValidators(isAnyPendingExemptions: boolean, formGroup: FormGroup): void {
    SMALL_CLAIM_CONDITIONAL_CONTROLS.forEach((fieldKey) => {
      const control = formGroup.controls[fieldKey];

      if (isAnyPendingExemptions) {
        control?.clearValidators();
      } else {
        control?.setValidators(Validators.required);
      }

      control.updateValueAndValidity({ onlySelf: true });
    });
  }

  private _getDynamicValuesKeys(formValue: IDefaultFormValue, updateModel: UpdateAppealViewModel): string[] {
    const formKeys = Object.keys(formValue);
    const filteredFormKeys = difference(formKeys, DROPDOWN_FIELDS_CONTROLS_VALUES);
    const updateModelKeys = Object.keys(updateModel);

    return difference(filteredFormKeys, updateModelKeys);
  }

  private _getValidators(isAnyPendingExemptions: boolean): ValidatorFn[] {
    return [ParcelInfoSmallClaimFormValidator.landValueValidator(isAnyPendingExemptions, SmallClaimsEditControls.AskingTotalAV)];
  }

  private _updateDisabledFields(formGroup: FormGroup): void {
    const petitionerName = formGroup.value.petitionerName;

    if (petitionerName) {
      formGroup.controls[DROPDOWN_FIELDS_CONTROLS.lawyerName].enable();
    } else {
      formGroup.controls[DROPDOWN_FIELDS_CONTROLS.lawyerName].disable();
    }
  }
}
