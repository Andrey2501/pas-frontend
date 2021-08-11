import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { SmallClaimEventSort, SmallClaimEventViewModel } from 'src/app/shared/services';
import { EVENTS_TABLE_DISPLAYED_COLUMNS, EVENT_LOCATION_MAX_LENGTH, INFINITE_SCROLL_THROTTLE_EVENTS } from '../../constants';
import { SmallClaimEventTableRow } from '../../interfaces';
import { ParcelInfoSmallClaimsPopupService } from '../../services';
import { ParcelInfoSmallClaimsCurrentEventFacade, ParcelInfoSmallClaimsEventsFacade } from '../../store';

@Component({
  selector: 'pas-parcel-info-small-claims-results-events-table',
  templateUrl: './parcel-info-small-claims-results-events-table.component.html',
  styleUrls: ['./parcel-info-small-claims-results-events-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsResultsEventsTableComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsEventsFacade: ParcelInfoSmallClaimsEventsFacade,
    private readonly _parcelInfoSmallClaimsPopupService: ParcelInfoSmallClaimsPopupService,
    private readonly _parcelInfoSmallClaimsCurrentEventFacade: ParcelInfoSmallClaimsCurrentEventFacade
  ) {}

  public readonly displayedColumns = EVENTS_TABLE_DISPLAYED_COLUMNS;

  public readonly eventLocationMaxLength = EVENT_LOCATION_MAX_LENGTH;

  public readonly dataSource$ = this._parcelInfoSmallClaimsEventsFacade.dataSource$.pipe(
    map((events) => {
      this._dataSource.data = events;

      return this._dataSource;
    })
  );

  public readonly sortParams$ = this._parcelInfoSmallClaimsEventsFacade.sortParams$;

  public readonly infiniteScrollThrottle = INFINITE_SCROLL_THROTTLE_EVENTS;

  public readonly smallClaimEventSort = SmallClaimEventSort;

  private readonly _dataSource = new MatTableDataSource([] as SmallClaimEventTableRow[]);

  public onSetSortParams(sort: Sort): void {
    this._parcelInfoSmallClaimsEventsFacade.setSortParams(sort);
  }

  public trackByEventId(_: number, row: SmallClaimEventViewModel): number {
    return row.eventId;
  }

  public onSelect(row: SmallClaimEventViewModel): void {
    this._parcelInfoSmallClaimsEventsFacade.select(row.eventId);
  }

  public openEventPopup(row: SmallClaimEventViewModel): void {
    this._parcelInfoSmallClaimsCurrentEventFacade.loadEvent(row.eventId);

    this._parcelInfoSmallClaimsPopupService.openEventPopup();
  }

  public onPrev(): void {
    this._parcelInfoSmallClaimsEventsFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsEventsFacade.selectNext();
  }

  public onScroll(): void {
    this._parcelInfoSmallClaimsEventsFacade.loadMore();
  }
}
