import React, { useRef } from "react";
import { LstDaum } from "../../../../core/model/home/body_home_model";
import { IDWEB, img_url } from "../../../../core/constant/constant";
import { DataItem } from "../../../../core/model/home/item_data_home";
import Slider, { Settings } from "react-slick";
import { ProductItems } from "../../../../path/page/home/widget_home";

interface Props {
  lstDataCombo: any;
  lstDataPartner: any;
}

const AboutInforPage: React.FC<Props> = ({ lstDataCombo, lstDataPartner }) => {
  // Tách chuỗi thành mảng các đoạn văn bản
  const splittedText_AllProduct =
    lstDataCombo?.sumary.split("|").map((item: any) => item.trim()) ?? [];
  const cap_all_pro_1 = splittedText_AllProduct[0];
  const cap_all_pro_2 = splittedText_AllProduct[1];
  const cap_all_pro_3 = splittedText_AllProduct[2];

  // useState
  const section01Ref = useRef<Slider>(null);
  const section02Ref = useRef<Slider>(null);

  // setting cho slider
  const section01Settings: Settings = {
    slidesToShow: 1,
    dots: false,
    arrows: false,
    asNavFor: section02Ref.current as Slider | undefined,
  };

  const section02Settings: Settings = {
    slidesToShow: 6,
    asNavFor: section01Ref.current as Slider | undefined,
    autoplay: true,
    focusOnSelect: true,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
    ],
  };

  const renderSection01 = () => {
    return lstDataPartner?.childItems?.map((e: LstDaum, index: number) => (
      <div className="box" key={`partner-${e.id}-${index}`}>
        <h4 className="mx-auto text-center mw-750 mb-11">{e.sumary}</h4>
      </div>
    ));
  };

  const renderSection02 = () => {
    return lstDataPartner?.childItems?.map((e: LstDaum, index: number) => (
      <div className="box" key={`partner-logo-${e.id}-${index}`}>
        <div className="d-block mw-150 mx-auto">
          <img
            src={`${img_url}${IDWEB}/imagesoptions/large/${e.images}`}
            className="opacity-3 opacity-hover-10 cursor-pointer"
            alt={e.images}
            loading="lazy"
          />
        </div>
      </div>
    ));
  };
  return (
    <div>
      <section
        className="mt-lg-10 mt-8 pt-xl-15 pb-xl-14 py-11 animate__animated animate__fadeInLeft fadeInUp animated"
        style={{ backgroundColor: "#EDF1F0" }}
        data-animate="fadeInUp"
      >
        <div className="container">
          <Slider
            className="slick-slider section-01"
            ref={section01Ref}
            {...section01Settings}
          >
            {renderSection01()}
          </Slider>
          <Slider
            className="slick-slider section-02 client-logo"
            ref={section02Ref}
            {...section02Settings}
          >
            {renderSection02()}
          </Slider>
        </div>
      </section>
      <div className="row mt-10 mt-lg-13 mb-6">
        <div className="col-12 text-center">
          <h2 className="mb-3 f-s-33">{lstDataCombo?.name}</h2>
          <p
            className="fs-18 mx-auto lh-166 p-l-r-16"
            key={`text-${lstDataCombo?.id}`}
          >
            {cap_all_pro_1}
          </p>
        </div>
      </div>
      <div className="col-lg-5 mb-8 mb-lg-0 order-1 order-lg-2 animate__animated animate__fadeInLeft">
        <div className="card border-0 hover-shine hover-zoom-in banner banner-04">
          <div
            className="card-img bg-img-cover-center"
            style={{
              backgroundImage: `url(${
                img_url + IDWEB + "/homes/large/" + lstDataCombo?.images
              })`,
            }}
          />
          <div className="card-img-overlay d-inline-flex flex-column justify-content-end p-8">
            <h6
              className="card-subtitle mb-1 text-white custom-font fs-48 lh-166 font-weight-normal"
              key={`subtitle-${lstDataCombo?.id}`}
            >
              {cap_all_pro_2}
            </h6>
            <h3
              className="card-title fs-40 lh-13 text-white mb-6"
              key={`title-${lstDataCombo?.id}`}
            >
              {cap_all_pro_3}
            </h3>
          </div>
        </div>
      </div>
      <div className="col-lg-7 animate__animated animate__fadeInLeft">
        <div className="row">
          {lstDataCombo?.childItems?.map((e: DataItem, index: number) => (
            <ProductItems
              e={e}
              index={index}
              key={`product-item-${e.id}-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutInforPage;
