import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { IFormBuilder } from '@rxweb/types';
import { map } from 'rxjs/operators';
import { FieldValidators, formBuilderToken } from 'src/app/shared/constants';
import { INotesFormType } from 'src/app/shared/form-types';
import { positiveValue } from 'src/app/shared/operators';
import { ParcelInfoSmallClaimsNotesFacade } from '../../store/facades';

@Component({
  selector: 'pas-parcel-info-small-claims-notes-overview',
  templateUrl: './parcel-info-small-claims-notes-overview.component.html',
  styleUrls: ['./parcel-info-small-claims-notes-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelInfoSmallClaimsNotesOverviewComponent {
  constructor(
    private readonly _parcelInfoSmallClaimsNotesFacade: ParcelInfoSmallClaimsNotesFacade,
    @Inject(formBuilderToken) private readonly _formBuilder: IFormBuilder
  ) {}

  public readonly isLoading$ = this._parcelInfoSmallClaimsNotesFacade.isLoading$;

  public readonly selectedNote$ = this._parcelInfoSmallClaimsNotesFacade.selectedNote$;

  public readonly isEditMode$ = this._parcelInfoSmallClaimsNotesFacade.isEditMode$;

  public readonly form$ = this.selectedNote$.pipe(
    positiveValue(),
    map(({ note }) => {
      return this._formBuilder.group<INotesFormType>({
        note: [note, [Validators.required, FieldValidators.note]],
      });
    })
  );
}
