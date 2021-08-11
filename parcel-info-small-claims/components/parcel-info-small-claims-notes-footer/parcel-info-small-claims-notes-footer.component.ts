import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IFormGroup } from '@rxweb/types';
import { INotesFormType } from 'src/app/shared/form-types';
import { OverlayFacade } from 'src/app/shared/store';
import { ParcelInfoSmallClaimsNotesFacade } from '../../store/facades';

@UntilDestroy()
@Component({
  selector: 'pas-parcel-info-small-claims-notes-footer',
  templateUrl: './parcel-info-small-claims-notes-footer.component.html',
  styleUrls: ['./parcel-info-small-claims-notes-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsNotesFooterComponent implements OnDestroy {
  constructor(
    private readonly _parcelInfoSmallClaimsNotesFacade: ParcelInfoSmallClaimsNotesFacade,
    private readonly _overlayFacade: OverlayFacade
  ) {}

  @Input() public readonly form: IFormGroup<INotesFormType>;

  public readonly selectedNote$ = this._parcelInfoSmallClaimsNotesFacade.selectedNote$;

  public readonly isEditMode$ = this._parcelInfoSmallClaimsNotesFacade.isEditMode$;

  public readonly isViewMode$ = this._parcelInfoSmallClaimsNotesFacade.isViewMode$;

  public readonly isShowNoteInfo$ = this._parcelInfoSmallClaimsNotesFacade.isShowNoteInfo$;

  public readonly isShowNoteControls$ = this._parcelInfoSmallClaimsNotesFacade.isShowNoteControls$;

  public readonly isFirstNote$ = this._parcelInfoSmallClaimsNotesFacade.isFirstNote$;

  public readonly isShowNoteActions$ = this._parcelInfoSmallClaimsNotesFacade.isShowNoteActions$;

  public readonly isLastNote$ = this._parcelInfoSmallClaimsNotesFacade.isLastNote$;

  public readonly isShowEditButton$ = this._parcelInfoSmallClaimsNotesFacade.isShowEditButton$;

  public readonly isShowDeleteButton$ = this._parcelInfoSmallClaimsNotesFacade.isShowDeleteButton$;

  public readonly isShowAddButton$ = this._parcelInfoSmallClaimsNotesFacade.isShowAddButton$;

  public readonly footerControlsOptions$ = this._parcelInfoSmallClaimsNotesFacade.footerControlsOptions$;

  public onPrev(): void {
    this._parcelInfoSmallClaimsNotesFacade.selectPrev();
  }

  public onNext(): void {
    this._parcelInfoSmallClaimsNotesFacade.selectNext();
  }

  public onEdit(): void {
    this._parcelInfoSmallClaimsNotesFacade.setEditMode(true);
    this._overlayFacade.changeOverlay(false);
  }

  public onCancelEditing(): void {
    this._parcelInfoSmallClaimsNotesFacade.setEditMode(false);
    this._overlayFacade.changeOverlay(true);
  }

  public onAdd(note: string): void {
    this._parcelInfoSmallClaimsNotesFacade.add(note);
  }

  public onDelete(): void {
    this._parcelInfoSmallClaimsNotesFacade.remove();
    this._parcelInfoSmallClaimsNotesFacade.resetSelection();
  }

  public onUpdate(): void {
    this._parcelInfoSmallClaimsNotesFacade.update(this.form.value.note);
  }

  public ngOnDestroy(): void {}
}
