import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { TableName, UserDTOKey } from 'src/common/enums/enums';

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

  @ManyToMany(() => Role)
  @JoinTable()
  [UserDTOKey.ROLES]: Role[];
}
