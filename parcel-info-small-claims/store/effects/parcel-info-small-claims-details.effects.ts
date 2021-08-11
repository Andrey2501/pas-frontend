import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoSmallClaimsAddFacade, ParcelInfoSmallClaimsDetailsFacade, ParcelInfoSmallClaimsFacade } from '../facades';
import { PasSwaggerApiService } from 'src/app/shared/services';
import { catchApiException, ofTypeContactFeature, positiveValue } from 'src/app/shared/operators';
import { ParcelInfoSmallClaimDetailsActions, ParcelInfoSmallClaimsResultsActions } from '../actions';
import { ContactAddActions, ContactAutocompleteActions } from 'src/app/contact/store/actions';
import { ContactFeatures } from 'src/app/contact/enums';
import { ConfigurationSmallClaimsFacade } from 'src/app/configuration/store';

@Injectable()
export class ParcelInfoSmallClaimsDetailsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsDetailsFacade: ParcelInfoSmallClaimsDetailsFacade,
    private readonly _configurationSmallClaimsFacade: ConfigurationSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsAddFacade: ParcelInfoSmallClaimsAddFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimDetailsActions.load),
      switchMap(() => this._parcelInfoSmallClaimsFacade.isDataExist$),
      positiveValue(),
      withLatestFrom(this._parcelInfoSmallClaimsDetailsFacade.params$),
      switchMap(([, params]) => {
        return this._pasSwaggerApiService
          .smallClaim_GetSmallClaimsDetails(params.selectedSmallClaimId, { names: params.visibleColumnsList })
          .pipe(
            switchMap((smallClaimDetails) => [ParcelInfoSmallClaimDetailsActions.loadSuccess({ smallClaimDetails })]),
            catchApiException(ParcelInfoSmallClaimDetailsActions.loadError)
          );
      })
    );
  });

  public readonly initContacts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimDetailsActions.initContacts),
      withLatestFrom(this._parcelInfoSmallClaimsDetailsFacade.initialPetitioner$, this._parcelInfoSmallClaimsDetailsFacade.initialLawyer$),
      switchMap(([, initialPetitioner, initialLawyer]) => {
        return [
          ContactAutocompleteActions.initialSet({ contact: initialPetitioner, featureId: ContactFeatures.SmallClaimPetitioner }),
          ContactAutocompleteActions.initialSet({ contact: initialLawyer, featureId: ContactFeatures.SmallClaimLawyer }),
        ];
      })
    );
  });

  public readonly loadPetitionerDetails$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimDetailsActions.loadPetitionerDetails),
      withLatestFrom(this._parcelInfoSmallClaimsDetailsFacade.petitionerInformationDetailColumns$),
      switchMap(([{ petitionerId }, petitionerInformationDetailColumns]) => {
        return this._pasSwaggerApiService.grievances_GetPetitionerDetails(petitionerId, { names: petitionerInformationDetailColumns }).pipe(
          switchMap((petitionerDetails) => [
            ParcelInfoSmallClaimDetailsActions.loadPetitionerDetailsSuccess({ petitionerDetails }),
            ParcelInfoSmallClaimDetailsActions.setLawyerContact(),
          ]),
          catchApiException(ParcelInfoSmallClaimDetailsActions.loadPetitionerDetailsError)
        );
      })
    );
  });

  public readonly setLawyerContact$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimDetailsActions.setLawyerContact),
      withLatestFrom(this._parcelInfoSmallClaimsDetailsFacade.updatedLawyer$),
      map(([, updatedLawyer]) => {
        return ContactAutocompleteActions.initialSet({
          contact: updatedLawyer,
          featureId: ContactFeatures.SmallClaimLawyer,
        });
      })
    );
  });

  public readonly loadLawyerDetails$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimDetailsActions.loadLawyerDetails),
      withLatestFrom(this._configurationSmallClaimsFacade.petitionerInformationColumnsList$),
      switchMap(([{ lawyerId }, petitionerInformationColumnsList]) => {
        return this._pasSwaggerApiService.grievances_GetLawyerDetails(lawyerId, { names: petitionerInformationColumnsList }).pipe(
          map((lawyerDetails) => ParcelInfoSmallClaimDetailsActions.loadLawyerDetailsSuccess({ lawyerDetails })),
          catchApiException(ParcelInfoSmallClaimDetailsActions.loadLawyerDetailsError)
        );
      })
    );
  });

  public readonly loadDetailsOnAddPetitionerSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ContactAddActions.addContactSuccess),
      ofTypeContactFeature(ContactFeatures.SmallClaimPetitioner),
      map(({ contact }) => ParcelInfoSmallClaimDetailsActions.loadPetitionerDetails({ petitionerId: contact.contactId }))
    );
  });

  public readonly loadDetailsOnAddLawyerSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ContactAddActions.addContactSuccess),
      ofTypeContactFeature(ContactFeatures.SmallClaimLawyer),
      map(({ contact }) => ParcelInfoSmallClaimDetailsActions.loadLawyerDetails({ lawyerId: contact.contactId }))
    );
  });

  public readonly save$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimDetailsActions.save),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.computedSmallClaimId$, this._parcelInfoSmallClaimsAddFacade.reasonValue$),
      switchMap(([{ updateSmallClaim }, computedSmallClaimId, reasonValue]) => {
        return this._pasSwaggerApiService
          .smallClaim_Update(computedSmallClaimId, { ...updateSmallClaim, petitionerReason: reasonValue })
          .pipe(
            switchMap(() => [
              ParcelInfoSmallClaimDetailsActions.saveSuccess(),
              ParcelInfoSmallClaimDetailsActions.load(),
              ParcelInfoSmallClaimsResultsActions.loadResults(),
            ]),
            catchApiException(ParcelInfoSmallClaimDetailsActions.saveError)
          );
      })
    );
  });
}
