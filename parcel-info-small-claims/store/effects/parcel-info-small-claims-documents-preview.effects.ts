import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { catchApiException } from 'src/app/shared/operators';
import { FileClientService, PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsDocumentsPreviewActions } from '../actions';
import { ParcelInfoSmallClaimsDocumentsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsDocumentsPreviewEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoSmallClaimsDocumentsFacade: ParcelInfoSmallClaimsDocumentsFacade,
    private readonly _fileClientService: FileClientService
  ) {}

  public readonly loadDocumentLink$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLink),
      switchMap(({ documentId }) => {
        return this._pasSwaggerApiService.documents_GetDownloadLink(documentId).pipe(
          map((s3DownloadLink) => ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLinkSuccess({ s3DownloadLink })),
          catchApiException(ParcelInfoSmallClaimsDocumentsPreviewActions.loadDocumentLinkError)
        );
      })
    );
  });

  public readonly downLoadDocument$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocument),
      withLatestFrom(this._parcelInfoSmallClaimsDocumentsFacade.selectedDocumentId$),
      switchMap(([, documentId]) => {
        return this._pasSwaggerApiService.documents_GetDownloadLink(documentId).pipe(
          switchMap((s3DownloadLink) => [
            ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentLinkSuccess(),
            ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentByLink({ s3DownloadLink }),
          ]),
          catchApiException(ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentLinkError)
        );
      })
    );
  });

  public readonly downLoadDocumentByLink$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentByLink),
      switchMap(({ s3DownloadLink }) => {
        return this._fileClientService.downloadDocument(s3DownloadLink.uri, s3DownloadLink.name).pipe(
          map((documentData) => {
            return ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentByLinkSuccess({
              documentData,
            });
          }),
          catchApiException(ParcelInfoSmallClaimsDocumentsPreviewActions.downloadDocumentByLinkError)
        );
      })
    );
  });
}
