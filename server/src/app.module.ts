import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DecksModule } from './decks/decks.module';
import { CardsModule } from './cards/cards.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Card } from './cards/entities/card.entity';
import { Deck } from './decks/entities/deck.entity';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { RolesController } from './roles/roles.controller';
import { DecksController } from './decks/decks.controller';
import { LoggerMiddleware } from './middlewares/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Card, Deck],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CardsModule,
    DecksModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AuthController,
        UsersController,
        RolesController,
        DecksController,
      );
  }
}
