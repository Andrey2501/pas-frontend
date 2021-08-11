import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParcelInfoSmallClaimsAddFacade, ParcelInfoSmallClaimsFacade } from '../../store';
import { ParcelInfoSmallClaimsSelectGrievancesComponent } from '../parcel-info-small-claims-select-grievances/parcel-info-small-claims-select-grievances.component';
import { DialogService } from 'src/app/shared/services';

@Component({
  selector: 'pas-parcel-info-small-claims-info',
  templateUrl: './parcel-info-small-claims-info.component.html',
  styleUrls: ['./parcel-info-small-claims-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsInfoComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _dialogService: DialogService,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade
  ) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsFacade.isLoading$;

  public readonly isDataExist$ = this._parcelInfoSmallClaimsFacade.isDataExist$;

  public readonly isAbleToAddInModifyMode$ = this._parcelInfoSmallClaimsFacade.isAbleToAddInModifyMode$;

  public onAdd(): void {
    this._dialogService.openDialog(ParcelInfoSmallClaimsSelectGrievancesComponent);
    this._parcelInfoSmallClaimsAddFacade.setAddMode(true);
    this._parcelInfoSmallClaimsAddFacade.resetReasonValue();
  }
}
