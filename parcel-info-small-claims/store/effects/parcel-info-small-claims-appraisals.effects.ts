import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { catchApiException, ofTypeContactFeature } from 'src/app/shared/operators';
import { ContactTypes, PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsAppraisalsActions } from '../actions';
import { ParcelInfoSmallClaimsAppraisalsFacade, ParcelInfoSmallClaimsFacade } from '../facades';
import { ParcelInfoSmallClaimAppraisalModel } from '../../models';
import { ContactAddActions, ContactAutocompleteActions } from 'src/app/contact/store/actions';
import { ContactFeatures } from 'src/app/contact/enums';

@Injectable()
export class ParcelInfoSmallClaimsAppraisalsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoSmallClaimsAppraisalsFacade: ParcelInfoSmallClaimsAppraisalsFacade,
    private readonly _pasSwaggerApiService: PasSwaggerApiService
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.load),
      withLatestFrom(this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, computedSmallClaimId]) => {
        return this._pasSwaggerApiService.appraisal_Get(computedSmallClaimId).pipe(
          map((appraisals) => ParcelInfoSmallClaimsAppraisalsActions.loadSuccess({ appraisals })),
          catchApiException(ParcelInfoSmallClaimsAppraisalsActions.loadError)
        );
      })
    );
  });

  public readonly selectPrev$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.selectPrev),
      withLatestFrom(this._parcelInfoSmallClaimsAppraisalsFacade.prevAppraisalId$, (_, appraisalId) => appraisalId),
      map((appraisalId) => ParcelInfoSmallClaimsAppraisalsActions.select({ appraisalId }))
    );
  });

  public readonly selectNext$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.selectNext),
      withLatestFrom(this._parcelInfoSmallClaimsAppraisalsFacade.nextAppraisalId$, (_, appraisalId) => appraisalId),
      map((appraisalId) => ParcelInfoSmallClaimsAppraisalsActions.select({ appraisalId }))
    );
  });

  public readonly add$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.add),
      withLatestFrom(this._parcelInfoSmallClaimsAppraisalsFacade.appraisalParams$),
      map(([{ formValue }, params]) => {
        return new ParcelInfoSmallClaimAppraisalModel(formValue, params);
      }),
      switchMap((model) => {
        return this._pasSwaggerApiService.appraisal_Create(model).pipe(
          switchMap((selectedAppraisalId) => [
            ParcelInfoSmallClaimsAppraisalsActions.addSuccess({ selectedAppraisalId }),
            ParcelInfoSmallClaimsAppraisalsActions.load(),
          ]),
          catchApiException(ParcelInfoSmallClaimsAppraisalsActions.addError)
        );
      })
    );
  });

  public readonly edit$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.edit),
      withLatestFrom(
        this._parcelInfoSmallClaimsAppraisalsFacade.appraisalParams$,
        this._parcelInfoSmallClaimsAppraisalsFacade.computedAppraisalId$
      ),
      map(([{ formValue }, params, appraisalId]) => {
        return new ParcelInfoSmallClaimAppraisalModel(formValue, params, appraisalId);
      }),
      switchMap((model) => {
        return this._pasSwaggerApiService.appraisal_Edit(model).pipe(
          switchMap(() => [
            ParcelInfoSmallClaimsAppraisalsActions.editSuccess({ selectedAppraisalId: model.appraisalId }),
            ParcelInfoSmallClaimsAppraisalsActions.load(),
          ]),
          catchApiException(ParcelInfoSmallClaimsAppraisalsActions.editError)
        );
      })
    );
  });

  public readonly initAppraiser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.initAppraiser),
      withLatestFrom(this._parcelInfoSmallClaimsAppraisalsFacade.initialAppraiser$),
      map(([, initialAppraiser]) => {
        return ContactAutocompleteActions.initialSet({ contact: initialAppraiser, featureId: ContactFeatures.Appraiser });
      })
    );
  });

  public readonly save$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.save),
      withLatestFrom(this._parcelInfoSmallClaimsAppraisalsFacade.isEditMode$),
      map(([{ formValue }, isEditMode]) => {
        return isEditMode
          ? ParcelInfoSmallClaimsAppraisalsActions.edit({ formValue })
          : ParcelInfoSmallClaimsAppraisalsActions.add({ formValue });
      })
    );
  });

  public readonly remove$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.remove),
      withLatestFrom(this._parcelInfoSmallClaimsAppraisalsFacade.computedAppraisalId$),
      switchMap(([, computedAppraisalId]) => {
        return this._pasSwaggerApiService.appraisal_Delete(computedAppraisalId).pipe(
          switchMap(() => [ParcelInfoSmallClaimsAppraisalsActions.removeSuccess(), ParcelInfoSmallClaimsAppraisalsActions.load()]),
          catchApiException(ParcelInfoSmallClaimsAppraisalsActions.removeError)
        );
      })
    );
  });

  public readonly addAppraiser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsAppraisalsActions.addAppraiser),
      map(({ contact }) => {
        const newAppraiser = { ...contact, contactType: ContactTypes.Appraiser };

        return ContactAddActions.addContact({
          featureId: ContactFeatures.Appraiser,
          contact: newAppraiser,
        });
      })
    );
  });

  public readonly loadDetailsOnAddAppraiserSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ContactAddActions.addContactSuccess),
      ofTypeContactFeature(ContactFeatures.Appraiser),
      map(({ contact }) => ParcelInfoSmallClaimsAppraisalsActions.setAppraiserId({ appraiserId: contact.contactId }))
    );
  });
}
