import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {

  constructor(private readonly prisma: PrismaService) { }

  async findAll(userId: number) {
    const cards = await this.prisma.cards.findMany({
      where: { userId }
    })

    return cards
  }

  async findOne(id: number, userId: number) {
    const data = await this.prisma.cards.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (data === null) {
      throw new NotFoundException('Cartao nao encontrado')
    }
    return data
  }

  async remove(id: number, userId: number) {
    const cardExists = await this.prisma.cards.findUnique({
      where: {
        id,
      }
    })

    if (!cardExists) {
      throw new NotFoundException('List Not Found')
    }

    if (cardExists.userId !== userId) {
      throw new NotFoundException('List Not Found')
    }

    return await this.prisma.cards.delete({
      where: {
        id
      }
    })
  }
}
