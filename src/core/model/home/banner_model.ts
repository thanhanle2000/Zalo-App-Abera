export interface ListBannerModel {
  data: BannerModel[];
  total: number;
  success: boolean;
}

export interface BannerModel {
  guidId: string;
  parentGuidId: string;
  parentLevel: number;
  id: number;
  sortBy: number;
  name: string;
  images: string;
  sumary: string;
  link: string;
  type: number;
  isSync: boolean;
}
