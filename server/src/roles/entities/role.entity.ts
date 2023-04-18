import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableName, RoleDTOKey } from 'src/common/enums/enums';

@Entity(TableName.ROLES)
export class Role {
  @PrimaryGeneratedColumn()
  [RoleDTOKey.ID]: number;

  @Column()
  [RoleDTOKey.VALUE]: string;

  @Column()
  [RoleDTOKey.DESCRIPTION]: string;

  @ManyToMany(() => User)
  [RoleDTOKey.USERS]: User[];
}
