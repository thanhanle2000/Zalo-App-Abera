import "animate.css";
import React, { useCallback, useMemo, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import { useNavigate } from "zmp-ui";
import {
  IDWEB,
  img_infor_homes_large,
  img_url,
} from "../../../../core/constant/constant";

import { DataItem } from "../../../../core/model/home/item_data_home";
import {
  ProductItems,
  TikTokVideo,
} from "../../../../path/page/home/widget_home";
import { saveNameCate } from "../../../../core/db/db_storage";

interface ImgBg {
  id: number;
  url: string;
  cap_1: string;
  cap_2: string;
  cap_3: string;
  btn: string;
}
interface Props {
  lstPrBestSale: any;
  lstBanner: any;
  lstTradeMark: any;
}
const BodyHomePage: React.FC<Props> = ({
  lstPrBestSale,
  lstBanner,
  lstTradeMark,
}) => {
  // navigate
  const navigate = useNavigate();

  // useState
  const [currentSlide, setCurrentSlide] = useState(0);

  // gán data
  const dataImgBg = useMemo(() => {
    return lstBanner?.map((item: any) => {
      const summaryArr = item.sumary.split("|").map((item: any) => item.trim());
      const [cap_1, cap_2, cap_3, btn] = summaryArr;
      return {
        id: item.id,
        url: img_url + IDWEB + "/imagesoptions/large/" + item.images,
        cap_1,
        cap_2,
        cap_3,
        btn,
      };
    });
  }, [lstBanner]);

  const splittedText = useMemo(() => {
    return lstPrBestSale?.sumary?.split(" | ") ?? [];
  }, [lstPrBestSale]);

  const cap_1 = splittedText[0];
  const cap_2 = splittedText[1];
  const cap_3 = splittedText[2];

  // handleNextPage
  function handleNextPageProductAll(link: string) {
    navigate("/index_product_all");
    saveNameCate("", 0, link);
    window.scrollTo(0, 0);
  }

  // handle click dot
  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // setting sliders
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
    }),
    []
  );

  return (
    <main id="content">
      <section>
        <Slider {...settings}>
          {dataImgBg?.map((e: ImgBg, index: number) => (
            <div className="box px-0" key={`img-bg-${e.id}-${index}`}>
              <div
                className="bg-img-cover-center py-14 pt-lg-18 pb-lg-17 animate__animated animate__fadeInDown"
                style={{ backgroundImage: `url(${e.url})` }}
              >
                <div className="container container-xl"></div>
              </div>
              <div className="bg-img-cover-center pt-lg-18 pb-lg-17">
                <div className="container container-xl py-7">
                  <div
                    className="text-center animate__animated animate__fadeInLeft"
                    style={{ maxWidth: "454px" }}
                  >
                    <p className="text-primary fs-56 lh-113 mb-6 custom-font animate__animated animate__slideInLeft">
                      {e.cap_1}!
                    </p>
                    <h3 className="mb-4 fs-28 lh-128 animate__animated animate__slideInLeft">
                      {e.cap_2}
                    </h3>
                    <p
                      className="fs-16 lh-166 animate__animated animate__slideInLeft"
                      style={{ maxWidth: "454px" }}
                    >
                      {e.cap_3}
                    </p>
                  </div>
                  <div
                    className="text-center animate__animated animate__fadeInLeft"
                    style={{ maxWidth: "454px" }}
                  >
                    <a
                      className="btn btn-secondary rounded bg-hover-primary border-0 animate__animated animate__slideInLeft"
                      onClick={() => handleNextPageProductAll("san-pham")}
                    >
                      {e.btn}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      {
        // tạm ẩn đợi xét duyệt
        /* <section
        className="pt-lg-13 pb-10 pb-lg-12 animate__animated animate__fadeInLeft"
        data-animate="fadeInUp"
      >
        <div className="container container-xl">
          <div className="row mt-lg-13 mb-6">
            <div className="col-12 text-center">
              <h2>{lstTradeMark?.name}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <Carousel
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={false}
                interval={3000}
                transitionTime={800}
                selectedItem={currentSlide}
                onChange={setCurrentSlide}
                renderIndicator={(onClickHandler, isSelected, index) => {
                  const dotClasses = isSelected
                    ? "carousel-dot active"
                    : "carousel-dot";

                  return (
                    <li
                      className={dotClasses}
                      onClick={() => handleDotClick(index)}
                      key={`dot-${index}`}
                    />
                  );
                }}
              >
                {lstTradeMark?.childItems?.map((e: LstDaum, index: number) => (
                  <TikTokVideo
                    url={e.linkVideo}
                    back={e.linkBack}
                    id={e.id}
                    key={`trade-mark-${e.id}-${index}`}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section> */
      }
      <section
        className="animate__animated animate__fadeInLeft"
        data-animate="fadeInUp"
      >
        <div className="container container-xl">
          <div className="row mt-lg-13 mb-6">
            <div className="col-12 text-center">
              <h2 className="mb-3 f-s-33">{lstPrBestSale?.name}</h2>
              <p className="fs-18 mx-auto lh-166" style={{ maxWidth: "462px" }}>
                {cap_1}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 mb-8 mb-lg-0">
              <div className="card border-0 hover-shine hover-zoom-in banner banner-04">
                <div
                  className="card-img bg-img-cover-center"
                  style={{
                    backgroundImage: `url(${
                      img_url +
                      IDWEB +
                      img_infor_homes_large +
                      lstPrBestSale?.images
                    })`,
                  }}
                />
                <div className="card-img-overlay d-inline-flex flex-column justify-content-end p-8">
                  <h6
                    className="card-subtitle mb-1 text-white custom-font fs-48 lh-166 font-weight-normal"
                    key={`card-subtitle-${lstPrBestSale?.id}`}
                  >
                    {cap_2}
                  </h6>
                  <h3
                    className="card-title fs-40 lh-13 text-white mb-6"
                    key={`card-title-${lstPrBestSale?.id}`}
                  >
                    {cap_3}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row">
                {lstPrBestSale?.childItems?.map(
                  (e: DataItem, index: number) => (
                    <ProductItems
                      e={e}
                      index={index}
                      key={`product-item-${e.id}-${index}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BodyHomePage;
