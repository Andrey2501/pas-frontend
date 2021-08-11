import { SmallClaimsDetailsMenu } from '../enums';

export class ParcelInfoSmallClaimsDetailsModel {
  constructor(selectedMenu: string, smallClaimsDetailsMenuValue: string, isAbleToView: boolean) {
    this.isActive = selectedMenu === smallClaimsDetailsMenuValue;
    this.menuValue = smallClaimsDetailsMenuValue as SmallClaimsDetailsMenu;
    this.isAbleToView = isAbleToView;
  }

  public readonly isActive: boolean;

  public readonly isAbleToView: boolean;

  public readonly menuValue: SmallClaimsDetailsMenu;
}
