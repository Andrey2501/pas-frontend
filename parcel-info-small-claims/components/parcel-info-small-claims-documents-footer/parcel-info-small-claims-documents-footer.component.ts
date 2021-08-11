import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PermissionFacade } from 'src/app/auth/store/facades';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store/facades';
import { DialogService } from 'src/app/shared/services';
import { DialogUtils } from 'src/app/shared/utils';
import { ParcelInfoSmallClaimsDocumentsFacade, ParcelInfoSmallClaimsDocumentsPreviewFacade } from '../../store';
import { ParcelInfoSmallClaimsDocumentsUploadModalComponent } from '../parcel-info-small-claims-documents-upload-modal/parcel-info-small-claims-documents-upload-modal.component';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-documents-footer',
  templateUrl: './parcel-info-small-claims-documents-footer.component.html',
  styleUrls: ['./parcel-info-small-claims-documents-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsDocumentsFooterComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsDocumentsFacade: ParcelInfoSmallClaimsDocumentsFacade,
    private readonly _parcelInfoDocumentsPreviewFacade: ParcelInfoSmallClaimsDocumentsPreviewFacade,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _permissionFacade: PermissionFacade,
    private readonly _dialogService: DialogService
  ) {}

  public readonly isModifyMode$ = this._parcelInfoDetailsFacade.isModifyMode$;

  public readonly isViewMode$ = this._parcelInfoDetailsFacade.isViewMode$;

  public readonly isAbleToDeleteDocument$ = this._parcelInfoSmallClaimsDocumentsFacade.isAbleToDeleteDocument$;

  public readonly isAbleToAddDocument$ = this._permissionFacade.isAbleToAddDocument$;

  public readonly documentsTotal$ = this._parcelInfoSmallClaimsDocumentsFacade.documentsTotal$;

  public readonly selectedDocumentIndexLabel$ = this._parcelInfoSmallClaimsDocumentsFacade.selectedDocumentIndexLabel$;

  public readonly isSelectedFirstDocument$ = this._parcelInfoSmallClaimsDocumentsFacade.isSelectedFirstDocument$;

  public readonly isSelectedLastDocument$ = this._parcelInfoSmallClaimsDocumentsFacade.isSelectedLastDocument$;

  public readonly selectedDocumentId$ = this._parcelInfoSmallClaimsDocumentsFacade.selectedDocumentId$;

  public readonly isNavigationAvailable$ = this._parcelInfoSmallClaimsDocumentsFacade.isNavigationAvailable$;

  public onAdd(): void {
    this._dialogService.openDialog(ParcelInfoSmallClaimsDocumentsUploadModalComponent);
  }

  public onDelete(): void {
    const dialogRef = this._dialogService.openConfirmationDeleteDialog(
      'Delete document',
      'Are you sure you want to delete selected document?'
    );

    DialogUtils.getDialogSubmit$(this, dialogRef).subscribe(() => this._parcelInfoSmallClaimsDocumentsFacade.remove());
  }

  public ngOnDestroy(): void {}

  public onDownload(): void {
    this._parcelInfoDocumentsPreviewFacade.downLoadDocument();
  }

  public onPrevDocument(): void {
    this._parcelInfoSmallClaimsDocumentsFacade.selectPrev();
  }

  public onNextDocument(): void {
    this._parcelInfoSmallClaimsDocumentsFacade.selectNext();
  }
}
