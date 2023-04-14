import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

type UserLoginPayload = {
  id: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);
    const isPasswordValid = await bcrypt.compare(pass, user?.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserLoginPayload) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('User with this email already exists.');
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    return await this.usersService.create({
      ...createUserDto,
      password: passwordHash,
    });
  }
}
