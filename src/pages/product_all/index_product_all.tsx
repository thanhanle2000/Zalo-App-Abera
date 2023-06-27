import React from "react";
import { BodyProductAll } from "../../path/page/product_all/widget_product_all";
import { Custom_Header } from "../../path/page/component";

const ProductAll = () => {
  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={"Tất cả sản phẩm"}
          name={""}
          link_page={""}
          link_url={""}
        />
        <h2 className="text-center mt-9 mb-8">TẤT CẢ SẢN PHẨM</h2>
      </main>
      <BodyProductAll />
    </div>
  );
};

export default ProductAll;
