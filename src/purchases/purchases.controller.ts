import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) { }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto, @CurrentUser() user: User) {
    return this.purchasesService.create(createPurchaseDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.purchasesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.purchasesService.findOne(+id, user.id);
  }
}
