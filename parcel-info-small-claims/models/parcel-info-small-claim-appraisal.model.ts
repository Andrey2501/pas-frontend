import { CreateOrUpdateAppraisalViewModel } from 'src/app/shared/services';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { ISmallClaimAppraisalParams } from '../interfaces';

export class ParcelInfoSmallClaimAppraisalModel implements CreateOrUpdateAppraisalViewModel {
  constructor(formValue: IDefaultFormValue, params: ISmallClaimAppraisalParams, appraisalId?: number) {
    this.appealId = params.appealId;
    this.parcelId = params.parcelId;
    this.assessmentYear = params.assessmentYear;
    this.appraisalId = appraisalId;
    this.appraiserId = Number(formValue.appraiserId);
    this.amountPaid = parseFloat(formValue.amountPaid);
    this.appraisalType = formValue.type;
    this.appraisedValue = parseFloat(formValue.value);
    this.datePaid = formValue.datePaid ? new Date(formValue.datePaid) : null;
    this.dateReceived = formValue.dateReceived ? new Date(formValue.dateReceived) : null;
    this.dateOrdered = formValue.dateOrdered ? new Date(formValue.dateOrdered) : null;
    this.text = formValue.text;
  }

  public readonly appraisalId: number;

  public readonly appealId: number;

  public readonly appraiserId: number;

  public readonly parcelId: number;

  public readonly amountPaid: number;

  public readonly appraisalType: string;

  public readonly appraisedValue: number;

  public readonly dateOrdered: Date;

  public readonly datePaid: Date;

  public readonly dateReceived: Date;

  public readonly text: string;

  public readonly assessmentYear: number;

  public readonly userId: number;
}
