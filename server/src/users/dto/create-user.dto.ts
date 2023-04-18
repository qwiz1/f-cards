import { UserDTOKey } from 'src/common/enums/enums';

export class CreateUserDto {
  [UserDTOKey.USERNAME]: string;
  [UserDTOKey.EMAIL]: string;
  [UserDTOKey.PASSWORD]: string;
}
