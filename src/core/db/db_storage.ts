// xóa all db
export const clearAllDB = () => {
  // Xóa session storage
  sessionStorage.clear();
  // Xóa local storage
  localStorage.clear();
};

// lưu giá trị name cate vào local
export const saveNameCate = (nameCate: string, id: number, link: string) => {
  localStorage.setItem("nameCate", JSON.stringify({ nameCate, id, link }));
};

// lấy giá trị cho name cate từ local
export const getDataNameCate = () => {
  const data = JSON.parse(localStorage.getItem("nameCate") || "{}");
  return data;
};

// lưu giá trị name detail blog
export const saveNameDetailBlog = (
  nameCate: string,
  id: number,
  link: string
) => {
  localStorage.setItem(
    "nameDetailBlog",
    JSON.stringify({ nameCate, id, link })
  );
};

// lấy giá trị name detail blog
export const getDataNameDetailBlog = () => {
  const data = JSON.parse(localStorage.getItem("nameDetailBlog") || "{}");
  return data;
};

// lưu tên detail
export const saveNameDetail = (
  nameDetail: string,
  idDetail: number,
  link: string
) => {
  localStorage.setItem(
    "nameDetail",
    JSON.stringify({ nameDetail, idDetail, link })
  );
};

// lưu sản phẩm vào giỏ hàng
export const saveDataToLocalStorage = (
  id: number,
  qty: number,
  name: string,
  priceDrop: number,
  img: string,
  url: string
) => {
  // Lấy danh sách giỏ hàng từ local storage
  const cartItemsStr = localStorage.getItem("cartItems");
  let cartItems: any = cartItemsStr ? JSON.parse(cartItemsStr) : [];

  // Kiểm tra xem id đã tồn tại trong danh sách giỏ hàng hay chưa
  const existingCartItem = cartItems.find((item: any) => item.id === id);
  if (existingCartItem) {
    // Nếu id đã tồn tại, cộng thêm vào qty
    existingCartItem.qty += qty;
  } else {
    // Nếu id chưa tồn tại, thêm vào danh sách giỏ hàng
    cartItems.push({ id, qty, name, priceDrop, img, url });
  }

  // Lưu danh sách giỏ hàng vào local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// xóa 1 sản phẩm trong danh sách
export const removeCartItem = (productIdToRemove: number): void => {
  // Lấy danh sách cartItems từ local storage
  const cartItemsStr = localStorage.getItem("cartItems");
  let cartItems: any = cartItemsStr ? JSON.parse(cartItemsStr) : [];

  // Tìm vị trí (index) của sản phẩm cần xóa trong mảng cartItems
  const index = cartItems.findIndex(
    (item: any) => item.id === productIdToRemove
  );

  // Kiểm tra xem sản phẩm có tồn tại trong danh sách cartItems hay không
  if (index !== -1) {
    // Sản phẩm được tìm thấy trong danh sách cartItems, tiến hành xóa
    cartItems.splice(index, 1);
  }

  // Lưu lại danh sách cartItems sau khi xóa vào local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// cập nhật lại qty sản phẩm thông qua idProduct
export const updateCartItemQty = (productId: number, newQty: number) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const updatedCartItems = cartItems.map(
    (item: { id: number; qty: number }) => {
      if (item.id === productId) {
        return { id: item.id, qty: newQty };
      }
      return item;
    }
  );
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};

// lưu ob order success
export const saveObOrderSuccess = (
  status_code: string,
  id_strack: number,
  token: string,
  data: any
) => {
  localStorage.setItem(
    "saveObOrderSuccess",
    JSON.stringify({ status_code, id_strack, token, data })
  );
};

// lưu token user trong phiên làm việc
export const saveAccessTokenZaloUser = (accessToken: any) => {
  sessionStorage.setItem("accessToken", accessToken);
};

// lấy token user trong phiên làm việc
export const getAccessTokenZaloUser = () => {
  return sessionStorage.getItem("accessToken");
};

// lưu trữ số điện thoại đã lấy từ profile
export const setPhoneNumberByUser = (phoneNumber: any) => {
  localStorage.setItem("numberPhoneUser", phoneNumber);
};

// lấy số điện thoại đã lấy từ profile
export const getNumberPhoneByUser = () => {
  return localStorage.getItem("numberPhoneUser");
};
