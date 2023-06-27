export interface ListCateModel {
  data: CateModel[];
  total: number;
  success: boolean;
}

export interface CateModel {
  parentId: number;
  imagesBanner?: string;
  id: number;
  sortBy: number;
  name: string;
  images: string;
  link: string;
  type: number;
  isSync: boolean;
}
