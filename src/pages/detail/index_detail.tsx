import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  IDWEB,
  URL_Web,
  domain_abera,
  language_VN,
} from "../../core/constant/constant";
import { getEleventPage } from "../../core/hook/state_home";
import { ListImage } from "../../core/model/home/list_image_model";
import { Custom_Header } from "../../path/page/component";
import {
  ImgDetail,
  InforDetial,
  ProductByCate,
} from "../../path/page/detail/widget_detail";
import LoadingModal from "../../components/loading_modal";
import Skeleton from "react-loading-skeleton";
const Detail = () => {
  // get data local
  const dataLocal = JSON.parse(localStorage.getItem("nameDetail") ?? "{}");

  // get state recoil
  const idActives = useRecoilValue(getEleventPage);

  // useState
  const [dataDetail, setDataDetail] = useState<any>();
  const [prByCate, setPrByCate] = useState<any>();
  const [image, setImage] = useState<ListImage[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // gán img
  const img_1 = dataDetail?.images;

  // get data detail
  const getDataProductDetail = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const param = `?_language=${language_VN}&url=${
        dataLocal?.link
      }&name=${domain_abera}&page=${1}`;
      const response = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite" + param
      );
      setImage(response.data.allPage.lstAlbumDetail);
      setDataDetail(response.data.allPage.productDetail);
      setPrByCate(response.data.allPage.productsAnotherDetail);

      setIsLoading(false); // Set loading state to false after data is loaded
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Check if the main image is loaded
    const mainImage = new Image();
    mainImage.src = `https://web.hvnet.vn/uploads/img/${IDWEB}/products/large/${img_1}`;
    mainImage.onload = () => {
      setIsImageLoaded(true);
    };

    // Check if all the object images are loaded
    const objectImages = image.map((item) => item.images);
    const objectImagesPromises = objectImages.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = `https://web.hvnet.vn/uploads/img/${IDWEB}/productsimages/large/${url}`;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    Promise.all(objectImagesPromises)
      .then(() => {
        setIsImageLoaded(true);
      })
      .catch(() => {
        setIsImageLoaded(true);
      });

    getDataProductDetail();
  }, [idActives]);

  const loadingStyle: CSSProperties = {
    display: isImageLoaded ? "none" : "block",
    position: "relative",
    width: "100%",
    height: "0",
    paddingTop: "56.25%", // Tỷ lệ 16:9
    overflow: "hidden",
  };

  const shimmerStyle: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
    animation: "shimmer 1.5s infinite",
  };
  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={dataLocal.nameDetail}
          name={"Danh mục sản phẩm"}
          link_page={"/index_product_all"}
          link_url={"san-pham"}
        />
        {isLoading ? (
          <LoadingModal />
        ) : (
          <>
            <div style={loadingStyle}>
              <div style={shimmerStyle}></div>
            </div>
            {isImageLoaded && (
              <>
                <ImgDetail img_1={img_1} objectImage={image} />
                <InforDetial data={dataDetail} />
                <ProductByCate dataProduct={prByCate} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Detail;
