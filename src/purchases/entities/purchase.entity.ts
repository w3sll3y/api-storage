import { ItemList } from "../models/ItemList";

export class Purchase {
  id?: number;
  items?: ItemList[];
  total: number;
  userId?: number;
  user?: number;
}
