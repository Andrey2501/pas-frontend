import { MatSortable, Sort } from '@angular/material/sort';

export const DEFAULT_SMALL_CLAIMS_TABLE_SORT = { active: 'indexNumber', direction: 'desc' } as Sort;
export const DEFAULT_SMALL_CLAIMS_TABLE_MAT_SORT = { id: 'indexNumber', start: 'desc', disableClear: true } as MatSortable;
export const SMALL_CLAIMS_TABLE_DISPLAYED_COLUMNS = ['indexNumber', 'complaintReason', 'disposition'];
export const SMALL_CLAIMS_COMPLAINT_REASONS_TABLE_DISPLAYED_COLUMNS = ['grievanceReason', 'categoryName', 'description'];

export const SMALL_CLAIM_COMPLAINT_REASON_CODE_FIELD = 'PetitionerReasonCode';
export const SMALL_CLAIM_ADD_TITLE = 'Create new Small Claim';
export const SMALL_CLAIM_COMPLAINT_REASON_FIELD = 'ComplaintReason';
export const SMALL_CLAIM_COMPLAINT_REASON_FORM_FIELD = 'complaintReason';

export const SMALL_CLAIM_ORIGINAL_TOTAL_AV = 'originalTotalAV';

export const ID_FIELDS = {
  petitionerId: 'PetitionerId',
  lawyerId: 'LawyerId',
  parcelOwnerId: 'ParcelOwnerId',
};

export const SMALL_CLAIM_ADD_EXCLUDED_FIELD_KEYS = [
  'numberOfParcels',
  'difference',
  'finalTotalAV',
  'fullMarketOriginalTotalAV',
  'fullMarketAskingTotalAV',
  'fullMarketDifference',
  'fullMarketFinalTotalAV',
  'fullMarketAskingLandAV',
];

export const SMALL_CLAIM_FULL_MARKET_KEY = 'fullMarket';

export const DROPDOWN_FIELDS = {
  petitionerName: 'PetitionerName',
  lawyerName: 'LawyerName',
  noHearing: 'NoHearing',
};

export const SMALL_CLAIM_CONDITIONAL_CONTROLS = ['askingTotalAV'];

export const SMALL_CLAIM_EDIT_CONDITIONAL_CONTROLS = ['askingTotalAV', 'assessedPercentClaimed', 'fullMarketValueClaimed'];
export const SMALL_CLAIM_PENDING_STATUS = 'PENDING';

export const SMALL_CLAIM_UPDATE_DIALOG_TITLE = 'Edit Small Claim';

export const SMALL_CLAIMS_PENDING_EXEMPTIONS_TABLE_DISPLAYED_COLUMNS = ['exemptionCode', 'percent', 'amount'];
export const DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_SORT = { active: 'exemptionCode', direction: 'asc' } as Sort;
export const DEFAULT_SMALL_CLAIMS_EXEMPTIONS_TABLE_MAT_SORT = {
  id: 'exemptionCode',
  start: 'asc',
  disableClear: true,
} as MatSortable;

export const SMALL_CLAIM_UPDATE_DISABLED_FIELD_KEYS = [
  'year',
  'indexNumber',
  'numberOfParcels',
  'grievanceResult',
  'petitionerAddress1',
  'petitionerAddress2',
  'petitionerStreet',
  'petitionerCityStateZip',
  'petitionerPhone',
  'lawyerPhone',
  'lawyerEmail',
  'ownerName',
  'ownerAddress1',
  'ownerAddress2',
  'ownerStreet',
  'ownerCityStateZip',
  'ownerPhone',
  'maximumReducedAV25',
  'originalTotalAV',
  'maximumReduction',
  'difference',
  'finalTotalAV',
  'fullMarketOriginalTotalAV',
  'fullMarketAskingTotalAV',
  'fullMarketDifference',
  'fullMarketFinalTotalAV',
  'fullMarketAskingLandAV',
];

export const SMALL_CLAIM_ADD_DISABLED_FIELD_KEYS = [
  'year',
  'indexNumber',
  'grievanceResult',
  'petitionerAddress1',
  'petitionerAddress2',
  'petitionerStreet',
  'petitionerCityStateZip',
  'petitionerPhone',
  'lawyerPhone',
  'lawyerEmail',
  'ownerName',
  'ownerAddress1',
  'ownerAddress2',
  'ownerStreet',
  'ownerCityStateZip',
  'ownerPhone',
  'maximumReducedAV25',
  'originalTotalAV',
  'maximumReduction',
];

export const SMALL_CLAIM_PARCEL_DETAILS_FIELD_KEYS = [
  'OwnerId',
  'OwnerName',
  'OwnerAddress1',
  'OwnerAddress2',
  'OwnerStreet',
  'OwnerCityStateZip',
  'OwnerPhone',
  'AskingLandAV',
  'OriginalTotalAV',
  'AskingTotalAV',
  'IndexNumber',
  'GrievanceResult',
  'Year',
];

export const SMALL_CLAIM_FIXED_FIELDS_KEYS = ['petitionerName', 'lawyerName'];

export const SMALL_CLAIM_DATE_FIELDS_KEYS = ['noticeOfPetitionDateSent', 'noticeOfIssueDateSent', 'municipalAuditDate'];

export const DROPDOWN_FIELDS_CONTROLS = {
  petitionerName: 'petitionerName',
  lawyerName: 'lawyerName',
};

export const NOTE_TABLE_DISPLAYED_COLUMNS = ['author', 'noteType', 'dateCreated', 'note'];

export const DROPDOWN_FIELDS_CONTROLS_VALUES = [
  'petitionerName',
  'lawyerName',
  'askingLandAV',
  'askingTotalAV',
  'noticeOfIssueDateSent',
  'noticeOfPetitionDateSent',
];

export const SMALL_CLAIM_DYNAMICALLY_UPDATED_FIELD_KEYS = [
  'complaintReason',
  'petitionerAddress1',
  'petitionerAddress2',
  'petitionerStreet',
  'petitionerCityStateZip',
  'petitionerPhone',
  'lawyerPhone',
  'lawyerEmail',
  'petitionerName',
  'lawyerName',
  'askingLandAV',
  'askingTotalAV',
  'noticeOfPetitionDateSent',
  'noticeOfIssueDateSent',
  'municipalAuditDate',
];

export const PENDING_APPEAL_STATUS_LEVEL = 0;
