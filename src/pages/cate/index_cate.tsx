import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  URL_Web,
  domain_abera,
  language_VN,
} from "../../core/constant/constant";
import { getEleventPage, getTypeSort } from "../../core/hook/state_home";
import { DataItem } from "../../core/model/home/item_data_home";
import imgNoProduct from "../../images/img_box/no_products.png";
import { Total } from "../../path/page/cate/widget_cate";
import { Custom_Header } from "../../path/page/component";
import { ProductItems } from "../../path/page/home/widget_home";

const CatePage = () => {
  // get data local
  const dataLocal = JSON.parse(localStorage.getItem("nameCate") ?? "{}");

  // get state id
  const idActives = useRecoilValue(getEleventPage);

  // useState
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [number, setNumber] = useState(0);
  const [nameCate, setNameCate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // get type sort
  const typeSort = useRecoilValue(getTypeSort);

  // get dữ liệu cho danh mục sản phẩm
  const getDataProductByCate = async () => {
    try {
      setIsLoading(true);
      const param = `?_language=${language_VN}&url=${dataLocal?.link}&name=${domain_abera}&page=${page}`;
      const response = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite" + param
      );
      setProducts((prevProducts: any) => [
        ...prevProducts,
        ...(response.data.allPage.products ?? []),
      ]);
      setNumber(response.data.allPage.total);
      setNameCate(response.data.allPage.newsCategoryInfo.name);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  // handle load more
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // number load
  const numberLoad = number - products.length;
  console.log(numberLoad);
  // useEffect
  useEffect(() => {
    if (page === 1) {
      setProducts([]); // Xóa dữ liệu cũ khi chuyển trang mới
    }
    getDataProductByCate();
  }, [typeSort, page, idActives]);

  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={nameCate}
          name={"Danh mục sản phẩm"}
          link_page={"/index_product_all"}
          link_url={"san-pham"}
        />
        <Total
          nameCate={nameCate}
          total={number}
          isSort={false}
          style=""
          customKey=""
        />
        {number === 0 && !isLoading ? (
          <img className="img-no-pro" src={imgNoProduct} />
        ) : (
          <div className="col-lg-7">
            <div className="row">
              {products.map((e: DataItem, index: number) => (
                <ProductItems
                  e={e}
                  index={index}
                  key={`product-item-${e.id}-${index}`}
                />
              ))}
            </div>
            {isLoading ? (
              <div className="loader"></div> // Render a loading indicator here
            ) : (
              products.length < number && (
                <div className="row-btn-load-more m-b-30">
                  <div className="btn-load-more" onClick={handleLoadMore}>
                    Xem thêm
                  </div>
                </div>
              )
            )}
            {numberLoad === 0 && !isLoading && number > 12 && (
              <div className="row-btn-load-more m-b-30">
                <div className="alert alert-danger">
                  Bạn đã xem hết sản phẩm!
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CatePage;
