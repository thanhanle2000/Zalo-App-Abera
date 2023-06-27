export interface DetailItemModel {
  data: DetailItem;
  success: boolean;
}

export interface DetailItem {
  refId: number;
  description: string;
  numberBuyer: number;
  nameTrademark: string;
  isProperties: boolean;
  images_second: string;
  price: number;
  priceDrop: number;
  numberRate: number;
  numberStar: number;
  isStock: boolean;
  parentLevel: number;
  id: number;
  sortBy: number;
  name: string;
  images: string;
  sumary: string;
  type: number;
  isSync: boolean;
}
