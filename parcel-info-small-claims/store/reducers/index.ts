import { ActionReducerMap } from '@ngrx/store';
import * as fromParcelInfoSmallClaimsAdd from './parcel-info-small-claims-add.reducer';
import * as fromParcelInfoSmallClaimsAppraisals from './parcel-info-small-claims-appraisals.reducer';
import * as fromParcelInfoSmallClaimsComplaintReasons from './parcel-info-small-claims-complaint-reasons.reducer';
import * as fromParcelInfoSmallClaimsCurrentEvent from './parcel-info-small-claims-current-event.reducer';
import * as fromParcelInfoSmallClaimsDetails from './parcel-info-small-claims-details.reducer';
import * as fromParcelInfoSmallClaimsDocumentsPreview from './parcel-info-small-claims-documents-preview.reducer';
import * as fromParcelInfoSmallClaimsDocumentsUpload from './parcel-info-small-claims-documents-upload.reducer';
import * as fromParcelInfoSmallClaimsDocuments from './parcel-info-small-claims-documents.reducer';
import * as fromParcelInfoSmallClaimsEvents from './parcel-info-small-claims-events.reducer';
import * as fromParcelInfoSmallClaimsExemptions from './parcel-info-small-claims-exemptions.reducer';
import * as fromParcelInfoSmallClaimsForm from './parcel-info-small-claims-form.reducer';
import * as fromParcelInfoSmallClaimsNotes from './parcel-info-small-claims-notes.reducer';
// eslint-disable-next-line max-len
import * as fromParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsReducer from './parcel-info-small-claims-parcel-information-at-time-of-small-claims.reducer';
import * as fromParcelInfoSmallClaimsParcelInformationSales from './parcel-info-small-claims-parcel-information-sales.reducer';
// eslint-disable-next-line max-len
import * as fromParcelInfoSmallClaimsParcelInformationSpecialDistricts from './parcel-info-small-claims-parcel-information-special-districts.reducer';
import * as fromParcelInfoSmallClaimsResults from './parcel-info-small-claims-results.reducer';
import * as fromParcelInfoSmallClaims from './parcel-info-small-claims.reducer';

export const featureKey = 'parcelInfoSmallClaims';

export interface IState {
  parcelInfoSmallClaims: fromParcelInfoSmallClaims.IState;
  parcelInfoSmallClaimsDetails: fromParcelInfoSmallClaimsDetails.IState;
  parcelInfoSmallClaimsAdd: fromParcelInfoSmallClaimsAdd.IState;
  parcelInfoSmallClaimsForm: fromParcelInfoSmallClaimsForm.IState;
  parcelInfoSmallClaimsExemptions: fromParcelInfoSmallClaimsExemptions.IState;
  parcelInfoSmallClaimsNotes: fromParcelInfoSmallClaimsNotes.IState;
  parcelInfoSmallClaimsResults: fromParcelInfoSmallClaimsResults.IState;
  parcelInfoSmallClaimsEvents: fromParcelInfoSmallClaimsEvents.IState;
  parcelInfoSmallClaimsCurrentEvent: fromParcelInfoSmallClaimsCurrentEvent.IState;
  parcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaims: fromParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsReducer.IState;
  parcelInfoSmallClaimsDocuments: fromParcelInfoSmallClaimsDocuments.IState;
  parcelInfoSmallClaimsDocumentsPreview: fromParcelInfoSmallClaimsDocumentsPreview.IState;
  parcelInfoSmallClaimsDocumentsUpload: fromParcelInfoSmallClaimsDocumentsUpload.IState;
  parcelInfoSmallClaimsParcelInformationSales: fromParcelInfoSmallClaimsParcelInformationSales.IState;
  parcelInfoSmallClaimsParcelInformationSpecialDistricts: fromParcelInfoSmallClaimsParcelInformationSpecialDistricts.IState;
  parcelInfoSmallClaimsAppraisals: fromParcelInfoSmallClaimsAppraisals.IState;
  parcelInfoSmallClaimsComplaintReasons: fromParcelInfoSmallClaimsComplaintReasons.IState;
}

export const reducers: ActionReducerMap<IState> = {
  parcelInfoSmallClaims: fromParcelInfoSmallClaims.reducer,
  parcelInfoSmallClaimsDetails: fromParcelInfoSmallClaimsDetails.reducer,
  parcelInfoSmallClaimsAdd: fromParcelInfoSmallClaimsAdd.reducer,
  parcelInfoSmallClaimsForm: fromParcelInfoSmallClaimsForm.reducer,
  parcelInfoSmallClaimsExemptions: fromParcelInfoSmallClaimsExemptions.reducer,
  parcelInfoSmallClaimsNotes: fromParcelInfoSmallClaimsNotes.reducer,
  parcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaims: fromParcelInfoSmallClaimsParcelInformationAtTimeOfSmallClaimsReducer.reducer,
  parcelInfoSmallClaimsDocuments: fromParcelInfoSmallClaimsDocuments.reducer,
  parcelInfoSmallClaimsDocumentsPreview: fromParcelInfoSmallClaimsDocumentsPreview.reducer,
  parcelInfoSmallClaimsDocumentsUpload: fromParcelInfoSmallClaimsDocumentsUpload.reducer,
  parcelInfoSmallClaimsResults: fromParcelInfoSmallClaimsResults.reducer,
  parcelInfoSmallClaimsEvents: fromParcelInfoSmallClaimsEvents.reducer,
  parcelInfoSmallClaimsCurrentEvent: fromParcelInfoSmallClaimsCurrentEvent.reducer,
  parcelInfoSmallClaimsParcelInformationSales: fromParcelInfoSmallClaimsParcelInformationSales.reducer,
  parcelInfoSmallClaimsParcelInformationSpecialDistricts: fromParcelInfoSmallClaimsParcelInformationSpecialDistricts.reducer,
  parcelInfoSmallClaimsAppraisals: fromParcelInfoSmallClaimsAppraisals.reducer,
  parcelInfoSmallClaimsComplaintReasons: fromParcelInfoSmallClaimsComplaintReasons.reducer,
};
