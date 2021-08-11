export interface SmallClaimEventTableRow {
  readonly eventId: number;
  readonly type: string;
  readonly date: Date;
  readonly judge: string;
  readonly location: string;
  readonly isActive: boolean;
}
