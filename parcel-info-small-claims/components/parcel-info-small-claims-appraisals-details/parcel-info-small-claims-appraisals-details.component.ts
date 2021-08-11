import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ParcelInfoSmallClaimsAppraisalsFacade } from '../../store';
import { FieldValidators } from 'src/app/shared/constants';

@Component({
  selector: 'pas-parcel-info-small-claims-appraisals-details',
  templateUrl: './parcel-info-small-claims-appraisals-details.component.html',
  styleUrls: ['./parcel-info-small-claims-appraisals-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsAppraisalsDetailsComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsAppraisalsFacade: ParcelInfoSmallClaimsAppraisalsFacade,
    private readonly _formBuilder: FormBuilder
  ) {}

  public readonly appraisalTextControl$ = this._parcelInfoSmallClaimsAppraisalsFacade.selectedAppraisalText$.pipe(
    map((appraisalText) => this._formBuilder.control(appraisalText, [FieldValidators.note]))
  );
}
