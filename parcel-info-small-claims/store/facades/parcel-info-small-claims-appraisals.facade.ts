import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ParcelInfoSmallClaimsAppraisalsActions } from '../actions';
import { ParcelInfoSmallClaimsAppraisalsSelectors } from '../selectors';
import { IDefaultFormValue } from 'src/app/shared/interfaces';
import { CreateContactViewModel } from '../../../shared/services';

@Injectable({
  providedIn: 'root',
})
export class ParcelInfoSmallClaimsAppraisalsFacade {
  constructor(private readonly _store: Store) {}

  public readonly dataSource$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectDataSource);

  public readonly isLoading$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsLoading);

  public readonly footerControlsOptions$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectFooterControlsOptions);

  public readonly isViewMode$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsViewMode);

  public readonly prevAppraisalId$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectPrevAppraisalId);

  public readonly nextAppraisalId$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectNextAppraisalId);

  public readonly sortActive$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectSortActive);

  public readonly sortDirection$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectSortDirection);

  public readonly selectedAppraisalText$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectSelectedAppraisalText);

  public readonly selectedAppraisal$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectSelectedAppraisal);

  public readonly isShowAdd$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsShowAdd);

  public readonly isShowEdit$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsShowEdit);

  public readonly isEditMode$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsEditMode);

  public readonly isShowDelete$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsShowDelete);

  public readonly computedAppraisalId$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectComputedAppraisalId);

  public readonly appraisalParams$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectAppraisalParams);

  public readonly initialAppraiser$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectInitialAppraiser);

  public readonly isShowControls$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsShowControls);

  public readonly isShowInfo$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectIsShowInfo);

  public readonly selectedAppraisalForm$ = this._store.select(ParcelInfoSmallClaimsAppraisalsSelectors.selectSelectedAppraisalForm);

  public readonly selectedAppraisalLastChange$ = this._store.select(
    ParcelInfoSmallClaimsAppraisalsSelectors.selectSelectedAppraisalLastChange
  );

  public readonly selectedAppraisalLastChangeBy$ = this._store.select(
    ParcelInfoSmallClaimsAppraisalsSelectors.selectSelectedAppraisalLastChangeBy
  );

  public selectPrev(): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.selectPrev());
  }

  public selectNext(): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.selectNext());
  }

  public select(appraisalId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.select({ appraisalId }));
  }

  public setSortParams(params: Sort): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.setSortParams({ params }));
  }

  public setEditMode(isEditMode: boolean): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.setEditMode({ isEditMode }));
  }

  public save(formValue: IDefaultFormValue): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.save({ formValue }));
  }

  public initAppraiser(): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.initAppraiser());
  }

  public remove(): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.remove());
  }

  public addAppraiser(contact: CreateContactViewModel): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.addAppraiser({ contact }));
  }

  public setAppraiserId(appraiserId: number): void {
    this._store.dispatch(ParcelInfoSmallClaimsAppraisalsActions.setAppraiserId({ appraiserId }));
  }
}
