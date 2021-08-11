import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store/facades';
import { ParcelInfoSmallClaimsDocumentsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-documents-overview',
  templateUrl: './parcel-info-small-claims-documents-overview.component.html',
  styleUrls: ['./parcel-info-small-claims-documents-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsDocumentsOverviewComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _parcelInfoSmallClaimsDocumentsFacade: ParcelInfoSmallClaimsDocumentsFacade
  ) {}

  public readonly isViewMode$ = this._parcelInfoDetailsFacade.isViewMode$;

  public readonly isLoading$ = this._parcelInfoSmallClaimsDocumentsFacade.isLoading$;

  public ngOnInit(): void {
    this._parcelInfoSmallClaimsDocumentsFacade.load();
  }

  public ngOnDestroy(): void {
    this._parcelInfoSmallClaimsDocumentsFacade.resetState();
  }
}
