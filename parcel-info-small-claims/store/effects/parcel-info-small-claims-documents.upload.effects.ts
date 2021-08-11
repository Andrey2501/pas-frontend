import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { ParcelInfoDetailsFacade } from 'src/app/parcel-info/store/facades';
import { catchApiException } from 'src/app/shared/operators';
import { DocumentEntity, FileClientService, PasSwaggerApiService } from 'src/app/shared/services';
import { ParcelInfoSmallClaimsDocumentsActions, ParcelInfoSmallClaimsDocumentUploadActions } from '../actions';
import { ParcelInfoSmallClaimsDocumentsUploadFacade, ParcelInfoSmallClaimsFacade } from '../facades';

@Injectable()
export class ParcelInfoSmallClaimsDocumentsUploadEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _parcelInfoSmallClaimsDocumentsUploadFacade: ParcelInfoSmallClaimsDocumentsUploadFacade,
    private readonly _pasSwaggerApiService: PasSwaggerApiService,
    private readonly _parcelInfoDetailsFacade: ParcelInfoDetailsFacade,
    private readonly _fileClientService: FileClientService,
    private readonly _parcelInfoSmallClaimsFacade: ParcelInfoSmallClaimsFacade
  ) {}

  public readonly getUploadLink$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentUploadActions.getUploadLink),
      withLatestFrom(this._parcelInfoDetailsFacade.parcelId$, this._parcelInfoSmallClaimsDocumentsUploadFacade.documentName$),
      switchMap(([, parcelId, documentNameToUpload]) => {
        return this._pasSwaggerApiService.documents_GetUploadLink(parcelId, documentNameToUpload).pipe(
          switchMap((uploadLinkResponse) => [
            ParcelInfoSmallClaimsDocumentUploadActions.getUploadLinkSuccess(),
            ParcelInfoSmallClaimsDocumentUploadActions.uploadDocument({ uploadLinkResponse }),
          ]),
          catchApiException(ParcelInfoSmallClaimsDocumentUploadActions.getUploadLinkError)
        );
      })
    );
  });

  public readonly uploadDocument$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentUploadActions.uploadDocument),
      withLatestFrom(this._parcelInfoSmallClaimsDocumentsUploadFacade.document$),
      switchMap(([{ uploadLinkResponse }, documentToUpload]) => {
        return this._fileClientService.uploadDocument(uploadLinkResponse.uri, documentToUpload.data, uploadLinkResponse.contentType).pipe(
          switchMap(() => [
            ParcelInfoSmallClaimsDocumentUploadActions.uploadDocumentSuccess(),
            ParcelInfoSmallClaimsDocumentUploadActions.createDocument({ key: uploadLinkResponse.key }),
          ]),
          catchApiException(ParcelInfoSmallClaimsDocumentUploadActions.uploadDocumentError)
        );
      })
    );
  });

  public readonly createDocument$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ParcelInfoSmallClaimsDocumentUploadActions.createDocument),
      withLatestFrom(
        this._parcelInfoDetailsFacade.parcelId$,
        this._parcelInfoSmallClaimsDocumentsUploadFacade.documentName$,
        this._parcelInfoSmallClaimsFacade.computedSmallClaimId$
      ),
      switchMap(([{ key }, parcelId, fileName, smallClaimId]) => {
        return this._pasSwaggerApiService.documents_Create(parcelId, smallClaimId, { fileName, key }, DocumentEntity.Appeal).pipe(
          switchMap(() => [
            ParcelInfoSmallClaimsDocumentUploadActions.createDocumentSuccess(),
            ParcelInfoSmallClaimsDocumentsActions.load(),
            ParcelInfoSmallClaimsDocumentUploadActions.resetState(),
          ]),
          catchApiException(ParcelInfoSmallClaimsDocumentUploadActions.createDocumentError)
        );
      })
    );
  });
}
