import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiPath, UserApiPath } from 'src/common/enums/enums';

@Controller(ApiPath.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(UserApiPath.$ID)
  getById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @Put(UserApiPath.$ID)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(UserApiPath.$ID)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
