import { MatSortable } from '@angular/material/sort';
import { isPast } from 'date-fns';
import { isNil, orderBy, partition, sortBy } from 'lodash';
import { IConfigurationTenantEnvironmentSettingItem } from 'src/app/configuration/interfaces';
import { ConfigurationAddUtils } from 'src/app/configuration/utils';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { ConfiguredControlModel } from 'src/app/shared/models';
import {
  AppealExemptionViewModel,
  FieldViewModel,
  GrievanceReasonModel,
  ParcelExemptionViewModel,
  SmallClaimViewModel,
} from 'src/app/shared/services';
import { AcceptableConfiguredValueType } from 'src/app/shared/types';
import { findEqualFieldValue } from 'src/app/shared/utils';
import {
  DROPDOWN_FIELDS,
  ID_FIELDS,
  MAXIMUM_REDUCED_AV25_PERCENTAGE,
  MAXIMUM_REDUCTION_PERCENTAGE,
  SMALL_CLAIM_ADD_EXCLUDED_FIELD_KEYS,
  SMALL_CLAIM_ORIGINAL_TOTAL_AV,
  SMALL_CLAIM_OVERALL_INFO_NAME_DATES,
  SMALL_CLAIM_UPDATE_DISABLED_FIELD_KEYS,
} from '../../constants';
import { ISmallClaimExemptionTableRow, ISmallClaimTableRow } from '../../interfaces';

function mapToSmallClaimTableRow(smallClaim: SmallClaimViewModel, selectedSmallClaimId?: number): ISmallClaimTableRow {
  return {
    smallClaimId: smallClaim.smallClaimId,
    year: smallClaim.year,
    indexNumber: smallClaim.indexNumber,
    complaintReason: smallClaim.complaintReason,
    disposition: smallClaim.disposition,
    isActive: smallClaim.smallClaimId === selectedSmallClaimId,
  } as ISmallClaimTableRow;
}

function filterListFields(fields?: FieldViewModel[], listColumns?: string[]): FieldViewModel[] {
  if (fields) {
    return fields.filter((field) => listColumns.includes(field.name));
  }

  return [];
}

function replaceFieldValues(
  fields: FieldViewModel[],
  isReplaceWithEmptyValue: boolean,
  newValueFields?: FieldViewModel[]
): FieldViewModel[] {
  const isInvalidData = [newValueFields, fields].some(isNil);

  if (isInvalidData) {
    return fields;
  }

  return fields.map((field) => {
    const isFieldExists = newValueFields.find((newField) => newField.name === field.name);
    const newFieldValue = findEqualFieldValue(newValueFields, field.name);
    const isNeedSetEmptyValue = !newFieldValue && isReplaceWithEmptyValue && isFieldExists;
    const value = newFieldValue ? newFieldValue : field.value;

    return {
      name: field.name,
      isNative: field.isNative,
      value: isNeedSetEmptyValue ? null : value,
    } as FieldViewModel;
  });
}

function mapToConfiguredControls(
  fields: FieldViewModel[],
  settingItems: IConfigurationTenantEnvironmentSettingItem[],
  isModifyMode?: boolean
): ConfiguredControlModel[] {
  const rawControlsModels = settingItems.map((field) => {
    const fieldName = ConfigurationAddUtils.capitalize(field.key);
    const isPetitionerName = fieldName === DROPDOWN_FIELDS.petitionerName;
    const isLawyerName = fieldName === DROPDOWN_FIELDS.lawyerName;

    let computedFieldName = fieldName;

    if (isModifyMode) {
      if (isPetitionerName) {
        computedFieldName = ID_FIELDS.petitionerId;
      }

      if (isLawyerName) {
        computedFieldName = ID_FIELDS.lawyerId;
      }
    }

    const settingFieldValue = findFieldValue(fields, computedFieldName);

    return new ConfiguredControlModel(field, settingFieldValue);
  });

  return sortBy(rawControlsModels, 'order');
}

function findFieldValue(fields: FieldViewModel[], fieldName: string): AcceptableConfiguredValueType {
  if (isNil(fields)) {
    return null;
  }

  return findEqualFieldValue(fields, fieldName);
}

