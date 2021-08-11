export interface ISmallClaimExemptionTableRow {
  readonly exemptionCode?: string;
  readonly percent?: number;
  readonly amount?: number;
  readonly isRevoked: boolean;
  readonly isActive: boolean;
}
