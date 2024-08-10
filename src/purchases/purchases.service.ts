import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPurchaseDto: CreatePurchaseDto, userId: number) {
    const newPurchase = await this.prisma.purchases.create({
      data: {
        total: createPurchaseDto.total,
        user: {
          connect: { id: userId }
        },
        items: {
          create: [
            ...createPurchaseDto.items
          ],
        },
      },
    });

    const newCard = await this.prisma.cards.create({
      data: {
        user: {
          connect: { id: userId }
        },
        name: createPurchaseDto.name,
        number: createPurchaseDto.number,
        dueDate: createPurchaseDto.dueDate,
        code: createPurchaseDto.code,
        createdBy: String(userId)
      },
    });

    return {
      ...newPurchase,
      newCard
    };
  }

  findAll(createdby: number) {
    return this.prisma.purchases.findMany({
      where: {
        userId: createdby,
      }
    });
  }

  async findOne(id: number, userId: number) {
    const data = await this.prisma.purchases.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
      },
    });

    if (data === null) {
      throw new NotFoundException('Compra nao encontrada')
    }


    return data
  }
}
