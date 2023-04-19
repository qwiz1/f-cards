import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { ApiPath, DeckApiPath } from 'src/common/enums/enums';

@Controller(ApiPath.DECKS)
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  create(@Body() createDeckDto: CreateDeckDto) {
    return this.decksService.create(createDeckDto);
  }

  @Get()
  getAll() {
    return this.decksService.getAll();
  }

  @Get(DeckApiPath.$ID)
  getById(@Param('id') id: number) {
    return this.decksService.getById(id);
  }

  @Get(`${DeckApiPath.$ID}${DeckApiPath.CARDS}`)
  getDeckCards(@Param('id') id: number) {
    return this.decksService.getDeckCards(id);
  }

  @Patch(DeckApiPath.$ID)
  update(@Param('id') id: number, @Body() updateDeckDto: UpdateDeckDto) {
    return this.decksService.update(id, updateDeckDto);
  }

  @Delete(DeckApiPath.$ID)
  remove(@Param('id') id: number) {
    return this.decksService.remove(id);
  }
}
