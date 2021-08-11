import { MatSortable, Sort } from '@angular/material/sort';

export const DEFAULT_SMALL_CLAIMS_NOTES_TABLE_SORT = { active: 'dateCreated', direction: 'desc' } as Sort;
export const DEFAULT_SMALL_CLAIMS_NOTES_TABLE_MAT_SORT = {
  id: DEFAULT_SMALL_CLAIMS_NOTES_TABLE_SORT.active,
  start: DEFAULT_SMALL_CLAIMS_NOTES_TABLE_SORT.direction,
  disableClear: true,
} as MatSortable;
