import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { IDWEB } from "../../../core/constant/constant";
import { ListImage } from "../../../core/model/home/list_image_model";

interface Props {
  img_1: any;
  objectImage: ListImage[];
}

const ImgDetail: React.FC<Props> = ({ img_1, objectImage }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(img_1);
  }, [img_1]);

  useEffect(() => {
    const loadImage = async (image: string) => {
      const img = new Image();
      img.src = image;

      await img.decode();
    };

    if (selectedImage) {
      loadImage(
        `https://web.hvnet.vn/uploads/img/${IDWEB}/products/large/${selectedImage}`
      );
    }
  }, [selectedImage]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsZoomOpen(true);
  };
  return (
    <div className="col-md-6 pr-xl-9 mb-8 mb-md-0 m-top">
      <div className="galleries-product galleries-product-01 position-relative d-flex">
        <Slider
          className="slick-slider slider-for mx-0 pl-xl-5"
          slidesToShow={1}
          autoplay={false}
          dots={false}
          arrows={false}
        >
          <div className="box px-0">
            <div className="card p-0 rounded-0 border-0">
              <a className="card-img">
                <img
                  src={`https://web.hvnet.vn/uploads/img/${IDWEB}/products/large/${selectedImage}`}
                  alt="product gallery"
                  className="w-100"
                  onClick={() => handleImageClick(selectedImage)}
                />
              </a>
            </div>
          </div>
          {objectImage.map((e: ListImage) => (
            <div className="box px-0" key={e.id}>
              <div className="card p-0 rounded-0 border-0">
                <a
                  className="card-img"
                  onClick={() => handleImageClick(e.images)}
                >
                  <img
                    src={`https://web.hvnet.vn/uploads/img/${IDWEB}/productsimages/large/${e.images}`}
                    alt="product gallery"
                    className="w-100"
                  />
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="image-list">
        <div className="box m-t-10">
          <img
            src={`https://web.hvnet.vn/uploads/img/${IDWEB}/products/small/${img_1}`}
            className={`img-border-card img-br-6 ${
              img_1 === selectedImage ? "active" : ""
            }`}
            alt="product gallery"
          />
        </div>
        {objectImage.map((e: ListImage) => (
          <div className="box m-t-10" key={e.id}>
            <img
              src={`https://web.hvnet.vn/uploads/img/${IDWEB}/products/small/${e.images}`}
              className={`img-border-card img-br-6 ${
                e.images === selectedImage ? "active" : ""
              }`}
              alt="product gallery"
              onClick={() => handleImageClick(e.images)}
            />
          </div>
        ))}
      </div>
      {isZoomOpen && (
        <div className="zoom-popup" onClick={() => setIsZoomOpen(false)}>
          <span className="close-icon" onClick={() => setIsZoomOpen(false)}>
            &times;
          </span>
          <img
            src={`https://web.hvnet.vn/uploads/img/${IDWEB}/products/large/${selectedImage}`}
            alt="product zoom"
            className="zoom-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImgDetail;
