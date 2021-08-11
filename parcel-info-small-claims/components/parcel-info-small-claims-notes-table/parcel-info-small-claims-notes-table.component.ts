import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { INoteTableRow } from 'src/app/shared/interfaces';
import { NOTE_TABLE_DISPLAYED_COLUMNS } from '../../constants';
import { ParcelInfoSmallClaimsNotesFacade } from '../../store/facades';

@Component({
  selector: 'pas-parcel-info-small-claims-notes-table',
  templateUrl: './parcel-info-small-claims-notes-table.component.html',
  styleUrls: ['./parcel-info-small-claims-notes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsNotesTableComponent {
  constructor(private readonly _parcelInfoSmallClaimsNotesFacade: ParcelInfoSmallClaimsNotesFacade) {}

  public readonly displayedColumns = NOTE_TABLE_DISPLAYED_COLUMNS;

  public readonly dataSource$ = this._parcelInfoSmallClaimsNotesFacade.dataSource$.pipe(
    map((notes) => {
      return new MatTableDataSource(notes);
    })
  );

  public readonly sortActive$ = this._parcelInfoSmallClaimsNotesFacade.sortActive$;

  public readonly sortDirection$ = this._parcelInfoSmallClaimsNotesFacade.sortDirection$;

  public onSelect(row: INoteTableRow): void {
    this._parcelInfoSmallClaimsNotesFacade.select(row.noteId);
  }

  public onPrev(): void {
    this._parcelInfoSmallClaimsNotesFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsNotesFacade.selectNext();
  }

  public onSortChange(sort: Sort): void {
    this._parcelInfoSmallClaimsNotesFacade.setSortParams(sort);
  }
}
