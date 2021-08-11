import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store';
import { ParcelInfoRefreshActions } from 'src/app/parcel-info/store/actions';
import { catchApiException } from 'src/app/shared/operators';
import { NoteEntity, PasSwaggerApiService } from 'src/app/shared/services';
import { OverlayActions } from 'src/app/shared/store/actions';
import { ParcelInfoSmallClaimsNotesActions } from '../actions';
import { ParcelInfoSmallClaimsFacade, ParcelInfoSmallClaimsNotesFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsNotesEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _parcelInfoSmallClaimsNotesFacade: ParcelInfoSmallClaimsNotesFacade,
    private readonly _pasSwaggerApiService: PasSwaggerApiService
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsNotesActions.load, ParcelInfoRefreshActions.refresh),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, parcelId, computedSmallClaimId]) => {
        return this._pasSwaggerApiService.notes_GetAll(parcelId, computedSmallClaimId, NoteEntity.Appeal).pipe(
          map((notes) => ParcelInfoSmallClaimsNotesActions.loadSuccess({ notes })),
          catchApiException(ParcelInfoSmallClaimsNotesActions.loadError)
        );
      })
    );
  });

  public readonly selectPrev$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsNotesActions.selectPrev),
      withLatestFrom(this._parcelInfoSmallClaimsNotesFacade.prevNoteId$, (_, noteId) => noteId),
      map((noteId) => ParcelInfoSmallClaimsNotesActions.select({ noteId }))
    );
  });

  public readonly selectNext$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsNotesActions.selectNext),
      withLatestFrom(this._parcelInfoSmallClaimsNotesFacade.nextNoteId$, (_, noteId) => noteId),
      map((noteId) => ParcelInfoSmallClaimsNotesActions.select({ noteId }))
    );
  });

  public readonly add$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsNotesActions.add),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([note, parcelId, computedSmallClaimId]) => {
        return this._pasSwaggerApiService.notes_Create(parcelId, computedSmallClaimId, NoteEntity.Appeal, note).pipe(
          switchMap(() => [ParcelInfoSmallClaimsNotesActions.addSuccess(), ParcelInfoSmallClaimsNotesActions.load()]),
          catchApiException(ParcelInfoSmallClaimsNotesActions.addError)
        );
      })
    );
  });

  public readonly remove$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsNotesActions.remove),
      withLatestFrom(this._parcelInfoSmallClaimsNotesFacade.computedNoteId$),
      switchMap(([, computedNoteId]) => {
        return this._pasSwaggerApiService.notes_Delete(computedNoteId).pipe(
          switchMap(() => [ParcelInfoSmallClaimsNotesActions.removeSuccess(), ParcelInfoSmallClaimsNotesActions.load()]),
          catchApiException(ParcelInfoSmallClaimsNotesActions.removeError)
        );
      })
    );
  });

  public readonly update$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsNotesActions.update),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsNotesFacade.computedNoteId$),
      switchMap(([{ note }, parcelId, computedNoteId]) => {
        return this._pasSwaggerApiService.notes_Update(parcelId, computedNoteId, { noteText: note }).pipe(
          switchMap(() => [
            ParcelInfoSmallClaimsNotesActions.updateSuccess(),
            ParcelInfoSmallClaimsNotesActions.setEditMode({ isEditMode: false }),
            OverlayActions.changeOverlay({ isViewMode: true }),
            ParcelInfoSmallClaimsNotesActions.load(),
            ParcelInfoSmallClaimsNotesActions.select({ noteId: computedNoteId }),
          ]),
          catchApiException(ParcelInfoSmallClaimsNotesActions.updateError)
        );
      })
    );
  });
}
