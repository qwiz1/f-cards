import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(role);
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.rolesRepository.findOneBy({ value });
    if (!role) throw new NotFoundException();
    return role;
  }

  async getAll(): Promise<Role[]> {
    const roles = await this.rolesRepository.find();
    return roles;
  }
}
