import { ExemptionModel } from 'src/app/exemptions/models';

export interface ISmallClaimPropsAdd {
  readonly parcelId: number;
  readonly grievanceId: number;
  readonly reason: string;
  readonly newExemptions: ExemptionModel[];
}
