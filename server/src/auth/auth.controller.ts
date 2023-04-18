import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiPath, AuthApiPath } from 'src/common/enums/enums';

interface UserRequest extends Request {
  user?: User;
}

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthApiPath.SIGN_IN)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() req: UserRequest) {
    if (!req.user) throw new UnauthorizedException();
    return await this.authService.signIn(req.user);
  }

  @Post(AuthApiPath.SIGN_UP)
  async signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.authService.signUp(createUserDto);
  }

  @Get(AuthApiPath.CURRENT_USER)
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: UserRequest) {
    return req.user;
  }
}
