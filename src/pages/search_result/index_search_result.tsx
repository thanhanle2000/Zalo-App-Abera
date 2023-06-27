import React, { useEffect, useState } from "react";
import { Custom_Header } from "../../path/page/component";
import { useRecoilValue } from "recoil";
import { getKeySearch } from "../../core/hook/state_home";
import { Total } from "../../path/page/cate/widget_cate";
import axios from "axios";
import { IDWEB, URL_Web } from "../../core/constant/constant";
import { DataItem } from "../../core/model/home/item_data_home";
import { ProductItems } from "../../path/page/home/widget_home";
import imgNoProduct from "../../images/img_box/no_products.png";

const SearchResultPage = () => {
  // useState
  const [data, setData] = useState<any>({
    data: [],
    total: 0,
    pageIndex: 1,
    pageSize: 12,
  });
  const [loading, setLoading] = useState(true);

  // get key to recoil
  const key = useRecoilValue(getKeySearch);

  // get data search
  const getDataSearch = async () => {
    setLoading(true); // Start loading

    // param
    const param = {
      where:
        "1=1 and Product.websiteId = " +
        IDWEB +
        "and Product.active=1 and Product.name COLLATE Latin1_General_CI_AI LIKE N'%" +
        key +
        "%'",
      sort: "Product.numberRate asc",
      pageSize: data.pageSize,
      pageIndex: data.pageIndex,
    };
    const response = await axios.post(
      URL_Web + "productsmobile/GetDataProduct",
      param
    );

    // kiểm tra điều kiện để map data
    if (response.data && response.data.data && response.data.data.length > 0) {
      const newData = {
        data: [...data.data, ...response.data.data],
        total: response.data.total,
        pageIndex: data.pageIndex + 1,
        pageSize: data.pageSize,
      };
      setData(newData);
    }

    setLoading(false); // Stop loading
  };

  // numberLoad
  const number = data.total - 1;
  const numberLoad = number - data.data.length;

  // useEffect
  useEffect(() => {
    setData({
      data: [],
      total: 0,
      pageIndex: 1,
      pageSize: 12,
    }); // Reset data on key change
  }, [key]);

  useEffect(() => {
    getDataSearch();
  }, [key]);

  // handle loadmore
  const loadMoreData = () => {
    getDataSearch();
  };

  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={"Kết quả tìm kiếm"}
          name={""}
          link_page={""}
          link_url={""}
        />
      </main>
      <Total
        nameCate={""}
        total={
          (data.data.length < data?.total ? data?.total - 1 : data?.total) ?? 0
        }
        isSort={false}
        style="search"
        customKey={key}
      />
      {data.total === 0 && !loading ? (
        <img className="img-no-pro" src={imgNoProduct} />
      ) : (
        <div className="col-lg-7">
          <div className="row">
            {data?.data?.map((e: DataItem, index: number) => (
              <ProductItems
                e={e}
                index={index}
                key={`product-item-${e.id}-${index}`}
              />
            ))}
          </div>
          {loading ? (
            <div className="loader"></div> // Render a loading indicator here
          ) : (
            data.data.length < data.total - 1 && (
              <div className="row-btn-load-more m-b-30">
                <div className="btn-load-more" onClick={loadMoreData}>
                  Xem thêm
                </div>
              </div>
            )
          )}
          {numberLoad < 0 && !loading && (
            <div className="row-btn-load-more m-b-30">
              <div className="alert alert-danger">Bạn đã xem hết sản phẩm!</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
