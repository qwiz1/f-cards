import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';

type TUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<TUser> {
    const user = this.usersRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByValue('user');
    user.roles = [role];
    const { password, ...result } = await this.usersRepository.save(user);
    return result;
  }

  async getAll(): Promise<User[]> {
    const user = await this.usersRepository.find({
      relations: { roles: true },
    });
    return user;
  }

  async getById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id: id });
    return user;
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async getByUsernameOrEmail(identifier: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      relations: { roles: true },
      where: [{ username: identifier }, { email: identifier }],
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: number): Promise<User> {
    const targetUser = await this.getById(id);
    const deletedUser = await this.usersRepository.remove(targetUser);
    return deletedUser;
  }
}
