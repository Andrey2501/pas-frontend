export interface ISmallClaimsAppraisalsTableRow {
  readonly appraisalId: number;
  readonly appraiserId: number;
  readonly dateOrdered?: Date;
  readonly type?: string;
  readonly appraiser?: string;
  readonly value?: number;
  readonly dateReceived?: Date;
  readonly datePaid?: Date;
  readonly amountPaid?: number;
  readonly text?: string;
  readonly lastChange?: Date;
  readonly by?: string;
  readonly isActive: boolean;
}
