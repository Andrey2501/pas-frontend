import { Sort } from '@angular/material/sort';
import { SmallClaimEventSort } from '../../shared/services';

export const PRIOR_TITLE = 'Prior';
export const CURRENT_TITLE = 'Current';

export const SMALL_CLAIMS_EVENT_LAND_TITLE = 'Land';
export const SMALL_CLAIMS_EVENT_TOTAL_TITLE = 'Total';
export const SMALL_CLAIMS_EVENT_FULL_MARKET_TITLE = 'Full Market';

export const FINAL_EXEMPTION_TABLE_DISPLAYED_COLUMNS = ['exemptionCode', 'amount', 'percent', 'result'];
export const EVENTS_TABLE_DISPLAYED_COLUMNS = [
  SmallClaimEventSort.Type,
  SmallClaimEventSort.Date,
  SmallClaimEventSort.Judge,
  SmallClaimEventSort.Location,
];

export const DEFAULT_SMALL_CLAIMS_EVENTS_LIMIT = 50;
export const INFINITE_SCROLL_THROTTLE_EVENTS = 1000;
export const EVENT_LOCATION_MAX_LENGTH = 15;

export const DEFAULT_EVENTS_TABLE_SORT = { active: 'Date', direction: 'desc' } as Sort;

export const SMALL_CLAIM_EVENT_DISABLED_FIELD_NAMES = ['parcel'];
