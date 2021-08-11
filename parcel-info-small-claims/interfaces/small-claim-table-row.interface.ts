export interface ISmallClaimTableRow {
  readonly smallClaimId: number;
  readonly year: number;
  readonly indexNumber: number;
  readonly disposition?: string;
  readonly complaintReason?: string;
  readonly isActive: boolean;
}
