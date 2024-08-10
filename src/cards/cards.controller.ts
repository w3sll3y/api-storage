import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.cardsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.cardsService.findOne(+id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.cardsService.remove(+id, user.id);
  }
}
