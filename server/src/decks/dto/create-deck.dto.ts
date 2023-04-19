import { DeckDTOKey } from 'src/common/enums/enums';

export class CreateDeckDto {
  [DeckDTOKey.NAME]: string;
  [DeckDTOKey.DESCRIPTION]: string;
  [DeckDTOKey.IS_PUBLIC]?: boolean;
  [DeckDTOKey.USER_ID]: string;
}
