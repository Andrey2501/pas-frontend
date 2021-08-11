import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { AuthPermissionWrapperUtils } from 'src/app/auth/utils';
import { SmallClaimsDetailsMenu } from '../../enums';
import { ParcelInfoSmallClaimsActions } from '../actions';
import { ParcelInfoSmallClaimsSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsFacade {
  constructor(private readonly _store: Store) {}

  public readonly isSmallClaimEntityActive$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsSmallClaimEntityActive);

  public readonly smallClaimTableRows$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectTableRows);

  public readonly smallClaimTableRowsInfo$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectTableRowsInfo);

  public readonly previousSmallClaimId$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectPreviousId);

  public readonly nextSmallClaimId$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectNextId);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsLoading);

  public readonly isDataExist$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsDataExist);

  public readonly isModifyMode$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsModifyMode);

  public readonly isViewMode$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsViewMode);

  public readonly selectedMenu$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectSelectedMenu);

  public readonly smallClaimsTotal$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectSmallClaimsTotal);

  public readonly selectedSmallClaim$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectSelectedSmallClaim);

  public readonly selectedSmallClaimIndexLabel$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectSelectedSmallClaimIndexLabel);

  public readonly isGlobalModifyMode$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsGlobalModifyMode);

  public readonly isAbleToEditSmallClaim$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsAbleToEditSmallClaim);

  public readonly isAbleToRemoveSmallClaim$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsAbleToRemoveSmallClaim);

  public readonly isSelectedFirstSmallClaim$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsSelectedFirstSmallClaim);

  public readonly isSelectedLastSmallClaim$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsSelectedLastSmallClaim);

  public readonly isNavigationAvailable$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsNavigationAvailable);

  public readonly computedSmallClaimId$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectComputedId);

  public readonly smallClaimsDetailsMenuValues$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectsDetailsMenuModels);

  public readonly completedGrievanceTableRows$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectCompletedGrievanceTableRows);

  public readonly isSelectedCompletedGrievance$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsSelectedCompletedGrievance);

  public readonly isSelectedUncompletedGrievance$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsSelectedUncompletedGrievance);

  public readonly isAbleToAddInModifyMode$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectIsAbleToAddInModifyMode);

  public readonly selectedYear$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectSelectedYear);

  public readonly exemptionParams$ = this._store.select(ParcelInfoSmallClaimsSelectors.selectExemptionParams);

  public load(): void {
    this._store.dispatch(AuthPermissionWrapperUtils.wrapOne(ParcelInfoSmallClaimsActions.load));
  }

  public select(smallClaimId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.select({ smallClaimId }));
  }

  public selectNext(): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.selectNext());
  }

  public setSortParams(sortParams: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.setSortParams({ sortParams }));
  }

  public selectPrev(): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.selectPrev());
  }

  public chooseDetailsMenu(menu: SmallClaimsDetailsMenu): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.chooseDetailsMenu({ menu }));
  }

  public loadDetails(): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.loadDetails());
  }

  public setViewFormMode(isViewFormMode: boolean): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.setViewFormMode({ isViewFormMode }));
  }

  public remove(): void {
    this._store.dispatch(ParcelInfoSmallClaimsActions.remove());
  }
}
