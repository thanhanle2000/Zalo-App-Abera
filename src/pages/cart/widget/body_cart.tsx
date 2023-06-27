import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadingModal from "../../../components/loading_modal";
import {
  URL_Web,
  cart_url,
  domain_abera,
  numberWithComma,
} from "../../../core/constant/constant";
import { removeCartItem } from "../../../core/db/db_storage";
import {
  getItemCart,
  getStatusClearCart,
  setItemCart,
} from "../../../core/hook/state_home";
import { LstDataItem, LstProd } from "../../../core/model/home/list_item_cart";
import {
  AddressCart,
  PriceInforCart,
} from "../../../path/page/cart/widget_cart";

const BodyCart = () => {
  // setState
  const [id, setId] = useState(0);
  const [item, setItem] = useRecoilState(setItemCart);
  const [inputValue, setInputValue] = useState("");
  const [lstData, setLstData] = useState<LstDataItem>();
  const [isLoading, setIsLoading] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [isAc, setIsAc] = useState(false);
  const [hideShopCart, setHideShopCart] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // get data recoil
  const data = useRecoilValue(getItemCart);
  const status = useRecoilValue(getStatusClearCart);

  // get data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const datas = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const selectedItems = datas.map((e: any) => {
        const id = e.id;
        const qty = e.qty;
        return { id, qty };
      });
      const param = {
        voucherCode: inputValue,
        provId: 0,
        cityId: 0,
        areaId: 0,
        lstProds: selectedItems,
      };
      const data = await axios.post(
        URL_Web + cart_url + "GetDataShopCarts?domainName=" + domain_abera,
        param
      );
      setIsLoading(false);
      setLstData(data.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  // gán value
  const itemCart = lstData?.data.lstProds;

  // useEffect
  useEffect(() => {
    fetchData();
  }, [status === true ? null : data]);

  // handle remove cart
  function handleRemoveCart(id: number) {
    removeCartItem(id);
    setId(id);
    setItem((prevItem) => !prevItem);
  }

  // get value input code
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  // handle submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      // Nếu người dùng nhập giá trị rỗng, đặt trạng thái lỗi thành true
      setInputError(true);
      return;
    }

    // Đặt trạng thái lỗi về false và xử lý tiếp theo
    setInputError(false);
    setInputValue(""); // Đặt lại giá trị trường nhập liệu về rỗng
  };

  // handle input change
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    setInputError(false); // Đặt trạng thái lỗi về false khi người dùng thay đổi giá trị
  };

  // useEffect
  useEffect(() => {
    if (isAc) {
      // Lấy chiều cao của phần tử #panel khi nó hiện lên
      const panelElement = panelRef.current;
      if (panelElement) {
        const height = panelElement.scrollHeight;
        setPanelHeight(height);
      }
    } else {
      // Reset giá trị max-height khi #panel không hiển thị
      setPanelHeight(0);
    }
  }, [isAc]);

  // handle toggle panel
  const handleTogglePanel = () => {
    setIsAc(!isAc);
  };

  return (
    <>
      {isLoading ? (
        <LoadingModal />
      ) : lstData?.data.totalQuanlity === 0 ? (
        <div className="alert alert-danger">Không có sản phẩm nào?</div>
      ) : (
        <div>
          <div className="r-order-sum" onClick={handleTogglePanel}>
            <div className="row-hot">
              <AssignmentIcon className="i-order-sum m-t-4" />
              <div className="title-order-sum">
                {!isAc ? "Hiển thị tóm tắt đơn hàng" : "Ẩn tóm tắt đơn hàng"}
              </div>
              {isAc === true ? (
                <KeyboardArrowUpIcon className="i-order-sum m-t-4" />
              ) : (
                <KeyboardArrowDownIcon className="i-order-sum m-t-4" />
              )}
            </div>
            <div className="number-t-or-sum">
              {numberWithComma(lstData?.data?.totalPayment)}
            </div>
          </div>
          <div className="col-lg-5 pb-lg-0 order-lg-last m-b-30">
            <div
              id="panel"
              className={isAc ? "open" : ""}
              style={{ maxHeight: panelHeight }}
              ref={panelRef}
            >
              <div className="box-shopcart m-g-t-13">
                <div className="box-shopcart-title">
                  <span>Giỏ hàng</span>
                </div>
                {itemCart?.map((e: LstProd, index: number) => (
                  <PriceInforCart
                    key={e.productId}
                    data={e}
                    index={index}
                    handleRemove={() => handleRemoveCart(e.productId)}
                  />
                ))}
                <div className="r-total">
                  <div className="title-price">Tạm tính:</div>
                  <div className="p-infor p-infor-6">
                    {numberWithComma(lstData?.data?.totalPrice)}
                  </div>
                </div>
                <div className="r-total">
                  <div className="title-price">Phí vận chuyển:</div>
                  {lstData?.data?.shipPrice === 0 ? (
                    <div className="p-infor">Miễn phí</div>
                  ) : (
                    <div className="p-infor">
                      {numberWithComma(lstData?.data?.shipPrice)}
                    </div>
                  )}
                </div>
                <div className="line-p m-t-8"></div>
                <div className="r-total m-t-b-15">
                  <div className="pay-title">Thành Tiền:</div>
                  <div className="pay-title">
                    {numberWithComma(lstData?.data?.totalPayment)}
                  </div>
                </div>
                <div className="pttt">
                  * Những sản phẩm khuyến mãi sẽ không được hỗ trợ giảm giá đơn
                  hàng.
                </div>
                <div className="pttt">
                  * Phương thức thanh toán: Nhận hàng & thanh toán tiền mặt tại
                  nhà.
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="box-voucher">
                  <div className="applycode">
                    <div className="col-error">
                      <input
                        className={`form-control ${inputError ? "error" : ""}`}
                        placeholder="Nhập mã giảm giá"
                        type="text"
                        name="code"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                      />
                      {inputError && (
                        <p className="error-message">
                          Vui lòng nhập mã giảm giá
                        </p>
                      )}
                    </div>
                    <button className="f-s-18 w-125" type="submit">
                      Áp dụng
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <AddressCart
              data={itemCart}
              total={lstData?.data?.totalPayment}
              ship_Price={lstData?.data?.shipPrice}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BodyCart;
