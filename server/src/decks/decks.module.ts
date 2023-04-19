import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { Deck } from './entities/deck.entity';
import { Card } from 'src/cards/entities/card.entity';
// import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Card])],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService],
})
export class DecksModule {}
