import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { setTypeSort } from "../../../core/hook/state_home";

interface Props {
  nameCate: any;
  total: any;
  isSort: boolean;
  style: string;
  customKey: string;
}
interface SortItem {
  id: number;
  name: string;
  typeSort: string;
}
const Total: React.FC<Props> = ({
  nameCate,
  total,
  isSort,
  style,
  customKey,
}) => {
  // setState
  const [nameSort, setNameSort] = useState("Sắp xếp sản phẩm");
  const [type, setType] = useRecoilState(setTypeSort);

  // get data sort
  const getDataSort: SortItem[] = [
    {
      id: 1,
      name: "Giá từ cao đến thấp",
      typeSort: "Product.priceDrop desc",
    },
    {
      id: 2,
      name: " Giá từ thấp đến cao",
      typeSort: "Product.priceDrop asc",
    },
    {
      id: 3,
      name: "Đánh giá nhiều",
      typeSort: "Product.numberRate asc",
    },
    {
      id: 4,
      name: "Mua nhiều nhất",
      typeSort: "Product.isBestSeller asc",
    },
  ];

  // handle get id sort
  function handgetIdTypeSort(typeSort: string, nameSort: string) {
    setNameSort(nameSort);
    setType(typeSort);
  }

  return (
    <section>
      <div className="container container-xl">
        {nameCate === "" ? null : (
          <h3 className="text-center m-t-20">{nameCate}</h3>
        )}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {style === "search" ? (
            <div
              className="fs-17 font-weight-500 my-lg-0 my-2"
              style={{ color: "#696969" }}
            >
              Tìm thấy{" "}
              <strong className="font-weight-bold text-secondary">
                {total}{" "}
              </strong>
              sản phẩm phù hợp với{" "}
              <strong className="font-weight-bold text-secondary">
                {customKey}
              </strong>
            </div>
          ) : (
            <p
              className="fs-17 font-weight-500 my-lg-0 my-2"
              style={{ color: "#696969" }}
            >
              Tìm thấy{" "}
              <strong className="font-weight-bold text-secondary">
                {total}{" "}
              </strong>
              sản phẩm có sẵn cho bạn
            </p>
          )}
          {isSort === false ? null : (
            <div className="d-flex align-items-center">
              <div className="switch-layout d-lg-flex align-items-center d-none">
                <span className="pr-5">See</span>
                <a href="#" className="active pr-5" title="Grid View">
                  <svg className="icon icon-squares-four fs-32 hover-secondary">
                    <use xlinkHref="#icon-squares-four" />
                  </svg>
                </a>
                <a href="shop-page-05.html" title="List View">
                  <svg className="icon icon-list fs-32 hover-secondary">
                    <use xlinkHref="#icon-list" />
                  </svg>
                </a>
              </div>
              <div
                className="dropdown show lh-1 rounded ml-lg-5 ml-0"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <a
                  href="#"
                  className="dropdown-toggle custom-dropdown-toggle text-decoration-none text-secondary p-3 mw-210 position-relative d-block"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {nameSort}
                </a>
                <div
                  className="dropdown-menu custom-dropdown-item"
                  aria-labelledby="dropdownMenuButton"
                >
                  {getDataSort.map((e: SortItem) => (
                    <a
                      className="dropdown-item"
                      href="#"
                      key={e.id}
                      onClick={() => handgetIdTypeSort(e.typeSort, e.name)}
                    >
                      {e.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Total;
