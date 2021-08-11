import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsCurrentEventActions } from '../actions';
import { ParcelInfoSmallClaimsCurrentEventSelectors } from '../selectors';
import { CreateOrUpdateEventViewModel } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsCurrentEventFacade {
  constructor(private readonly _store: Store) {}

  public readonly eventFilesSources$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectEventFilesSources);

  public readonly isAbleToModifyEvent$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectIsAbleToModifyEvent);

  public readonly eventData$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectEventData);

  public readonly isAbleToAddEvent$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectIsAbleToAddEvent);

  public readonly selectedEventId$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectSelectedEventId);

  public readonly isShowEditBtn$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectIsShowEditBtn);

  public readonly isAbleToDeleteEvent$ = this._store.select(ParcelInfoSmallClaimsCurrentEventSelectors.selectIsAbleToDeleteEvent);

  public reset(): void {
    this._store.dispatch(ParcelInfoSmallClaimsCurrentEventActions.reset());
  }

  public setViewMode(isViewMode: boolean): void {
    this._store.dispatch(ParcelInfoSmallClaimsCurrentEventActions.setViewMode({ isViewMode }));
  }

  public save(event: CreateOrUpdateEventViewModel): void {
    this._store.dispatch(ParcelInfoSmallClaimsCurrentEventActions.save({ event }));
  }

  public deleteEvent(): void {
    this._store.dispatch(ParcelInfoSmallClaimsCurrentEventActions.deleteEvent());
  }

  public loadEvent(eventId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsCurrentEventActions.loadEvent({ eventId }));
  }
}
