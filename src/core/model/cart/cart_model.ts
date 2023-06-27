export interface AddressModel {
  email: string;
  name: string;
  phone: string;
  address: string;
  note: string;
}

export interface ObOrderSuccess {
  data: any[]; // Kiểu dữ liệu thích hợp cho data
  total: number;
  ship_Price: number;
  id_Zalo: any;
  access_token: string;
  order_strack: number;
  date_order: any;
  formData: {
    email: string;
    name: string;
    phone: string;
    address: string;
    note: string;
  };
}
