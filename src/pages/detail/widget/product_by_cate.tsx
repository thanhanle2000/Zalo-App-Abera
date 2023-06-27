import React from "react";
import Slider from "react-slick";
import { MiniItemByCate } from "../../../path/page/component";
import ProductItems from "../../home/ABERA/widget/product_items";

interface Props {
  dataProduct: any;
}
const ProductByCate: React.FC<Props> = ({ dataProduct }) => {
  // setting slider
  const sliderSettings = {
    dots: true,
    arrows: false,
    initialSlide: 1,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
  };

  return (
    <section className="pt-10 pt-lg-13 pb-9 pb-lg-11 border-top">
      <div className="container">
        <h3 className="text-center fs-34 mb-8">Sản phẩm cùng danh mục</h3>
        <section className="pt-lg-13 pb-10 pb-lg-12">
          <div className="container container-xl">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 ">
                <Slider {...sliderSettings}>
                  {dataProduct?.map((product: any) => (
                    <ProductItems
                      e={product}
                      index={product.id}
                      key={product.id}
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProductByCate;
