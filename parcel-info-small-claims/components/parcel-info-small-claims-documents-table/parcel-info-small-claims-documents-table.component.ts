import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ACTIVE_SORT_COLUMN, DOCUMENTS_TABLE_DISPLAYED_COLUMNS, SORT_DIRECTION } from 'src/app/shared/constants';
import { IParcelInfoDocumentsTableRow } from 'src/app/shared/interfaces';
import { DialogService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsDocumentsFacade } from '../../store';
import { ParcelInfoSmallClaimsDocumentsPreviewModalComponent } from '../parcel-info-small-claims-documents-preview-modal/parcel-info-small-claims-documents-preview-modal.component';

@Component({
  selector: 'pas-parcel-info-small-claims-documents-table',
  templateUrl: './parcel-info-small-claims-documents-table.component.html',
  styleUrls: ['./parcel-info-small-claims-documents-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsDocumentsTableComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsDocumentsFacade: ParcelInfoSmallClaimsDocumentsFacade,
    private readonly _dialogService: DialogService
  ) {}

  @Input() public readonly isViewMode: boolean;

  public readonly activeSortColumn = ACTIVE_SORT_COLUMN;

  public readonly sortDirection = SORT_DIRECTION;

  public readonly displayedColumns = DOCUMENTS_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsDocumentsFacade.sortedDocumentsRows$;

  public onSelect(tableRow: IParcelInfoDocumentsTableRow): void {
    this._parcelInfoSmallClaimsDocumentsFacade.select(tableRow.documentId);
  }

  public onPreview(): void {
    if (this.isViewMode) {
      this._dialogService.openDialog(ParcelInfoSmallClaimsDocumentsPreviewModalComponent);
    }
  }

  public onSortChange(sort: Sort): void {
    this._parcelInfoSmallClaimsDocumentsFacade.setSortParams(sort);
  }

  public onPrev(): void {
    this._parcelInfoSmallClaimsDocumentsFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsDocumentsFacade.selectNext();
  }
}
