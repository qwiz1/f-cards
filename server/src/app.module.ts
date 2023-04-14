import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'adminadmin',
      database: 'f-card-db',
      entities: [User, Role],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule {}
