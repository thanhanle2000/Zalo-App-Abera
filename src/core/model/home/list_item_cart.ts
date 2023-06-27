export interface LstDataItem {
  data: DataItem;
  success: boolean;
}

export interface DataItem {
  lstProds: LstProd[];
  typeShow: number;
  priceNeedToDiscount: number;
  priceNeedToShipFree: number;
  voucherEndDate: string;
  provName: string;
  cityName: string;
  areaName: string;
  isAllowPromotion: boolean;
  isHideShip: boolean;
  websiteId: number;
  voucherCode: string;
  projectId: number;
  totalQuanlity: number;
  totalPrice: number;
  orderDiscount: number;
  orderDiscountPercent: number;
  voucherDiscountPercent: number;
  totalDiscount: number;
  totalDiscountPercent: number;
  shipPrice: number;
  totalPayment: number;
  orderType: number;
  proDiscountOrderId: number;
  proDiscountVoucherId: number;
  provId: number;
  cityId: number;
  areaId: number;
  statusPrivate: number;
  id: number;
  status: number;
  createdAt: string;
}

export interface LstProd {
  addressId: number;
  typeAction: number;
  isAllowUpGift: boolean;
  isProperties: boolean;
  promotionId: number;
  promotionName?: string;
  isPromotion: boolean;
  mainWebsiteName: string;
  domainName: string;
  productParentCode: string;
  priceView: number;
  lstProdsGift: any[];
  websiteId: number;
  id: number;
  orderId: number;
  productId: number;
  parentGiftId: number;
  productName: string;
  images: string;
  link: string;
  price: number;
  priceDrop: number;
  quanlity: number;
  total: number;
  portalCode: number;
  refId: number;
  productType: number;
  productNameSys: string;
}