function filterEditableDetailColumns(fields: IConfigurationTenantEnvironmentSettingItem[]): string[] {
  return fields.reduce((columns, field) => {
    const isDisabled = SMALL_CLAIM_UPDATE_DISABLED_FIELD_KEYS.includes(field.key);

    return isDisabled ? [...columns, field.column] : columns;
  }, []);
}

function getSortedFieldsWithValues(
  fields: FieldViewModel[],
  settingItems: IConfigurationTenantEnvironmentSettingItem[]
): ConfiguredControlModel[] {
  return sortBy(
    settingItems.map(
      (settingItem) => new ConfiguredControlModel(settingItem, findFieldValue(fields, ConfigurationAddUtils.capitalize(settingItem.key)))
    ),
    'order'
  );
}

function getOverallInfoDefaultValuesDates(): FieldViewModel[] {
  const dateNow = new Date();

  return SMALL_CLAIM_OVERALL_INFO_NAME_DATES.map((name) => {
    return {
      name,
      value: dateNow,
    } as FieldViewModel;
  });
}

function filterAddMode(settingItems: IConfigurationTenantEnvironmentSettingItem[]): IConfigurationTenantEnvironmentSettingItem[] {
  return settingItems.filter((item) => !SMALL_CLAIM_ADD_EXCLUDED_FIELD_KEYS.includes(item.key));
}

function mapToValues(controls: ConfiguredControlModel[]): IDefaultFormValue {
  const values = controls.reduce((result, { key, value }) => {
    return { ...result, [key]: value };
  }, {}) as IDefaultFormValue;

  const originalTotalAV = +values[SMALL_CLAIM_ORIGINAL_TOTAL_AV];
  const totalComputedValues = getTotalComputedValues(originalTotalAV);

  return { ...values, ...totalComputedValues };
}

function getTotalComputedValues(originalTotalAV: number): IDefaultFormValue {
  return isNaN(originalTotalAV)
    ? {}
    : {
        maximumReducedAV25: String(originalTotalAV * MAXIMUM_REDUCED_AV25_PERCENTAGE),
        maximumReduction: String(originalTotalAV * MAXIMUM_REDUCTION_PERCENTAGE),
      };
}

function mapComplaintReasonToDisplayedValue(complaintReason?: GrievanceReasonModel): string {
  return complaintReason ? `${complaintReason.grievanceReasonCode}-${complaintReason.categoryName}` : null;
}

function sortSmallClaimExemptions(exemptions: ParcelExemptionViewModel[], sortParams: MatSortable): ISmallClaimExemptionTableRow[] {
  const [activeExemptions, inactiveExemptions] = partition(
    exemptions,
    (exemption) => !exemption.dateEnd || !isPast(new Date(exemption.dateEnd))
  );
  const orderedActiveExemptions = orderExemptionsTableRows(activeExemptions, sortParams, false);
  const orderedInactiveExemptions = orderExemptionsTableRows(inactiveExemptions, sortParams, true);

  return [...orderedActiveExemptions, ...orderedInactiveExemptions];
}

function orderExemptionsTableRows(
  exemptions: ParcelExemptionViewModel[],
  sortParams: MatSortable,
  isRevoked: boolean
): ISmallClaimExemptionTableRow[] {
  return orderBy(exemptions, [sortParams.id], [sortParams.start]).map((exemption) => {
    return mapToSmallClaimExemptionTableRow(exemption, isRevoked);
  });
}

function mapToSmallClaimExemptionTableRow(
  exemption: ParcelExemptionViewModel | AppealExemptionViewModel,
  isRevoked: boolean,
  selectedExemptionCode?: string
): ISmallClaimExemptionTableRow {
  return {
    exemptionCode: exemption.exemptionCode,
    amount: exemption.fixedAmount,
    percent: exemption.fixedPercentage,
    isActive: exemption.exemptionCode === selectedExemptionCode,
    isRevoked,
  } as ISmallClaimExemptionTableRow;
}

export const SelectorsUtils = {
  mapToSmallClaimTableRow,
  filterListFields,
  replaceFieldValues,
  mapToConfiguredControls,
  sortSmallClaimExemptions,
  getSortedFieldsWithValues,
  filterEditableDetailColumns,
  getOverallInfoDefaultValuesDates,
  filterAddMode,
  mapToValues,
  mapComplaintReasonToDisplayedValue,
};
