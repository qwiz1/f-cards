import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const card = this.cardsRepository.create(createCardDto);
    return await this.cardsRepository.save(card);
  }

  getAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async getById(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) throw new HttpException('Card not found.', HttpStatus.NOT_FOUND);
    return card;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
