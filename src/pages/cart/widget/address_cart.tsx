import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "zmp-ui";
import {
  URL_Web,
  convertPhoneNumberVN,
  domain_abera,
  language_VN,
  url_abera,
} from "../../../core/constant/constant";
import {
  getStatusLoadApiPhoneNumber,
  setDataOrderSuccess,
  setItemCart,
  setStatusClearCart,
} from "../../../core/hook/state_home";
import img_order_cod from "../../../images/img_box/icon-order-cod.png";
import img_zalo_pay from "../../../images/img_box/logo-zalo-pay.png";
import {
  getNumberPhoneByUser,
  saveNameCate,
  saveObOrderSuccess,
} from "../../../core/db/db_storage";

interface Props {
  data: any;
  total: any;
  ship_Price: any;
}

interface OBPayment {
  id: number;
  img: string;
  name: string;
}
const AddressCart: React.FC<Props> = ({ data, total, ship_Price }) => {
  // get data formData local
  const dataForm = JSON.parse(localStorage.getItem("formData") ?? "{}");

  // navigate
  const navigate = useNavigate();

  // recoil
  const [lstData, setLstData] = useRecoilState(setDataOrderSuccess);
  const status_number_phone = useRecoilValue(getStatusLoadApiPhoneNumber);
  // lấy số điện thoại từ profile
  const number_phone = getNumberPhoneByUser();

  // setState
  const [formData, setFormData] = useState({
    email: dataForm.email ?? "",
    name: dataForm.name ?? "",
    phone:
      number_phone === "" || number_phone === undefined
        ? dataForm.phone
        : convertPhoneNumberVN(number_phone ?? ""),
    address: dataForm.address ?? "",
    note: dataForm.note ?? "",
  });
  const [isChecked, setIsChecked] = useState(true);
  const [formError, setFormError] = useState(false);
  const [status, setStatus] = useState(0);
  const [orderStrack, setOrderStrack] = useState(0);
  const [token, setToken] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(1);
  // recoil
  const [item, setItem] = useRecoilState(setItemCart);
  const [statusCart, setStatusCart] = useRecoilState(setStatusClearCart);

  // isFormData
  const isFormDataEmpty =
    formData.name === "" ||
    formData.phone === "" ||
    formData.address === "" ||
    number_phone === "";

  // chuyển đổi thời gian đặt hàng
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (tháng 0 là tháng 1)
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Định dạng lại chuỗi ngày giờ theo định dạng "30/05/2023 16:59"
  const formattedDateTime = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  // id_user_follow oa
  const storedId = localStorage.getItem("idUser");

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormDataEmpty) {
      setFormError(true);
    } else {
      try {
        // console.log(lstData);
        await submitOrderCart();
        handleClearCart();
        setStatusCart(false);
        setFormData({
          ...formData,
          email: formData.email === "" ? "" : formData.email,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          note: formData.note === "" ? "" : formData.note,
        });
        setLstData({
          data,
          total,
          ship_Price,
          id_Zalo: storedId,
          access_token: token,
          order_strack: orderStrack,
          date_order: formattedDateTime,
          formData: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            note: formData.note,
            address: formData.address,
          },
        });
        localStorage.setItem("formData", JSON.stringify(formData));
        setDataLoaded(true); // Đánh dấu là dữ liệu đã được nạp

        // Kiểm tra dữ liệu có giá trị và điều hướng tới "/order_success" nếu dataForm khác {} và đã được lưu trong localStorage
        const storedDataForm = JSON.parse(
          localStorage.getItem("formData") ?? "{}"
        );
        if (data && data.length > 0 && Object.keys(storedDataForm).length > 0) {
          navigate("/order_success");
        }
      } catch (e) {
        // Xử lý lỗi khi submitOrderCart() thất bại
        console.log(e);
      }
    }
  };

  const handleClearCart = () => {
    // Thực hiện xóa giỏ hàng
    // set lại data
    localStorage.removeItem("cartItems");
    setItem((prev) => !prev);
  };

  // handle đặt hàng
  const submitOrderCart = async () => {
    // chuyển đổi ck_cart
    const convertedArray = data.map((item: any) => ({
      id: item.productId,
      qty: item.quanlity,
    }));
    const jsonString = `[${convertedArray
      .map((item: any) => `{"id":${item.id},"qty":${item.qty}}`)
      .join(",")}]`;

    // Tạo lại đối tượng JSON với định dạng mới
    const arr_string = JSON.stringify(JSON.parse(jsonString));

    // gán giá trị cho ck_cart
    const ckShopCart = `{"lstProds":${arr_string}}`;

    // param data
    const param = {
      shoppingCartModel: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        note: formData.note === "" ? "Phòng công nghệ test đơn" : formData.note,
        codeLang: language_VN,
        priceNeedToDiscount: total,
        orderType: 1,
        idZalo: storedId,
      },
      _ckShopCart: ckShopCart,
      domainName: domain_abera,
      _cklinkUrl: url_abera,
      // domainName: "hvbike.com",
      // _cklinkUrl: "https://hvbike.com/",
    };
    // console.log(param);
    // response
    const respon = await axios.post(
      URL_Web + "ShopCartsMobile/OrderSubmit",
      param
    );

    saveObOrderSuccess(
      respon.data.statusCode,
      respon.data.id,
      respon.data.data[0],
      data
    );

    // gán giá trị cho useState
    if (respon.data) {
      setStatus(respon.data.statusCode);
      setOrderStrack(respon.data.id);
      setToken(respon.data.data[0]);
      setDataLoaded(true); // Đánh dấu là dữ liệu đã được nạp
      // Thực hiện các hành động khác với respon.data[0]
      handleClearCart();
    } else {
      // Xử lý trường hợp không có dữ liệu trong respon.data
      console.log("Không có dữ liệu");
    }
  };

  // next page all product
  function handleNextPage(name: string, id: number, link: string) {
    navigate("/index_product_all");
    saveNameCate(name, id, link);
    window.scrollTo(0, 0);
  }

  // Xử lý sự kiện khi thay đổi hình thức thanh toán
  const handlePaymentOptionChange = (id: number) => {
    setSelectedPaymentId(id);
  };

  // handle check box
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  // useEffect
  useEffect(() => {}, [lstData, status_number_phone]);
  useEffect(() => {
    if (list_payment.length > 0) {
      setSelectedPaymentId(list_payment[0].id); // Lấy ID đầu tiên
    }
  }, []); // Chỉ chạy một lần khi component được render lần đầu

  // list img payment
  const list_payment: OBPayment[] = [
    { id: 1, img: img_order_cod, name: "Thanh toán khi nhận hàng (COD)" },
    { id: 2, img: img_zalo_pay, name: "Ví điện tử ZaloPay" },
  ];

  // error
  const text_error = "Vui lòng nhập thông tin này!";

  return (
    <div>
      <div className="col-lg-7 order-lg-first form-control-01 m-13-p">
        <h4 className="fs-24 m-t-8">Địa chỉ nhận hàng</h4>
        <form onSubmit={handleSubmit}>
          {
            /* <div className="col-address">
          <label htmlFor="email" className="title-label">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="VD: abc@gmail.com"
            className={"form-control"}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div> */
            // tạm ẩn đi
          }
          <div className="col-address">
            <label htmlFor="name" className="title-label">
              HỌ TÊN (*)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${
                formError && formData.name === "" ? "form-control-error" : ""
              }`}
              placeholder="VD: Nguyễn Văn A"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {formError && formData.name === "" && (
              <span className="form-error-message">{text_error}</span>
            )}
          </div>
          <div className="col-address">
            <label htmlFor="phone" className="title-label">
              SỐ ĐIỆN THOẠI (*)
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={`form-control ${
                formError && formData.phone === "" ? "form-control-error" : ""
              }`}
              placeholder="VD: 0987654321"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {formError && formData.phone === "" && (
              <span className="form-error-message">{text_error}</span>
            )}
          </div>

          <div className="col-address">
            <label htmlFor="address" className="title-label">
              ĐỊA CHỈ (*)
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={`form-control ${
                formError && formData.address === "" ? "form-control-error" : ""
              }`}
              placeholder="VD: Số 255 Bình Lợi, P13, Q Bình Thạnh"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            {formError && formData.address === "" && (
              <span className="form-error-message">{text_error}</span>
            )}
          </div>
          <div className="col-address">
            <label htmlFor="note" className="title-label">
              GHI CHÚ
            </label>
            <input
              type="text"
              id="note"
              name="note"
              className="form-control"
              placeholder="VD: Giao hàng vào giờ hành chính"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>
          <div>
            <h4 className="fs-24 m-t-8">Hình thức thanh toán</h4>
            {list_payment.map((e) => (
              <div
                className="row-pay-order"
                key={e.id}
                onClick={() => handlePaymentOptionChange(e.id)}
              >
                <div
                  className="chkbox"
                  onClick={() => handlePaymentOptionChange(e.id)}
                >
                  <input
                    type="checkbox"
                    id={`checkbox_${e.id}`}
                    checked={selectedPaymentId === e.id}
                    onChange={() => handlePaymentOptionChange(e.id)}
                  />
                  <span className="check"></span>
                </div>
                <img src={e.img} className="img-order-cod" alt={e.name} />
                <div
                  className={
                    selectedPaymentId === e.id
                      ? "name-order-cod-actives"
                      : "name-order-cod"
                  }
                >
                  {e.name}
                </div>
              </div>
            ))}
          </div>
          <div className="m-t-20">
            <div className="checkbox-container m-t-8">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheck}
                className="checkbox"
                id="checkbox1"
              />
              <label htmlFor="checkbox1" className="checkbox-label">
                Tôi đồng ý với các chính sách và quy định mua hàng tại website.
              </label>
            </div>
            {/* <div className="checkbox-container">
          <input
            type="checkbox"
            defaultChecked={true}
            className="checkbox"
            id="checkbox2"
          />
          <label htmlFor="checkbox2" className="checkbox-label">
            Phương thức thanh toán: NHẬN HÀNG VÀ THANH TOÁN TẠI NHÀ !
          </label>
        </div> */}
          </div>
          <div className="row-infor-name r-w-116 m-t-20 col-lg-7 m-13-p">
            <button
              className="btn btn-next-product"
              onClick={() => handleNextPage("", 0, "san-pham")}
            >
              Mua Tiếp
            </button>
            <button type="submit" className="btn btn-confirm-address">
              Đặt Hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressCart;
