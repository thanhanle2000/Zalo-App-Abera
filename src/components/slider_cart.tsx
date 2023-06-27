import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "zmp-ui";
import {
  img_url,
  IDWEB,
  img_product_small,
  numberWithComma,
} from "../core/constant/constant";
import {
  setItemCart,
  getItemCart,
  setEleventPage,
} from "../core/hook/state_home";
import { ItemCartsModels } from "../core/model/home/item_cart";
import { removeCartItem, saveNameDetail } from "../core/db/db_storage";

interface Props {
  onClose: () => void;
}
const SliderCart: React.FC<Props> = ({ onClose }) => {
  // navigate
  const navigate = useNavigate();

  // lấy giá trị data từ local
  const [dataListItem, SetDataListItem] = useState<ItemCartsModels[]>(() => {
    const storedTodos = localStorage.getItem("cartItems");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const lstCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

  // sum
  let sum = dataListItem.reduce(function (
    prev: number,
    current: { qty: string | number }
  ) {
    return prev + +current.qty;
  },
  0);

  // lấy tổng tiền
  let total = dataListItem.reduce(function (prev: number, current: any) {
    const price = parseFloat(current.priceDrop);
    const qty = parseFloat(current.qty);
    if (!isNaN(price) && !isNaN(qty)) {
      return prev + price * qty;
    } else {
      return prev;
    }
  }, 0);

  // setState
  const [id, setId] = useState(0);
  const [item, setItem] = useRecoilState(setItemCart);
  const [idActive, setIdActive] = useRecoilState(setEleventPage);
  // get change data recoil
  const data = useRecoilValue(getItemCart);

  // khởi tạo giá trị thay đổi theo storage
  useEffect(() => {
    SetDataListItem(lstCart);
  }, [data, id]);

  // handle remove cart
  function handleRemoveCart(id: number) {
    removeCartItem(id);
    setId(id);
    setItem((prevItem) => !prevItem);
  }

  // handle next cart
  const handleNextCart = async () => {
    onClose();
    setTimeout(() => {
      navigate("/index_cart");
      window.scrollTo(0, 0);
    }, 100);
  };

  // handle next page detail
  const hanldeNextPageDetail = async (
    nameDetail: string,
    idDetail: number,
    link: string
  ) => {
    onClose();
    setTimeout(() => {
      navigate("/index_detail");
      setIdActive(idDetail);
      saveNameDetail(nameDetail, idDetail, link);
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <div className="bg-white">
      <div className="canvas-overlay-cart canvas-close"></div>
      <div className="tittle-trust">Sản phẩm trong giỏ hàng: {sum}</div>
      {sum === 0 ? (
        <div className="alert alert-danger">Không có sản phẩm nào!</div>
      ) : (
        <>
          {dataListItem.map((e: ItemCartsModels, index: number) => (
            <div className="content-trust-item" key={`cart-item-${index}`}>
              <div className="row-cart-silder-price">
                <div className="img-item-cart">
                  <img
                    className="img-br-6"
                    src={img_url + IDWEB + img_product_small + e.img}
                  />
                </div>
                <div className="col-cart">
                  <div className="row-infor-name">
                    <div
                      className="name-item-cart"
                      onClick={() => hanldeNextPageDetail(e.name, e.id, e.url)}
                    >
                      {e.name}
                    </div>
                    <div onClick={() => handleRemoveCart(e.id)}>
                      <CloseIcon className="icon-remove-cart" />
                    </div>
                  </div>
                  <div className="row-cart-silder-price">
                    <div className="r-item-slider">
                      <div className="price-item-total">{e.qty}</div>
                      <div className="price-item-cart p-l-3">
                        x {numberWithComma(e.priceDrop)}
                      </div>
                    </div>
                    <div className="price-item-total">
                      {numberWithComma(e.qty * e.priceDrop)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="all-monney">
            <div className="row-price">
              <div className="total-name">Tổng cộng:</div>
              <div className="total-price">{numberWithComma(total)}</div>
            </div>
          </div>
          <div className="btn-next-cart" onClick={() => handleNextCart()}>
            Xem Giỏ Hàng
          </div>
        </>
      )}
    </div>
  );
};
export default SliderCart;
