import { RoleDTOKey } from 'src/common/enums/enums';

export class CreateRoleDto {
  [RoleDTOKey.VALUE]: string;
  [RoleDTOKey.DESCRIPTION]: string;
}
