export interface ListImageModel {
  data: ListImage[];
  total: number;
  success: boolean;
}

export interface ListImage {
  id: number;
  sortBy: number;
  name: string;
  images: string;
  type: number;
  isSync: boolean;
}
