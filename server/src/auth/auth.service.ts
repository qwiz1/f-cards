import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

type UserPayload = {
  id: number;
  username: string;
  email: string;
  roles: Role[];
};

type Token = {
  bearer_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    identifier: string,
    pass: string,
  ): Promise<UserPayload | null> {
    const user = await this.usersService.getByUsernameOrEmail(identifier);
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async signIn(user: UserPayload): Promise<Token> {
    const payload = { role: user.roles[0].value, sub: 'auth', userId: user.id };
    return {
      bearer_token: this.jwtService.sign(payload),
    };
  }

  public async signUp(
    createUserDto: CreateUserDto,
  ): Promise<UserPayload & Token> {
    const { username, email, password } = createUserDto;

    const isEmailExist = !!(await this.usersService.getByEmail(email));
    const isUsernameExist = !!(await this.usersService.getByUsername(username));

    if (isEmailExist)
      throw new BadRequestException('User with same email already exists.');

    if (isUsernameExist)
      throw new BadRequestException('User with same username already exists.');

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: passwordHash,
    });

    return {
      ...newUser,
      bearer_token: this.jwtService.sign({
        role: newUser.roles[0].value,
        sub: 'auth',
        userId: newUser.id,
      }),
    };
  }

  public getUserById(id: number): Promise<User> {
    return this.usersService.getById(id);
  }
}
