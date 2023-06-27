import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "zmp-ui";
import {
  IDWEB,
  convertPhoneNumber,
  img_product_small,
  img_url,
  numberWithComma,
} from "../../../core/constant/constant";
import { setDataOrderSuccess } from "../../../core/hook/state_home";
import { LstProd } from "../../../core/model/home/list_item_cart";
import axios from "axios";
import { saveNameCate } from "../../../core/db/db_storage";

const OrderSuccess = () => {
  // navigate
  const navigate = useNavigate();

  // get data recoil
  const data = useRecoilValue(setDataOrderSuccess);

  // setState
  const [loading, setLoading] = useState(true); // State để kiểm soát hiển thị loading
  const [total, setTotal] = useState(0);
  const [shipPrice, setShipPrice] = useState(0);

  // lấy giá trị data từ local
  const [dataListItem, setDataListItem] = useState<LstProd[]>();
  const dataObSuc = JSON.parse(
    localStorage.getItem("saveObOrderSuccess") ?? "{}"
  );

  // useEffect
  useEffect(() => {
    const fetchCartItems = () => {
      // Simulate an asynchronous API call to fetch cart items
      setTimeout(() => {
        SendNotiOrderSucces(
          data.formData.name,
          data.order_strack === undefined || data.order_strack === 0
            ? dataObSuc.id_strack
            : data.order_strack,
          convertPhoneNumber(data.formData.phone), // chuyển đổi phone: 84
          numberWithComma(data.total), // tổng giá sản phẩm
          "COD", // style stransaction
          data.access_token === undefined || data.access_token === ""
            ? dataObSuc.token
            : data.access_token
        );
        setDataListItem(data.data);
        setTotal(data.total);
        setShipPrice(data.ship_Price);
        setLoading(false); // Khi dữ liệu đã được tải, ẩn loading
      }, 1000); // Giả định thời gian tải dữ liệu là 1 giây
    };
    fetchCartItems();
  }, []);

  // test noti zalo
  const SendNotiOrderSucces = async (
    name: string,
    order: number,
    phone: string,
    price: string,
    payment_status: string,
    token: string
  ) => {
    const headers = {
      access_token: token,
    };
    const param = {
      // mode: "development",
      phone: phone,
      template_id: "263114",
      template_data: {
        customer_name: name,
        order_code: order,
        payment_status: payment_status,
        cost: price,
        note: "Đơn COD",
      },
    };

    try {
      const response = await axios.post(
        "https://business.openapi.zalo.me/message/template",
        param,
        { headers: headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // next page all product
  function handleNextPage(name: string, id: number, type: number) {
    let link = "";
    let navi = "";
    if (type === 1) {
      link = "san-pham";
      navi = "/index_product_all";
    } else if (type === 2) {
      link = "/";
      navi = "/";
    }
    navigate(navi);
    saveNameCate(name, id, link);
    window.scrollTo(0, 0);
  }

  // Khai báo ref
  const imgRef = useRef<HTMLImageElement | null>(null);

  // useEffect
  useEffect(() => {
    if (imgRef.current) {
      const imageHeight = imgRef.current.offsetHeight; // Chiều cao của hình ảnh
      const contentTopOffset =
        imgRef.current.getBoundingClientRect().top + window.pageYOffset + 160; // Vị trí cần scroll tới
      setTimeout(() => {
        window.scrollTo({ top: contentTopOffset, behavior: "smooth" });
      }, 100); // Đợi 100ms trước khi cuộn
    }
  }, []);

  return (
    <div className="or-suc-page">
      <img
        ref={imgRef}
        className="m-b-10 m-width-80 h-img-225"
        src={
          "https://gregoryonlinestores.com/wp-content/uploads/2023/03/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
        }
        alt="Animated GIF"
      />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <div
            //className="box-shopcart box-shadow-down"
            className="m-b-10"
          >
            <h4 className="title-or-suc">Đặt Hàng Thành Công</h4>
            <div className="box-shopcart-title-suc">
              <span>Thông Tin Đơn Hàng</span>
              <div className="r-suc">
                <div className="title-suc-item">Mã đơn:</div>
                <div className="p-suc-item">
                  #
                  {data.order_strack === undefined || data.order_strack === 0
                    ? dataObSuc.id_strack
                    : data.order_strack}
                </div>
              </div>
              <div className="r-suc">
                <div className="title-suc-item">Ngày đặt hàng:</div>
                <div className="p-suc-item">{data.date_order}</div>
              </div>
              {data.formData.email === "" ? null : (
                <div className="r-suc">
                  <div className="title-suc-item">Email:</div>
                  <div className="p-suc-item">{data.formData.email}</div>
                </div>
              )}
              <div className="r-suc">
                <div className="title-suc-item">Họ tên:</div>
                <div className="p-suc-item">{data.formData.name}</div>
              </div>
              <div className="r-suc">
                <div className="title-suc-item">Số điện thoại:</div>
                <div className="p-suc-item">{data.formData.phone}</div>
              </div>
              <div className="r-suc">
                <div className="title-suc-item w-70">Địa chỉ:</div>
                <div className="p-suc-item">{data.formData.address}</div>
              </div>
              {data.formData.note === "" ? null : (
                <div className="r-suc">
                  <div className="title-suc-item">Ghi chú:</div>
                  <div className="p-suc-item">
                    {data.formData.note === ""
                      ? "Đơn hàng được phép đồng kiểm."
                      : data.formData.note}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="box-shopcart">
            <div className="box-shopcart-title-suc">
              <span>Giỏ Hàng</span>
              {dataListItem?.map((e: LstProd, index: number) => (
                <div className="content-trust-item" key={index}>
                  <div className="row-cart">
                    <div className="row-cofirm-cart">
                      <div className="img-item-cart">
                        <img
                          className="img-br-6"
                          src={img_url + IDWEB + img_product_small + e.images}
                        />
                      </div>
                    </div>
                    <div className="col-n-cart p-l-4">
                      <div className="row-infor-name">
                        <div key={index} className="name-product">
                          {e.productName}
                        </div>
                      </div>
                      <div className="row-suc-cart">
                        <div className="p-infor">{e.quanlity}</div>
                        <div className="p-infor">
                          <span>x</span>
                          {numberWithComma(
                            e.priceDrop === 0 ? e.price : e.priceDrop
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="r-suc">
                <div className="title-suc-item">Tạm tính:</div>
                <div className="p-suc-item">{numberWithComma(total)}</div>
              </div>
              <div className="r-suc">
                <div className="title-suc-item">Phí vận chuyển:</div>
                {shipPrice === 0 ? (
                  <div className="p-suc-item">Miễn phí</div>
                ) : (
                  <div className="p-suc-item">{numberWithComma(shipPrice)}</div>
                )}
              </div>
              <div className="line-p m-t-8"></div>
              <div className="r-suc">
                <div className="p-suc-item f-s-18">Thành tiền:</div>
                <div className="p-suc-item f-s-18">
                  {numberWithComma(total)}
                </div>
              </div>
            </div>
          </div>
          <div className="row-infor-name m-t-l-r-15 m-b-20 m-t-30">
            <button
              className="btn btn-next-product "
              onClick={() => handleNextPage("", 0, 2)}
            >
              Trang Chủ
            </button>
            <button
              className="btn btn-confirm-address"
              onClick={() => handleNextPage("", 0, 1)}
            >
              Mua Tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
