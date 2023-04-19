import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private decksRepository: Repository<Deck>,
  ) {}

  async create(createDeckDto: CreateDeckDto): Promise<Deck> {
    const deck = this.decksRepository.create(createDeckDto);
    return await this.decksRepository.save(deck);
  }

  getAll(): Promise<Deck[]> {
    return this.decksRepository.find({
      relations: { cards: true },
    });
  }

  async getById(id: number): Promise<Deck> {
    const deck = await this.decksRepository.findOneBy({ id });
    if (!deck) throw new HttpException('Deck not found.', HttpStatus.NOT_FOUND);
    return deck;
  }

  async getDeckCards(id: number): Promise<Deck> {
    const deckWithCards = await this.decksRepository.findOne({
      relations: { cards: true },
      where: [{ id }],
    });
    if (!deckWithCards)
      throw new HttpException(
        'Deck with cards not found.',
        HttpStatus.NOT_FOUND,
      );
    return deckWithCards;
  }

  update(id: number, updateDeckDto: UpdateDeckDto) {
    return `This action updates a #${id} cardCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardCollection`;
  }
}
