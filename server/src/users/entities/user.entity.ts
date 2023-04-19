import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { TableName, UserDTOKey } from 'src/common/enums/enums';
import { Deck } from 'src/decks/entities/deck.entity';

@Entity(TableName.USERS)
export class User {
  @PrimaryGeneratedColumn()
  [UserDTOKey.ID]: number;

  @Column({ unique: true })
  [UserDTOKey.USERNAME]: string;

  @Column({ unique: true })
  [UserDTOKey.EMAIL]: string;

  @Column()
  [UserDTOKey.PASSWORD]: string;

  @OneToMany(() => Deck, (deck) => deck.user)
  [UserDTOKey.DECKS]: Deck[];

  @ManyToMany(() => Role)
  @JoinTable()
  [UserDTOKey.ROLES]: Role[];
}
