import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactFeatures } from 'src/app/contact/enums';
import { ParcelInfoSmallClaimsDetailsFacade } from '../../store';
import { PermissionFacade } from 'src/app/auth/store';
import { DROPDOWN_FIELDS_CONTROLS } from '../../constants';
import { ContactAddModalComponent } from 'src/app/contact/components';
import { ContactTypes, DialogService } from 'src/app/shared/services';
import { ADD_LAWYER_TITLE, ADD_PETITIONER_TITLE } from 'src/app/contact/constants';

@Component({
  selector: 'pas-parcel-info-small-claims-petitioner-form',
  templateUrl: './parcel-info-small-claims-petitioner-form.component.html',
  styleUrls: ['./parcel-info-small-claims-petitioner-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsPetitionerFormComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _permissionFacade: PermissionFacade,
    private readonly _dialogService: DialogService
  ) {}

  @Input() public isViewMode: boolean;

  public readonly petitionerInformationFormControls$ = this._parcelInfoSmallClaimsDetailsFacade.petitionerInformationFormControls$;

  public readonly contactFeatures = ContactFeatures;

  public readonly dropdownFieldsControls = DROPDOWN_FIELDS_CONTROLS;

  public readonly isAbleToAddContact$ = this._permissionFacade.isAbleToAddContact$;

  public onPetitionerIdChange(petitionerId: number): void {
    this._parcelInfoSmallClaimsDetailsFacade.loadPetitionerDetails(petitionerId);
  }

  public onLawyerIdChange(lawyerId: number): void {
    this._parcelInfoSmallClaimsDetailsFacade.loadLawyerDetails(lawyerId);
  }

  public onAddLawyer(): void {
    this._dialogService.openDialog(ContactAddModalComponent, {
      title: ADD_LAWYER_TITLE,
      featureId: ContactFeatures.SmallClaimLawyer,
      contactType: ContactTypes.AppealLawyer,
    });
  }

  public onAddPetitioner(): void {
    this._dialogService.openDialog(ContactAddModalComponent, {
      title: ADD_PETITIONER_TITLE,
      featureId: ContactFeatures.SmallClaimPetitioner,
      contactType: ContactTypes.Petitioner,
    });
  }
}
