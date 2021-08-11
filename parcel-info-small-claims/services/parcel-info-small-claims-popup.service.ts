import { UntilDestroy } from '@ngneat/until-destroy';
import { Injectable, OnDestroy } from '@angular/core';
import { DialogService } from 'src/app/shared/services';
import { DialogUtils } from 'src/app/shared/utils';
import { EventFileUploadingFacade } from '../../events/store';
import { ParcelInfoSmallClaimsEventDialogComponent } from '../components/parcel-info-small-claims-event-dialog/parcel-info-small-claims-event-dialog.component';
import { ParcelInfoSmallClaimsCurrentEventFacade } from '../store';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class ParcelInfoSmallClaimsPopupService implements OnDestroy {
  constructor(
    private readonly _dialogService: DialogService,
    private readonly _eventFileUploadingFacade: EventFileUploadingFacade,
    private readonly _parcelInfoSmallClaimsCurrentEventFacade: ParcelInfoSmallClaimsCurrentEventFacade
  ) {}

  public ngOnDestroy(): void {}

  public openEventPopup(): void {
    const popupDialogRef = this._dialogService.openDialog(ParcelInfoSmallClaimsEventDialogComponent);

    DialogUtils.getDialogClose$(this, popupDialogRef).subscribe(() => {
      this._parcelInfoSmallClaimsCurrentEventFacade.reset();
      this._eventFileUploadingFacade.resetState();
    });
  }
}
