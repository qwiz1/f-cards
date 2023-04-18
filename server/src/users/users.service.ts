import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async create(createUserDto: CreateUserDto): Promise<TUser> {
    const user = this.usersRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByValue('user');
    user.roles = [role];
    const { password, ...result } = await this.usersRepository.save(user);
    return result;
  }

  public getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: { roles: true },
    });
  }

  public async getById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException();
    return user;
  }

  public getByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  public getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  public async getByUsernameOrEmail(identifier: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: { roles: true },
      where: [{ username: identifier }, { email: identifier }],
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.usersRepository.update(id, updateUserDto);
    if (!user) throw new NotFoundException();
    return user;
  }

  public async remove(id: number): Promise<User> {
    const targetUser = await this.getById(id);
    const deletedUser = await this.usersRepository.remove(targetUser);
    return deletedUser;
  }
}
