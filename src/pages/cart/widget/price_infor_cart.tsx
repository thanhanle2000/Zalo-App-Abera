import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "zmp-ui";
import {
  IDWEB,
  img_product_small,
  img_url,
  numberWithComma,
} from "../../../core/constant/constant";
import { setItemCart } from "../../../core/hook/state_home";
import { LstProd } from "../../../core/model/home/list_item_cart";
import { saveNameDetail } from "../../../core/db/db_storage";

interface Props {
  data: LstProd;
  index: number;
  handleRemove: () => void;
}
const PriceInforCart: React.FC<Props> = ({ data, index, handleRemove }) => {
  // navigate
  const navigate = useNavigate();

  // setState
  const [item, setItem] = useRecoilState(setItemCart);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);

  // xử lí sự kiện cập nhật qty
  const handleQuantityChange = (id: number, value: number) => {
    if (value < 1 || value === 0 || isNaN(value)) {
      setError("Số lượng sản phẩm phải lớn hơn 1");
      return;
    } else if (value > 99) {
      setError("Số lượng sản phẩm phải nhỏ hơn 100");
      return;
    } else {
      const newCartItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      const itemIndex = newCartItems.findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        newCartItems[itemIndex].qty = value;
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        setQuantity(value);
        setItem((prevItem) => !prevItem);
        setError("");
      }
    }
  };

  // useEffect
  useEffect(() => {
    setQuantity(data.quanlity);
  }, [data.quanlity]);

  // xử lí sự kiện enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleQuantityChange(data.productId, parseInt(event.currentTarget.value));
    }
  };

  // handle next page detail
  function hanldeNextPageDetail(
    nameDetail: string,
    idDetail: number,
    link: string
  ) {
    navigate("/index_detail");
    saveNameDetail(nameDetail, idDetail, link);
    window.scrollTo(0, 0);
  }

  return (
    <div className="content-trust-item" key={index}>
      <div className="row-cart">
        <div className="row-cofirm-cart">
          <div className="img-item-cart">
            <img
              className="img-br-6"
              src={img_url + IDWEB + img_product_small + data.images}
            />
          </div>
        </div>
        <div className="col-n-cart p-l-8">
          <div className="row-infor-name">
            <div
              key={index}
              className="name-product"
              onClick={() =>
                hanldeNextPageDetail(
                  data.productName,
                  data.productId,
                  data.link
                )
              }
            >
              {data.productName}
            </div>
            <div onClick={handleRemove}>
              <CloseIcon className="icon-remove-cart" />
            </div>
          </div>
          <div className="row-infor-cart">
            <div className="r-i">
              <input
                type="number"
                className={
                  error
                    ? "dd form-control-error input-sm"
                    : "dd form-control input-sm"
                }
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                onKeyDown={handleKeyDown}
                onBlur={(e) =>
                  handleQuantityChange(
                    data.productId,
                    parseInt(e.currentTarget.value)
                  )
                }
              />
              <div className="p-infor">
                x{" "}
                {numberWithComma(
                  data.priceDrop === 0 ? data.price : data.priceDrop
                )}
              </div>
            </div>
            <div className="p-r-flex">
              <div></div>
              <div className="p-infor-total">{numberWithComma(data.total)}</div>
            </div>
          </div>
          {data.priceDrop === 0 ?? (
            <div className="price-confirm-cart">
              {numberWithComma(data.price)}
            </div>
          )}
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default PriceInforCart;
