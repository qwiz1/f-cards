import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from 'src/decks/entities/deck.entity';
import { CardDTOKey, TableName } from 'src/common/enums/enums';

@Entity(TableName.CARDS)
export class Card {
  @PrimaryGeneratedColumn()
  [CardDTOKey.ID]: number;

  @Column({ nullable: false })
  [CardDTOKey.NAME]: string;

  @Column()
  [CardDTOKey.DESCRIPTION]: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  [CardDTOKey.DECK]: Deck;
}
