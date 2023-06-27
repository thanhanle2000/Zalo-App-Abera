import { atom, selector } from "recoil";
import { openWebview } from "zmp-sdk";
import { ObOrderSuccess } from "../model/cart/cart_model";

// set name cate
export const setNameCate = atom({
  key: "setNameCate",
  default: "",
});

// set type sort
export const setTypeSort = atom({
  key: "setTypeSort",
  default: "Product.id desc",
});

// get type sort
export const getTypeSort = selector({
  key: "getTypeSort",
  get: async ({ get }) => {
    return get(setTypeSort);
  },
});

// set name detail
export const setNameDetail = atom({
  key: "setNameDetail",
  default: "",
});

// set item
export const setItemCart = atom({
  key: "setItemCart",
  default: false,
});

// get item
export const getItemCart = selector({
  key: "getItemCart",
  get: async ({ get }) => {
    return get(setItemCart);
  },
});

// xử lí open webview
export const openUrlInWebview = async (url: string) => {
  try {
    await openWebview({
      url: url,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

// set state xử lí việc chuyển trang
export const setEleventPage = atom({ key: "setEleventPage", default: 0 });

// get state xử lí việc chuyển trang
export const getEleventPage = selector({
  key: "getEleventPage",
  get: async ({ get }) => {
    return get(setEleventPage);
  },
});

// set state snackbar
export const setStateSnack = atom({
  key: "setStateSnack",
  default: 0,
});

// get state snackbar
export const getStateSnack = selector({
  key: "getStateSnack",
  get: ({ get }) => get(setStateSnack),
});

const initialOrderSuccess: ObOrderSuccess = {
  data: [],
  total: 0,
  ship_Price: 0,
  id_Zalo: "",
  access_token: "",
  order_strack: 0,
  date_order: "",
  formData: {
    email: "",
    name: "",
    phone: "",
    address: "",
    note: "",
  },
};

// set dữ liệu cho order success
export const setDataOrderSuccess = atom<ObOrderSuccess>({
  key: "setDataOrderSuccess",
  default: initialOrderSuccess,
});

// get dữ liệu cho order success
export const getDataOrderSuccess = selector({
  key: "getDataOrderSuccess",
  get: async ({ get }) => {
    return get(setDataOrderSuccess);
  },
});

// set status update key search
export const checkStatusKey = atom({
  key: "checkStatusKey",
  default: false,
});

// get status update key search
export const getStatusKey = selector({
  key: "getStatusKey",
  get: async ({ get }) => {
    return get(checkStatusKey);
  },
});

// set key
export const setKeySearch = atom({
  key: "setKeySearch",
  default: "",
});

// get key
export const getKeySearch = selector({
  key: "getKeySearch",
  get: async ({ get }) => {
    return get(setKeySearch);
  },
});

// Atom lưu trữ imgSrc
export const imgSrcState = atom({
  key: "imgSrcState",
  default: "",
});

// Atom lưu trữ inforHome
export const inforHomeState = atom({
  key: "inforHomeState",
  default: null,
});

// kiểm tra status xóa giỏ hàng
export const setStatusClearCart = atom({
  key: "setStatusClearCart",
  default: false,
});

// lấy giá trị status clear cart
export const getStatusClearCart = selector({
  key: "getStatusClearCart",
  get: async ({ get }) => {
    return get(setStatusClearCart);
  },
});

// set status get api phone number
export const setStatusLoadApiPhoneNumber = atom({
  key: "setStatusLoadApiPhoneNumber",
  default: false,
});

// get status get api phone number
export const getStatusLoadApiPhoneNumber = selector({
  key: "getStatusLoadApiPhoneNumber",
  get: async ({ get }) => {
    return get(setStatusLoadApiPhoneNumber);
  },
});
