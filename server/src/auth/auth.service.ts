import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

type UserLoginPayload = {
  id: number;
  username: string;
  email: string;
  roles: Role[];
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsernameOrEmail(identifier);
    const isPasswordValid = await bcrypt.compare(pass, user?.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserLoginPayload) {
    const payload = { role: user.roles[0].value, sub: user.id };
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
