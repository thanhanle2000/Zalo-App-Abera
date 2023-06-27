export const URL_Web = "https://web.hvnet.vn/api/";
export const home_url = "homemobile/";
export const cart_url = "shopcartsmobile/";
export const product_url = "productsmobile/";
export const img_url = "https://web.hvnet.vn/uploads/img/";
export const idWeb_LitiGold = "14/";
export const img_product_large = "/products/large/";
export const img_product_small = "/products/small/";
export const img_productsimages_small = "/productsimages/small/";
export const img_productsimages_large = "/productsimages/large/";
export const img_header_large = "/headers/large/";
export const img_footer_large = "/footers/large/";
export const img_infor_homes_large = "/homes/large/";
export const img_options_large = "/imagesoptions/large/";

// IDWEB
export const LITIGOLD = "LITIGOLD";
export const ABERA = "ABERA";
export const IDWEB = 48; //ABERA
export const domain_abera = "abera.vn";
export const language_VN = "vi-VN";
export const url_abera = "https://abera.vn/";

// ID OA
export const ID_OA = "1489970259228213131";

// APP-PORTAL
export const Key_App = "VmVSCtgKUdsfC3d8Tv7C";

// convert -> price VND
export const numberWithComma = (x: any) => {
  if (!x) return "0";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(x);
};

// check isEmpty
export function isEmpty(val: string | any[] | null | undefined) {
  return val?.length === 0 ||
    val === undefined ||
    val == null ||
    val.length <= 0
    ? true
    : false;
}

// chuyển đổi date
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// chuyển đổi sdt
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return "";
  }

  const formattedPhoneNumber = phoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1 $2 $3"
  );
  return formattedPhoneNumber;
};

// chuyển đổi phone param
export const convertPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.startsWith("0")) {
    return "84" + phoneNumber.substr(1);
  }
  return phoneNumber;
};

// chuyển đổi rate
export function convertNumberToKFormat(number) {
  if (number >= 1000) {
    // Chia số cho 1000 để lấy phần nguyên và phần thập phân
    const quotient = number / 1000;
    const decimalPart = quotient % 1; // Lấy phần thập phân
    const roundedDecimal = Math.round(decimalPart * 10) / 10; // Làm tròn phần thập phân đến 1 chữ số
    const roundedNumber = Math.floor(quotient) + roundedDecimal; // Tổng hợp phần nguyên và phần thập phân đã làm tròn
    return `${roundedNumber}K `;
  }
  return number.toString();
}

// Định dạng số điện thoại mặc định
export function convertPhoneNumberVN(phoneNumber: any) {
  // Kiểm tra nếu số điện thoại đã có tiền tố "84"
  if (phoneNumber.startsWith("84")) {
    // Xóa tiền tố "84" và thêm tiền tố "0" vào số điện thoại
    return "0" + phoneNumber.slice(2);
  }
  return phoneNumber; // Trả về số điện thoại không thay đổi nếu không có tiền tố "84"
}
