import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploaderModel } from 'src/app/shared/models';
import { ParcelInfoSmallClaimsDocumentsUploadFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-documents-upload-modal',
  templateUrl: './parcel-info-small-claims-documents-upload-modal.component.html',
  styleUrls: ['./parcel-info-small-claims-documents-upload-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsDocumentsUploadModalComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsDocumentsUploadFacade: ParcelInfoSmallClaimsDocumentsUploadFacade,
    private readonly _dialogRef: MatDialogRef<unknown>
  ) {}

  public readonly isUploadDisabled$ = this._parcelInfoSmallClaimsDocumentsUploadFacade.isUploadDisabled$;

  public readonly documents$ = this._parcelInfoSmallClaimsDocumentsUploadFacade.documents$;

  public onFileAdded(file: FileUploaderModel): void {
    this._parcelInfoSmallClaimsDocumentsUploadFacade.setDocumentToUpload(file);
  }

  public onFileRemove(file: FileUploaderModel): void {
    this._parcelInfoSmallClaimsDocumentsUploadFacade.removeDocumentToUpload(file.source);
  }

  public onUpload(): void {
    this._parcelInfoSmallClaimsDocumentsUploadFacade.getUploadLink();
    this._dialogRef.close();
  }

  public onCancel(): void {
    this._parcelInfoSmallClaimsDocumentsUploadFacade.resetState();
    this._dialogRef.close();
  }
}
