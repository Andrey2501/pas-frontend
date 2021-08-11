import { Pipe, PipeTransform } from '@angular/core';
import { IConfiguredFormInputControl } from '../../shared/interfaces';
import { SMALL_CLAIM_FULL_MARKET_KEY } from '../constants';

@Pipe({
  name: 'fullMarketFormattedField',
})
export class FullMarketFormattedFieldPipe implements PipeTransform {
  public transform(value: string, controls: IConfiguredFormInputControl[]): IConfiguredFormInputControl {
    const fullMarketKey = SMALL_CLAIM_FULL_MARKET_KEY.concat(value).toLowerCase();

    return controls.find((control) => control.key.toLowerCase() === fullMarketKey);
  }
}
