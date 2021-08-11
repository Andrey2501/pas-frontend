import { ISmallClaimTableRow } from '../interfaces';

export class ParcelInfoSmallClaimsTableInfoModel {
  constructor(smallClaimTableRows: ISmallClaimTableRow[]) {
    this.numberOfRows = smallClaimTableRows.length;
    this.year = smallClaimTableRows[0]?.year;
    this.indexNumber = smallClaimTableRows[0]?.indexNumber;
    this.isNoData = !smallClaimTableRows.length;
    this.dataExist = Boolean(smallClaimTableRows.length);
  }

  public readonly numberOfRows: number;

  public readonly year: number;

  public readonly indexNumber: number;

  public readonly isNoData: boolean;

  public readonly dataExist: boolean;
}
