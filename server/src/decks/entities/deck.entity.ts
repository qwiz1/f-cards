import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import { DeckDTOKey, TableName } from 'src/common/enums/enums';

@Entity(TableName.DECKS)
export class Deck {
  @PrimaryGeneratedColumn()
  [DeckDTOKey.ID]: number;

  @Column({ nullable: false })
  [DeckDTOKey.NAME]: string;

  @Column()
  [DeckDTOKey.DESCRIPTION]: string;

  @Column({ default: true })
  [DeckDTOKey.IS_PUBLIC]: boolean;

  @ManyToOne(() => User, (user) => user.decks)
  [DeckDTOKey.USER]: User;

  @OneToMany(() => Card, (card) => card.deck)
  [DeckDTOKey.CARDS]: Card[];
}
