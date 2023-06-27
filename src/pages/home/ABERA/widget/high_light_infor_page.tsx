import React from "react";
import Slider, { Settings } from "react-slick";
import {
  IDWEB,
  img_options_large,
  img_url,
} from "../../../../core/constant/constant";
import { LstDaum } from "../../../../core/model/home/body_home_model";

interface Props {
  lstDataCustomerReview: any;
  lstUtilities: any;
  lstDataImgReview: any;
}
const HighLightInforPage: React.FC<Props> = ({
  lstDataCustomerReview,
  lstUtilities,
  lstDataImgReview,
}) => {
  // setting cho slider
  const sectionSettings: Settings = {
    slidesToShow: 1,
    dots: true,
    arrows: false,
    autoplay: true,
  };

  return (
    <div>
      <section className="pt-7 pt-lg-10 pt-xl-14 animate__animated animate__fadeInLeft">
        <div className="container container-xl">
          <div className="row">
            {lstUtilities?.childItems?.map((e: LstDaum, index: number) => (
              <div
                className="col-lg-4 mb-6 mb-lg-0"
                key={`utility-${e.id}-${index}`}
              >
                <div className="media border-0">
                  <div className="mw-90 mr-6">
                    <img
                      src={img_url + IDWEB + img_options_large + e.images}
                      loading="lazy"
                    />
                  </div>
                  <div className="media-body">
                    <h3 className="fs-24 mb-3">{e.name}</h3>
                    <p className="mb-0 pr-lg-8">{e.sumary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pt-lg-13 pb-10 pb-lg-12 animate__animated animate__fadeInLeft">
        <div className="row mt-10 mt-lg-13 mb-6">
          <div className="col-12 text-center">
            <h2 className="mb-3" key={`object-${lstDataCustomerReview?.id}`}>
              {lstDataCustomerReview?.name}
            </h2>
          </div>
        </div>
        <div className="container container-xl">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <Slider {...sectionSettings}>
                {lstDataCustomerReview?.childItems?.map(
                  (e: LstDaum, index: number) => (
                    <div className="box px-0" key={`review-${e.id}-${index}`}>
                      <div className="card border-0 text-center">
                        <div className="card-body px-3 py-0">
                          <div className="img_border">
                            <img
                              src={
                                img_url +
                                IDWEB +
                                "/imagesoptions/large/" +
                                e.images
                              }
                              className="mb-7 w-auto mx-auto"
                              loading="lazy"
                            />
                          </div>
                          <p
                            className="text-customerComment card-text mb-8 fs-34 font-weight-500 text-primary mx-auto lh-13"
                            style={{ maxWidth: "660px" }}
                          >
                            {`“${e.sumary}“`}
                          </p>
                          <h4 className="fs-15 font-weight-bold text-uppercase letter-spacing-01">
                            {e.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section
        className=" pt-lg-12 animate__animated animate__fadeInLeft"
        style={{
          backgroundColor: "#F8F8F8",
          marginBottom: "10px",
        }}
      >
        <div className="container container-xl">
          <div className="row align-items-end">
            <div className="col-md-6 mb-md-6">
              <h2
                className="fs-34 mb-0"
                key={`name_review-${lstDataImgReview?.id}`}
              >
                {lstDataImgReview?.name}
              </h2>
            </div>
            <div className="col-12">
              <div className="mx-n2">
                <div
                  className="slider-container"
                  style={{ width: "100%", padding: "15px" }}
                >
                  <Slider
                    slidesToShow={1}
                    slidesToScroll={1}
                    responsive={[
                      {
                        breakpoint: 768,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        },
                      },
                    ]}
                    className="mx-n2"
                    autoplay={true}
                    speed={2000}
                    autoplaySpeed={1000}
                    prevArrow={<></>}
                    nextArrow={<></>}
                  >
                    {lstDataImgReview?.childItems?.map(
                      (e: LstDaum, index: number) => {
                        if (index % 2 === 0) {
                          const nextIndex = index + 1;
                          const nextItem =
                            lstDataImgReview?.childItems?.[nextIndex];

                          return (
                            <div
                              className="d-flex"
                              key={`img-review-${e.id}-${index}`}
                            >
                              <div className="box px-2" style={{ flex: 1 }}>
                                <a className="hover-zoom-in hover-shine d-block">
                                  <img
                                    src={
                                      img_url +
                                      IDWEB +
                                      img_options_large +
                                      e.images
                                    }
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      objectFit: "cover",
                                      maxWidth: "165px",
                                      maxHeight: "165px",
                                    }}
                                    alt=""
                                    loading="lazy"
                                  />
                                </a>
                              </div>
                              {nextItem && (
                                <div className="box px-2" style={{ flex: 1 }}>
                                  <a className="hover-zoom-in hover-shine d-block">
                                    <img
                                      src={
                                        img_url +
                                        IDWEB +
                                        img_options_large +
                                        nextItem.images
                                      }
                                      style={{
                                        width: "100%", // Adjusted to fill the container
                                        height: "auto", // Adjusted to maintain aspect ratio
                                        objectFit: "cover",
                                        maxWidth: "200px", // Adjusted to resize the images
                                        maxHeight: "200px", // Adjusted to resize the images
                                      }}
                                      alt=""
                                      loading="lazy"
                                    />
                                  </a>
                                </div>
                              )}
                            </div>
                          );
                        }

                        return null;
                      }
                    )}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HighLightInforPage;
