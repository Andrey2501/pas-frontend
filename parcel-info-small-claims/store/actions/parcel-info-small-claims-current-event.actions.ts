import { createAction, props } from '@ngrx/store';
import { CreateOrUpdateEventViewModel, EventViewModel } from 'src/app/shared/services';
import { apiExceptionProps } from 'src/app/shared/constants';

const LOAD_EVENT = '[Parcel Info Small Claims Current Event] Load Event';
const LOAD_EVENT_SUCCESS = '[Parcel Info Small Claims Current Event] Load Success Event';
const LOAD_EVENT_ERROR = '[Parcel Info Small Claims Current Event] Load Error Event';

const loadEvent = createAction(LOAD_EVENT, props<{ eventId: number }>());
const loadEventSuccess = createAction(LOAD_EVENT_SUCCESS, props<{ selectedEvent: EventViewModel }>());
const loadEventError = createAction(LOAD_EVENT_ERROR, apiExceptionProps);

const SELECT_EVENT = '[Parcel Info Small Claims Current Event] Select Event';

const selectEvent = createAction(SELECT_EVENT, props<{ selectedId: number }>());

const RESET = '[Parcel Info Small Claims Current Event] Reset';

const reset = createAction(RESET);

const SET_VIEW_MODE = '[Parcel Info Small Claims Current Event] Set View Mode';

const setViewMode = createAction(SET_VIEW_MODE, props<{ isViewMode: boolean }>());

const CREATE_EVENT = '[Parcel Info Small Claims Current Event] Create Event';
const CREATE_EVENT_ERROR = '[Parcel Info Small Claims Current Event] Create Event Error';

const createEvent = createAction(CREATE_EVENT, props<{ event: CreateOrUpdateEventViewModel }>());
const createEventError = createAction(CREATE_EVENT_ERROR, apiExceptionProps);

const UPDATE_EVENT = '[Parcel Info Small Claims Current Event] Update Event';
const UPDATE_EVENT_ERROR = '[Parcel Info Small Claims Current Event] Update Event Error';

const updateEvent = createAction(UPDATE_EVENT, props<{ selectedEventId: number; event: CreateOrUpdateEventViewModel }>());
const updateEventError = createAction(UPDATE_EVENT_ERROR, apiExceptionProps);

const DELETE_EVENT = '[Parcel Info Small Claims Current Event] Delete Event';
const DELETE_EVENT_ERROR = '[Parcel Info Small Claims Current Event] Delete Event Error';

const deleteEvent = createAction(DELETE_EVENT);
const deleteEventError = createAction(DELETE_EVENT_ERROR, apiExceptionProps);

const SAVE = '[Parcel Info Small Claims Current Event] Save';

const save = createAction(SAVE, props<{ event: CreateOrUpdateEventViewModel }>());

export const ParcelInfoSmallClaimsCurrentEventActions = {
  selectEvent,
  loadEvent,
  loadEventSuccess,
  loadEventError,
  reset,
  setViewMode,
  createEvent,
  createEventError,
  updateEvent,
  updateEventError,
  deleteEvent,
  deleteEventError,
  save,
};
