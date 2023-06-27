import Drawer from "@mui/material/Drawer";
import parse from "html-react-parser";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  convertNumberToKFormat,
  numberWithComma,
} from "../../../core/constant/constant";
import { setItemCart } from "../../../core/hook/state_home";
import { SliderCart } from "../../../path/page/component";
import { AccordionCard } from "../../../path/page/detail/widget_detail";
import { saveDataToLocalStorage } from "../../../core/db/db_storage";

interface Props {
  data: any;
}
const InforDetial: React.FC<Props> = ({ data }) => {
  // setState
  const [number, setNumber] = useState(1);
  const [item, setItem] = useRecoilState(setItemCart);
  const [state, setState] = useState({
    right: false, // Giá trị khởi tạo của anchor "left"
    // Khác anchor nếu cần thiết
  });

  // Hàm xử lý sự kiện khi nhấp vào nút để mở/khóa Drawer
  const toggleDrawer = (anchor: any, open: any) => () => {
    setState({ ...state, [anchor]: open });
  };

  // Kiểm tra dữ liệu 'data' trước khi sử dụng
  if (!data) {
    return null;
  }

  // Phần trăm giảm giá
  const per_discount = Math.round(100 - (data.priceDrop / data.price) * 100);

  // handle increase
  function handleIncrease(number: number) {
    setNumber(number + 1);
  }

  // handle reduce
  function handleReduce(number: number) {
    if (number !== 1) {
      setNumber(number - 1);
    }
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

  const cardContents = [
    {
      id: 1,
      label: data.labelDescription ?? "",
      description: data.description ?? "",
    },
    {
      id: 2,
      label: data.labelInstruct ?? "",
      description: data.descriptionInstruct ?? "",
    },
    {
      id: 3,
      label: data.labelSpecifications ?? "",
      description: data.descriptionSpecifications ?? "",
    },
  ];

  return (
    <div className="col-md-6">
      <div>
        <h2 className="fs-24 mb-2">{data.name}</h2>
        {data.priceDrop === 0 || data.priceDrop === undefined ? (
          <p className="d-flex align-items-center mb-3">
            <span className="fs-18 text-secondary font-weight-bold">
              {numberWithComma(data.price)}
            </span>
            {per_discount === 0 ||
            per_discount === 100 ||
            isNaN(per_discount) ? null : (
              <span className="badge badge-primary fs-16 ml-4 font-weight-600 px-3">
                {per_discount}%
              </span>
            )}
          </p>
        ) : (
          <p className="d-flex align-items-center mb-3">
            <span className="text-line-through">
              {numberWithComma(data.price)}
            </span>
            <span className="fs-18 text-secondary font-weight-bold ml-3">
              {numberWithComma(data.priceDrop)}
            </span>
            {per_discount === 0 || isNaN(per_discount) ? null : (
              <span className="badge badge-primary fs-16 ml-4 font-weight-600 px-3">
                {per_discount}%
              </span>
            )}
          </p>
        )}
      </div>
      <div className="d-flex align-items-center flex-wrap mb-3 lh-12">
        <p className="mb-0 font-weight-600 text-secondary">{data.numberStar}</p>
        <ul className="list-inline d-flex mb-0 px-3 rating-result">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="list-inline-item fs-12 text-primary mr-0"
            >
              <i className="fas fa-star" />
            </li>
          ))}
        </ul>
        {data.numberRate === 0 ? null : (
          <a href="#" className="pl-3 border-left border-gray-2 text-body">
            {convertNumberToKFormat(data.numberRate)}
            lượt đánh giá
          </a>
        )}
      </div>
      <div>{parse(data.sumary ?? "")}</div>
      <p className="line-p"></p>
      <li className="row-item-infor mb-2">
        <span className="d-block col-4 col-lg-3 text-secondary font-weight-600 fs-14">
          Mã sản phẩm:
        </span>
        <span className="d-block col-7 col-lg-8">ABERA-{data.id}</span>
      </li>
      <li className="row-item-infor mb-2">
        <span className="d-block col-4 col-lg-3 text-secondary font-weight-600 fs-14">
          Số lượng:
        </span>
        <div className="row-item-cart">
          <div
            className={number === 1 ? "reduce-add" : "btn-add-number"}
            onClick={() => handleReduce(number)}
          >
            -
          </div>
          <div className="number-add">{number}</div>
          <div
            className="btn-add-number"
            onClick={() => handleIncrease(number)}
          >
            +
          </div>
        </div>
      </li>
      <div className="col-sm-8 w-100 m-bot-top">
        <React.Fragment key={"right"}>
          <div onClick={toggleDrawer("right", true)}>
            <button
              type="submit"
              className="btn btn-lg fs-18 btn-secondary btn-block h-60 bg-hover-primary border-0"
              onClick={() => {
                handleGetCart(
                  data.id,
                  number,
                  data.name,
                  data.priceDrop === 0 || data.priceDrop === undefined
                    ? data.price
                    : data.priceDrop,
                  data.images,
                  data.link
                );
              }}
            >
              Thêm Giỏ Hàng
            </button>
          </div>
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
              <SliderCart onClose={toggleDrawer("right", false)} />
            </div>
          </Drawer>
        </React.Fragment>
      </div>
      <p className="line-p"></p>
      <>
        {cardContents.map(({ id, label, description }, index) => (
          <AccordionCard
            key={index}
            id={id}
            label={label}
            description={description}
          />
        ))}
      </>
    </div>
  );
};

export default InforDetial;
