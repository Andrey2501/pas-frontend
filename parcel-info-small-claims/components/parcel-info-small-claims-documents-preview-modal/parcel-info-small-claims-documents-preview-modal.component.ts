import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentTypes } from 'src/app/shared/enums';
import { ParcelInfoSmallClaimsDocumentsPreviewFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-documents-preview-modal',
  templateUrl: './parcel-info-small-claims-documents-preview-modal.component.html',
  styleUrls: ['./parcel-info-small-claims-documents-preview-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsDocumentsPreviewModalComponent {
  constructor(private readonly _parcelInfoSmallClaimsDocumentsFacade: ParcelInfoSmallClaimsDocumentsPreviewFacade) {}

  public readonly documentTypes = DocumentTypes;

  public readonly selectedDocumentType$ = this._parcelInfoSmallClaimsDocumentsFacade.selectedDocumentType$;

  public readonly selectedDocumentUrl$ = this._parcelInfoSmallClaimsDocumentsFacade.selectedDocumentUrl$;

  public readonly isAbleToViewPreview$ = this._parcelInfoSmallClaimsDocumentsFacade.isAbleToViewPreview$;

  public readonly selectedDocumentViewerType$ = this._parcelInfoSmallClaimsDocumentsFacade.selectedDocumentViewerType$;
}
