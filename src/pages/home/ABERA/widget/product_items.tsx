import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "zmp-ui";
import { DataItem } from "../../../../core/model/home/item_data_home";
import { setEleventPage, setItemCart } from "../../../../core/hook/state_home";
import {
  IDWEB,
  img_product_large,
  img_url,
  numberWithComma,
} from "../../../../core/constant/constant";
import Drawer from "@mui/material/Drawer";
import SliderCart from "../../../../components/slider_cart";
import {
  saveDataToLocalStorage,
  saveNameDetail,
} from "../../../../core/db/db_storage";

interface Props {
  e: DataItem;
  index: number;
}
interface IconProduct {
  id: number;
  title: string;
  className: string;
  svg_name: string;
  use_svg: string;
}
const ProductItems: React.FC<Props> = ({ e, index }) => {
  // navigate
  const navigate = useNavigate();

  // setState
  const [item, setItem] = useRecoilState(setItemCart);
  const [idActive, setIdActives] = useRecoilState(setEleventPage);

  const [state, setState] = useState({
    right: false, // Giá trị khởi tạo của anchor "left"
    // Khác anchor nếu cần thiết
  });

  // Hàm xử lý sự kiện khi nhấp vào nút để mở/khóa Drawer
  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  // handle open
  const handleOpenDrawer = () => {
    setState({ ...state, right: true });
  };

  // phần trăm giảm giá
  const per_discount = Math.round(100 - (e.priceDrop / e.price) * 100);

  // get data map icon product
  const iconProduct: IconProduct[] = [
    // {
    //   id: 1,
    //   title: "Thêm giỏ hàng",
    //   className:
    //     "add-to-cart ml-auto d-flex align-items-center justify-content-center text-secondary bg-white hover-white bg-hover-secondary w-48px h-48px rounded-circle mb-2",
    //   svg_name: "icon icon-shopping-bag-open-light fs-24",
    //   use_svg: "#icon-shopping-bag-open-light",
    // }, > tạm ẩn đợi xử lí
    {
      id: 2,
      title: "Xem chi tiết sản phẩm",
      className:
        "add-to-cart ml-auto d-flex align-items-center justify-content-center text-secondary bg-white hover-white bg-hover-secondary w-48px h-48px rounded-circle mb-2",
      svg_name: "icon icon-eye-light fs-24",
      use_svg: "#icon-eye-light",
    },
  ];

  // handle next page detail
  function hanldeNextPageDetail(
    nameDetail: string,
    idDetail: number,
    link: string
  ) {
    navigate("/index_detail");
    setIdActives(idDetail);
    saveNameDetail(nameDetail, idDetail, link);
    window.scrollTo(0, 0);
  }

  // handle get cart
  function handleGetCart(
    id: number,
    qty: number,
    name: string,
    priceDrop: number,
    img: string,
    url: string
  ) {
    saveDataToLocalStorage(id, qty, name, priceDrop, img, url);
    setItem((prevItem) => !prevItem);
  }

  return (
    <div
      key={index}
      className="col-md-4 col-sm-6 mb-3 w-800 fadeInLeft animated"
    >
      {
        <div className="card border-0 product" key={index}>
          <div className="position-relative" key={`div-item-${index}`}>
            <img
              className="img-br-6"
              src={img_url + IDWEB + img_product_large + e.images}
              alt="Facial cleanser"
            />
            <div
              className="card-img-overlay d-flex p-3"
              onClick={() => hanldeNextPageDetail(e.name, e.id, e.link!)}
            >
              <div>
                {per_discount === 0 ||
                isNaN(per_discount) ||
                per_discount === 100 ? (
                  <></>
                ) : (
                  <span className="badge badge-primary">{per_discount}%</span>
                )}
              </div>
              <div className="my-auto w-100 content-change-vertical">
                {iconProduct.map((item: IconProduct, index: number) => (
                  <a
                    data-toggle="tooltip"
                    data-placement="left"
                    title={item.title}
                    key={`icon-product-${index}-${index}`}
                    className={item.className}
                  >
                    {item.id === 2 ? (
                      <span data-toggle="modal" data-target="#quick-view">
                        <svg
                          className={item.svg_name}
                          onClick={() =>
                            hanldeNextPageDetail(e.name, e.id, e.link!)
                          }
                        >
                          <use xlinkHref={item.use_svg} />
                        </svg>
                      </span>
                    ) : (
                      <React.Fragment key={"right"}>
                        <svg
                          className={item.svg_name}
                          onClick={(value) => {
                            value.stopPropagation();
                            handleGetCart(
                              e.id,
                              1,
                              e.name,
                              e.priceDrop === 0 ? e.price : e.priceDrop,
                              e.images!,
                              e.link!
                            );
                            handleOpenDrawer();
                          }}
                        >
                          <use xlinkHref={item.use_svg} />
                        </svg>
                        <Drawer
                          anchor={"right"}
                          open={state["right"]}
                          onClose={toggleDrawer("right", false)}
                        >
                          <div
                            style={{
                              width: "290px",
                            }}
                          >
                            <SliderCart
                              onClose={toggleDrawer("right", false)}
                            />
                          </div>
                        </Drawer>
                      </React.Fragment>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            className="card-body px-0 pt-4 text-center"
            key={`card-body-${index}`}
          >
            <h2 className="fs-15 font-weight-500">
              <a onClick={() => hanldeNextPageDetail(e.name, e.id, e.link!)}>
                {e.name}
              </a>
            </h2>
            {e.priceDrop === 0 ? (
              <p className="card-text font-weight-bold fs-16 mb-1 text-secondary">
                <span>{numberWithComma(e.price)}</span>
              </p>
            ) : (
              <p className="card-text font-weight-bold fs-16 mb-1 text-secondary">
                <span>{numberWithComma(e.priceDrop)}</span>
                <span className="fs-13 font-weight-500 text-decoration-through text-body pl-1 text_line_through">
                  {numberWithComma(e.price)}
                </span>
              </p>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default ProductItems;
