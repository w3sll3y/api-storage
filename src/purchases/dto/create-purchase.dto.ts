import { IsArray, IsNumber } from "class-validator";
import { Purchase } from "../entities/purchase.entity";
import { ItemList } from "../models/ItemList";

export class CreatePurchaseDto extends Purchase {
  @IsNumber()
  total: number;

  @IsArray()
  items?: ItemList[];
}
