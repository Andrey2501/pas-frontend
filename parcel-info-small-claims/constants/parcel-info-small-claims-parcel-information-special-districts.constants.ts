import { Sort } from '@angular/material/sort';

export const DEFAULT_SMALL_CLAIMS_SPECIAL_DISTRICTS_TABLE_SORT = { active: '', direction: 'desc' } as Sort;

export const SPECIAL_DISTRICTS_TABLE_DISPLAYED_COLUMNS = [
  'index',
  'code',
  'calcCode',
  'calcAmount',
  'units',
  'secondUnits',
  'percent',
  'dateAdded',
];
