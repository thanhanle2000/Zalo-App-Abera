export interface ItemDataHomeModel {
  data: DataItem[];
  total: number;
  success: boolean;
}

export interface DataItem {
  images_second: string;
  price: number;
  priceDrop: number;
  numberRate: number;
  numberStar: number;
  isStock: boolean;
  guidId: string;
  parentGuidId: string;
  parentLevel: number;
  id: number;
  sortBy: number;
  name: string;
  type: number;
  isSync: boolean;
  sumary?: string;
  images?: string;
  link?: string;
}
