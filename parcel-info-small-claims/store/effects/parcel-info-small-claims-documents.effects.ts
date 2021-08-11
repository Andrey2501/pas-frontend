import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PermissionFacade } from 'src/app/auth/store/facades';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store/facades';
import { catchApiException, checkPermissions } from 'src/app/shared/operators';
import { DocumentEntity, PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsDocumentsActions, ParcelInfoSmallClaimsDocumentsPreviewActions } from '../actions';
import { ParcelInfoSmallClaimsDocumentsFacade, ParcelInfoSmallClaimsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsDocumentsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _parcelInfoDocumentsFacade: ParcelInfoSmallClaimsDocumentsFacade,
    private readonly _permissionFacade: PermissionFacade,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly load$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsActions.load),
      checkPermissions(this._permissionFacade.isAbleViewDocument$),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsFacade.computedSmallClaimId$),
      switchMap(([, parcelId, smallClaimId]) => {
        return this._pasSwaggerApiService.documents_GetByEntityId(parcelId, smallClaimId, DocumentEntity.Appeal).pipe(
          map((documents) => ParcelInfoSmallClaimsDocumentsActions.loadSuccess({ documents })),
          catchApiException(ParcelInfoSmallClaimsDocumentsActions.loadError)
        );
      })
    );
  });

  public readonly select$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsActions.select),
      switchMap(({ documentId }) => [
        ParcelInfoSmallClaimsDocumentsPreviewActions.resetState(),
        ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLink({ documentId }),
      ])
    );
  });

  public readonly selectPrev$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsActions.selectPrev),
      withLatestFrom(this._parcelInfoDocumentsFacade.selectPreviousDocumentId$),
      map(([, previousDocumentId]) => ParcelInfoSmallClaimsDocumentsActions.selectWithoutDownload({ documentId: previousDocumentId }))
    );
  });

  public readonly selectNext$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsActions.selectNext),
      withLatestFrom(this._parcelInfoDocumentsFacade.selectNextDocumentId$),
      map(([, nextDocumentId]) => ParcelInfoSmallClaimsDocumentsActions.selectWithoutDownload({ documentId: nextDocumentId }))
    );
  });

  public readonly remove$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsActions.remove),
      withLatestFrom(this._parcelInfoDocumentsFacade.selectedDocumentId$),
      switchMap(([, documentId]) => {
        return this._pasSwaggerApiService.documents_Deactivate(documentId).pipe(
          switchMap(() => [
            ParcelInfoSmallClaimsDocumentsPreviewActions.resetState(),
            ParcelInfoSmallClaimsDocumentsActions.removeSuccess(),
            ParcelInfoSmallClaimsDocumentsActions.load(),
          ]),
          catchApiException(ParcelInfoSmallClaimsDocumentsActions.removeError)
        );
      })
    );
  });
}
