import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  URL_Web,
  domain_abera,
  language_VN,
} from "../../../core/constant/constant";
import imgNoProduct from "../../../images/img_box/no_products.png";
import { Total } from "../../../path/page/cate/widget_cate";
import { ProductItems } from "../../../path/page/home/widget_home";

const BodyProductAll = () => {
  // get data local
  const dataLocal = JSON.parse(localStorage.getItem("nameCate") ?? "{}");

  // setState
  const [loadedProducts, setLoadedProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // get data to api
  const fetchData = async () => {
    try {
      setIsLoadingMore(true);
      const param = `?_language=${language_VN}&url=${dataLocal?.link}&name=${domain_abera}&page=${page}`;
      const response = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite" + param
      );

      setLoadedProducts((prevProducts) => [
        ...prevProducts,
        ...(response.data.allPage.products ?? []),
      ]);
      setTotalProducts(response.data.allPage.total);
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
      setIsLoadingMore(false);
    }
  };

  // useEffect
  useEffect(() => {
    fetchData();
  }, [page]);

  // handle loadmore
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // number load
  const numberLoad = totalProducts - loadedProducts.length;

  return (
    <div>
      <Total
        nameCate={""}
        total={totalProducts}
        isSort={false}
        style=""
        customKey=""
      />
      {totalProducts === 0 && !isLoadingMore ? (
        <img className="img-no-pro" src={imgNoProduct} alt="No Product" />
      ) : (
        <div className="col-lg-7">
          <div className="row">
            {loadedProducts.map((product: any, index) => (
              <ProductItems
                key={`${product.id}-${index}`}
                e={product}
                index={index}
              />
            ))}
          </div>
          {!isLoadingMore && loadedProducts.length < totalProducts && (
            <div className="row-btn-load-more m-b-30">
              <div className="btn-load-more" onClick={loadMore}>
                Xem thêm
              </div>
            </div>
          )}
          {!isLoadingMore && numberLoad === 0 && loadedProducts.length > 0 && (
            <div className="row-btn-load-more m-b-30">
              <div className="alert alert-danger">Bạn đã xem hết sản phẩm!</div>
            </div>
          )}
          {isLoadingMore && <div className="loader"></div>}
        </div>
      )}
    </div>
  );
};

export default BodyProductAll;
