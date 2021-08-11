export interface ISmallClaimParcelInformationSalesTableRow {
  readonly saleId: number;
  readonly date?: Date;
  readonly price?: number;
  readonly oldOwner?: string;
  readonly newOwner?: string;
  readonly deedBk?: string;
  readonly page?: string;
  readonly armsLength: boolean;
  readonly valid: boolean;
  readonly isActive: boolean;
}
