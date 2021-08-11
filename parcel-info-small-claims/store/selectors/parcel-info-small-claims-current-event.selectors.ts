import { createSelector } from '@ngrx/store';
import { EventFileUploadingSelectors, EventResourcesSelectors, EventsSelectorsUtils } from 'src/app/events/store/selectors';
import { mapUserToUserOption } from 'src/app/shared/utils';
import { IEventFormData } from 'src/app/events/interfaces';
import { ParcelInfoDetailsSelectors } from 'src/app/parcel-info/store/selectors';
import { PermissionSelectors } from 'src/app/auth/store/selectors';
import { selectFeature } from './parcel-info-small-claims-feature.selector';
import { SMALL_CLAIM_EVENT_DISABLED_FIELD_NAMES } from '../../constants';

const selectState = createSelector(selectFeature, ({ parcelInfoSmallClaimsCurrentEvent }) => parcelInfoSmallClaimsCurrentEvent);
const selectSelectedEvent = createSelector(selectState, (state) => state.selectedEvent);
const selectIsEditMode = createSelector(selectState, (state) => !state.isViewMode);
const selectIsViewMode = createSelector(selectState, (state) => state.isViewMode);

const selectEvent = createSelector(selectSelectedEvent, (selectedEvent) => {
  return selectedEvent ? selectedEvent : EventsSelectorsUtils.createDefaultEventViewModel();
});
const selectSelectedEventId = createSelector(selectSelectedEvent, (event) => event?.eventId);

const selectUsersIds = createSelector(selectEvent, (event) => {
  return event?.userIds;
});

const selectEventUsers = createSelector(EventResourcesSelectors.selectEventUsers, selectUsersIds, (users, usersIds) => {
  if (usersIds?.length) {
    const currentUsers = users.filter((user) => usersIds.includes(user.userId));

    return currentUsers.map((user) => mapUserToUserOption(user));
  } else {
    return [];
  }
});

const selectEventData = createSelector(
  selectEvent,
  selectEventUsers,
  ParcelInfoDetailsSelectors.selectParcelEventInfo,
  (event, eventUsers, parcelEventInfo) => {
    return {
      ...event,
      eventUsers,
      eventParcel: parcelEventInfo,
      disabledFieldsNames: SMALL_CLAIM_EVENT_DISABLED_FIELD_NAMES,
    } as IEventFormData;
  }
);

const selectEventFilesSources = createSelector(
  selectSelectedEvent,
  EventFileUploadingSelectors.selectEventDownloadedFiles,
  EventFileUploadingSelectors.selectFilesToDelete,
  EventFileUploadingSelectors.selectEventFilesToUpload,
  (selectedEvent, downloadedFiles, filesToDelete, filesToUpload) => {
    return EventsSelectorsUtils.getEventFilesModels(selectedEvent, downloadedFiles, filesToDelete, filesToUpload);
  }
);

const selectIsAbleToModifyEvent = createSelector(
  PermissionSelectors.selectIsAbleToModifyEvent,
  PermissionSelectors.selectIsAbleToAddEvent,
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  selectIsEditMode,
  (isAbleToModifyEvent, isAbleToAddEvent, isParcelEditMode, isEditMode) => {
    const isAbleToModifyOrAddEvent = isAbleToModifyEvent || isAbleToAddEvent;

    return isAbleToModifyOrAddEvent && isParcelEditMode && isEditMode;
  }
);

const selectIsAbleToAddEvent = createSelector(
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  PermissionSelectors.selectIsAbleToAddEvent,
  (...props) => {
    return props.every(Boolean);
  }
);

const selectIsShowEditBtn = createSelector(
  PermissionSelectors.selectIsAbleToModifyEvent,
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  selectIsViewMode,
  (...props) => {
    return props.every(Boolean);
  }
);

const selectIsAbleToDeleteEvent = createSelector(
  PermissionSelectors.selectIsAbleToDeleteEvent,
  ParcelInfoDetailsSelectors.selectIsModifyMode,
  selectIsEditMode,
  (...props) => {
    return props.every(Boolean);
  }
);

export const ParcelInfoSmallClaimsCurrentEventSelectors = {
  selectEventFilesSources,
  selectIsAbleToModifyEvent,
  selectEventData,
  selectIsAbleToAddEvent,
  selectSelectedEventId,
  selectIsShowEditBtn,
  selectIsAbleToDeleteEvent,
};
