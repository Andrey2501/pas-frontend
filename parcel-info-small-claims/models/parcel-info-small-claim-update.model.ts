import { UpdateAppealViewModel } from '../../shared/services';
import { IDefaultFormValue, IDynamicFields } from '../../shared/interfaces';

export class SmallClaimUpdateModel implements UpdateAppealViewModel {
  constructor(formValue: IDefaultFormValue) {
    this.petitionerId = parseInt(formValue.petitionerName, 10);
    this.lawyerId = parseInt(formValue.lawyerName, 10);
    this.askingLandValue = parseFloat(formValue.askingLandAV);
    this.askingTotalValue = parseFloat(formValue.askingTotalAV);
    this.complaintReason = formValue.complaintReason;
    this.noticePetitionDateSent = formValue.noticeOfPetitionDateSent ? new Date(formValue.noticeOfPetitionDateSent) : null;
    this.noticeIssueDateSent = formValue.noticeOfIssueDateSent ? new Date(formValue.noticeOfIssueDateSent) : null;
    this.municipalAuditDate = formValue.municipalAuditDate ? new Date(formValue.municipalAuditDate) : null;
    this.dynamicFields = {};
  }

  public readonly petitionerId: number;

  public readonly lawyerId: number;

  public readonly askingLandValue?: number;

  public readonly askingTotalValue?: number;

  public readonly askingTotalAV?: number;

  public readonly complaintReason?: string;

  public readonly noticePetitionDateSent?: Date;

  public readonly noticeIssueDateSent?: Date;

  public readonly municipalAuditDate?: Date;

  public readonly dynamicFields?: IDynamicFields;
}
