import { createAction, props } from '@ngrx/store';
import { apiExceptionProps } from 'src/app/shared/constants';
import { FieldViewModel, SmallClaimDetailViewModel, UpdateAppealViewModel } from 'src/app/shared/services';

const LOAD = '[Parcel Info Small Claims Details] Load';
const LOAD_SUCCESS = '[Parcel Info Small Claims Details] Load Success';
const LOAD_ERROR = '[Parcel Info Small Claims Details] Load Error';

const load = createAction(LOAD);
const loadSuccess = createAction(LOAD_SUCCESS, props<{ smallClaimDetails: SmallClaimDetailViewModel }>());
const loadError = createAction(LOAD_ERROR, apiExceptionProps);

const INIT_CONTACTS = '[Parcel Info Small Claims Details] Init Contacts';

const initContacts = createAction(INIT_CONTACTS);

const LOAD_PETITIONER_DETAILS = '[Parcel Info Small Claims Details] Load Petitioner Details';
const LOAD_PETITIONER_DETAILS_SUCCESS = '[Parcel Info Small Claims Details] Load Petitioner Details Success';
const LOAD_PETITIONER_DETAILS_ERROR = '[Parcel Info Small Claims Details] Load Petitioner Details Error';

const loadPetitionerDetails = createAction(LOAD_PETITIONER_DETAILS, props<{ petitionerId: number }>());
const loadPetitionerDetailsSuccess = createAction(LOAD_PETITIONER_DETAILS_SUCCESS, props<{ petitionerDetails: FieldViewModel[] }>());
const loadPetitionerDetailsError = createAction(LOAD_PETITIONER_DETAILS_ERROR, apiExceptionProps);

const LOAD_LAWYER_DETAILS = '[Parcel Info Small Claims Details] Load Lawyer Details';
const LOAD_LAWYER_DETAILS_SUCCESS = '[Parcel Info Small Claims Details] Load Lawyer Details Success';
const LOAD_LAWYER_DETAILS_ERROR = '[Parcel Info Small Claims Details] Load Lawyer Details Error';

const loadLawyerDetails = createAction(LOAD_LAWYER_DETAILS, props<{ lawyerId: number }>());
const loadLawyerDetailsSuccess = createAction(LOAD_LAWYER_DETAILS_SUCCESS, props<{ lawyerDetails: FieldViewModel[] }>());
const loadLawyerDetailsError = createAction(LOAD_LAWYER_DETAILS_ERROR, apiExceptionProps);

const SET_LAWYER_CONTACT = '[Parcel Info Small Claims Details] Set Lawyer Contact';

const setLawyerContact = createAction(SET_LAWYER_CONTACT);

const RESET_CONTACT_DETAILS = '[Parcel Info Small Claims Details] Reset Contact Details';

const resetContactDetails = createAction(RESET_CONTACT_DETAILS);

const SAVE = '[Parcel Info Small Claims Details] Save';
const SAVE_SUCCESS = '[Parcel Info Small Claims Details] Save Success';
const SAVE_ERROR = '[Parcel Info Small Claims Details] Save Error';

const save = createAction(SAVE, props<{ updateSmallClaim: UpdateAppealViewModel }>());
const saveSuccess = createAction(SAVE_SUCCESS);
const saveError = createAction(SAVE_ERROR, apiExceptionProps);

export const ParcelInfoSmallClaimDetailsActions = {
  load,
  loadSuccess,
  loadError,
  initContacts,
  loadPetitionerDetails,
  loadPetitionerDetailsSuccess,
  loadPetitionerDetailsError,
  loadLawyerDetails,
  loadLawyerDetailsSuccess,
  loadLawyerDetailsError,
  setLawyerContact,
  resetContactDetails,
  save,
  saveSuccess,
  saveError,
};
