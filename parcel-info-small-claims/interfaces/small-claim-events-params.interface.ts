import { SmallClaimEventSort, SqlSortOrder } from 'src/app/shared/services';

export interface ISmallClaimEventsParams {
  readonly offset: number;
  readonly limit: number;
  readonly sortColumn: SmallClaimEventSort;
  readonly sortOrder: SqlSortOrder;
  readonly smallClaimId: number;
}
