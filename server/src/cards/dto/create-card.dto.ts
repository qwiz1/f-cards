import { CardDTOKey } from 'src/common/enums/enums';

export class CreateCardDto {
  [CardDTOKey.NAME]: string;
  [CardDTOKey.DESCRIPTION]: string;
  [CardDTOKey.DECK_ID]: string;
}
