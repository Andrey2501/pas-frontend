import { CreateSmallClaimViewModel } from 'src/app/shared/services';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { ISmallClaimPropsAdd } from '../interfaces';

export class SmallClaimModel implements CreateSmallClaimViewModel {
  constructor(formValue: IDefaultFormValue, params: ISmallClaimPropsAdd) {
    this.grievanceId = params.grievanceId;
    this.parcelId = params.parcelId;
    this.lawyerId = Number(formValue.lawyerName);
    this.petitionerId = Number(formValue.petitionerName);
    this.petitionerReasonCode = formValue.complaintReason;
    this.noticePetitionDateSent = formValue.noticeOfPetitionDateSent ? new Date(formValue.noticeOfPetitionDateSent) : null;
    this.noticeIssueDateSent = formValue.noticeOfIssueDateSent ? new Date(formValue.noticeOfIssueDateSent) : null;
    this.municipalAuditDate = formValue.municipalAuditDate ? new Date(formValue.municipalAuditDate) : null;
    this.askingLandAV = Number(formValue.askingLandAV);
    this.askingTotalAV = Number(formValue.askingTotalAV);
    this.originTotalAV = Number(formValue.originalTotalAV);
    this.petitionerReason = params.reason;
  }

  public readonly smallClaimId: number;

  public readonly grievanceId: number;

  public readonly parcelId: number;

  public readonly petitionerId: number;

  public readonly lawyerId: number;

  public readonly ownerId: number;

  public readonly askingLandAV?: number;

  public readonly originTotalAV?: number;

  public readonly askingTotalAV?: number;

  public readonly petitionerReasonCode?: string;

  public readonly noticePetitionDateSent?: Date;

  public readonly noticeIssueDateSent?: Date;

  public readonly municipalAuditDate?: Date;

  public readonly createdUserId: number;

  public readonly petitionerReason: string;
}
