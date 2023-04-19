import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiPath, CardApiPath } from 'src/common/enums/enums';

@Controller(ApiPath.CARDS)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  getAll() {
    return this.cardsService.getAll();
  }

  @Get(CardApiPath.$ID)
  getById(@Param('id') id: number) {
    return this.cardsService.getById(id);
  }

  @Delete(CardApiPath.$ID)
  remove(@Param('id') id: number) {
    return this.cardsService.remove(id);
  }
}
