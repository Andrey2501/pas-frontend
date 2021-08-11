import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { catchApiException } from 'src/app/shared/operators';
import { ParcelInfoSmallClaimsCurrentEventActions, ParcelInfoSmallClaimsEventsActions } from '../actions';
import { EventFileUploadingActions } from 'src/app/events/store/actions';
import { EventFileUploadingFacade } from 'src/app/events/store';
import { ParcelInfoSmallClaimsCurrentEventFacade, ParcelInfoSmallClaimsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsCurrentEventEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _eventFileUploadingFacade: EventFileUploadingFacade,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsCurrentEventFacade: ParcelInfoSmallClaimsCurrentEventFacade
  ) {}

  public readonly loadEvent$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsCurrentEventActions.loadEvent),
      switchMap(({ eventId }) => {
        return this._pasSwaggerApiService.events_Get(eventId).pipe(
          map((selectedEvent) => ParcelInfoSmallClaimsCurrentEventActions.loadEventSuccess({ selectedEvent })),
          catchApiException(ParcelInfoSmallClaimsCurrentEventActions.loadEventError)
        );
      })
    );
  });

  public readonly createEvent$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsCurrentEventActions.createEvent),
      withLatestFrom(this._eventFileUploadingFacade.filesToUpload$, this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([action, filesToUpload, smallClaimId]) => {
        return this._pasSwaggerApiService.events_Post({ ...action.event, itemId: smallClaimId }).pipe(
          switchMap((event) => [
            EventFileUploadingActions.optionalUpload({ eventId: event.eventId, filesToUpload }),
            ParcelInfoSmallClaimsEventsActions.load(),
          ]),
          catchApiException(ParcelInfoSmallClaimsCurrentEventActions.createEventError)
        );
      })
    );
  });

  public readonly updateEvent$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsCurrentEventActions.updateEvent),
      withLatestFrom(this._eventFileUploadingFacade.filesToDelete$, this._eventFileUploadingFacade.filesToUpload$),
      switchMap(([action, filesToDelete, filesToUpload]) => {
        return this._pasSwaggerApiService.events_Put(action.selectedEventId, action.event).pipe(
          switchMap((event) => [
            EventFileUploadingActions.optionalUpload({ eventId: event.eventId, filesToUpload }),
            EventFileUploadingActions.deleteFiles({ filesToDelete }),
            ParcelInfoSmallClaimsEventsActions.load(),
          ]),
          catchApiException(ParcelInfoSmallClaimsCurrentEventActions.updateEventError)
        );
      })
    );
  });

  public readonly deleteEvent$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsCurrentEventActions.deleteEvent),
      withLatestFrom(this._parcelInfoSmallClaimsCurrentEventFacade.selectedEventId$),
      switchMap(([, selectedEventId]) => {
        return this._pasSwaggerApiService.events_Deactivate(selectedEventId).pipe(
          map(() => ParcelInfoSmallClaimsEventsActions.load()),
          catchApiException(ParcelInfoSmallClaimsCurrentEventActions.deleteEventError)
        );
      })
    );
  });

  public readonly saveEvent$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsCurrentEventActions.save),
      withLatestFrom(this._parcelInfoSmallClaimsCurrentEventFacade.selectedEventId$),
      map(([{ event }, selectedEventId]) => {
        return selectedEventId
          ? ParcelInfoSmallClaimsCurrentEventActions.updateEvent({ event, selectedEventId })
          : ParcelInfoSmallClaimsCurrentEventActions.createEvent({ event });
      })
    );
  });
}
