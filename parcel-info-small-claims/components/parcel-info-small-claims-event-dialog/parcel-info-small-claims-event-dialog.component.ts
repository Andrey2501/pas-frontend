import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/shared/services';
import { EventFormComponent } from 'src/app/events/components';
import { DEFAULT_DIALOG_OPTIONS } from 'src/app/shared/constants';
import { ParcelInfoSmallClaimsCurrentEventFacade } from '../../store';
import { DialogUtils } from 'src/app/shared/utils';
import { EventService } from 'src/app/events/services';
import { EVENT_DELETE_CONFIRMATION_DIALOG_CONTENT, EVENT_DELETE_CONFIRMATION_DIALOG_TITLE } from 'src/app/events/constants';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-event-dialog',
  templateUrl: './parcel-info-small-claims-event-dialog.component.html',
  styleUrls: ['./parcel-info-small-claims-event-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsEventDialogComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsCurrentEventFacade: ParcelInfoSmallClaimsCurrentEventFacade,
    private readonly _dialogRef: MatDialogRef<ParcelInfoSmallClaimsEventDialogComponent>,
    private readonly _dialogService: DialogService,
    private readonly _eventService: EventService
  ) {}

  @ViewChild(EventFormComponent) private readonly _eventFormComponent: EventFormComponent;

  public readonly isAbleToModifyEvent$ = this._parcelInfoSmallClaimsCurrentEventFacade.isAbleToModifyEvent$;

  public readonly eventFilesSources$ = this._parcelInfoSmallClaimsCurrentEventFacade.eventFilesSources$;

  public readonly eventData$ = this._parcelInfoSmallClaimsCurrentEventFacade.eventData$;

  public readonly selectedEventId$ = this._parcelInfoSmallClaimsCurrentEventFacade.selectedEventId$;

  public readonly isShowEditBtn$ = this._parcelInfoSmallClaimsCurrentEventFacade.isShowEditBtn$;

  public readonly isAbleToDeleteEvent$ = this._parcelInfoSmallClaimsCurrentEventFacade.isAbleToDeleteEvent$;

  public ngOnDestroy(): void {}

  public get form(): FormGroup {
    return this._eventFormComponent?.eventForm;
  }

  public onClose(): void {
    this._dialogService.handleCancelFormDialog({
      context: this,
      isDirty: this.form.dirty,
      handleOpenDialog: () => this._dialogService.openConfirmationCancelDialog(DEFAULT_DIALOG_OPTIONS.cancelButtonCancel),
      handleClose: () => this._handleCancel(),
    });
  }

  public onCloseDialog(): void {
    this._handleCancel();
  }

  public onSetEditMode(): void {
    this._parcelInfoSmallClaimsCurrentEventFacade.setViewMode(false);
  }

  public onDeleteEvent(): void {
    const deleteConfirmationDialogRef = this._dialogService.openConfirmationDeleteDialog(
      EVENT_DELETE_CONFIRMATION_DIALOG_TITLE,
      EVENT_DELETE_CONFIRMATION_DIALOG_CONTENT
    );

    DialogUtils.getDialogSubmit$(this, deleteConfirmationDialogRef).subscribe(() => {
      this._parcelInfoSmallClaimsCurrentEventFacade.deleteEvent();
      this._parcelInfoSmallClaimsCurrentEventFacade.setViewMode(true);
      this._handleCancel();
    });
  }

  public onSave(): void {
    const dialog = this._eventFormComponent.getSubmitDialog();

    if (dialog) {
      DialogUtils.getDialogSubmit$(this, dialog).subscribe(() => this._createOrUpdateEvent());
    } else {
      this._createOrUpdateEvent();
    }
  }

  private _createOrUpdateEvent(): void {
    const createOrUpdateEventModel = this._eventService.createOrUpdateEventModel(this.form);

    this._parcelInfoSmallClaimsCurrentEventFacade.save(createOrUpdateEventModel);
    this._handleCancel();
  }

  private _handleCancel(): void {
    this._dialogRef.close();
  }
}
