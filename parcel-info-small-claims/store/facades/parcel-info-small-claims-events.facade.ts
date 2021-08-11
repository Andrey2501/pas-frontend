import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sort } from '@angular/material/sort';
import { ParcelInfoSmallClaimsEventsSelectors } from '../selectors';
import { ParcelInfoSmallClaimsEventsActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsEventsFacade {
  constructor(private readonly _store: Store) {}

  public readonly dataSource$ = this._store.select(ParcelInfoSmallClaimsEventsSelectors.selectDataSource);

  public readonly params$ = this._store.select(ParcelInfoSmallClaimsEventsSelectors.selectParams);

  public readonly sortParams$ = this._store.select(ParcelInfoSmallClaimsEventsSelectors.selectSortParams);

  public readonly prevId$ = this._store.select(ParcelInfoSmallClaimsEventsSelectors.selectPrevId);

  public readonly nextId$ = this._store.select(ParcelInfoSmallClaimsEventsSelectors.selectNextId);

  public setSortParams(sort: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsEventsActions.setSortParams({ sort }));
  }

  public loadMore(): void {
    this._store.dispatch(ParcelInfoSmallClaimsEventsActions.loadMore());
  }

  public select(eventId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsEventsActions.select({ eventId }));
  }

  public selectNext(): void {
    this._store.dispatch(ParcelInfoSmallClaimsEventsActions.selectNext());
  }

  public selectPrev(): void {
    this._store.dispatch(ParcelInfoSmallClaimsEventsActions.selectPrev());
  }
}
