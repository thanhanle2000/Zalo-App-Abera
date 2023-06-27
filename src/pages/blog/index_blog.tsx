import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  URL_Web,
  domain_abera,
  language_VN,
} from "../../core/constant/constant";
import { Custom_Header } from "../../path/page/component";
import { ProductByCate } from "../../path/page/detail/widget_detail";
import { BodySupport } from "../../path/page/blog/widget_blog";
import { getDataNameCate } from "../../core/db/db_storage";

const BlogPage = () => {
  // lấy thông tin tên page
  const data = getDataNameCate();

  // setState
  const [dataJson, setDataJson] = useState<any>();
  const [dataPro, setDataPro] = useState<any>();
  const [name, setName] = useState("");
  // get data blog
  const getDataBlog = async () => {
    try {
      const param = `_language=${language_VN}&url=${
        data.link
      }&name=${domain_abera}&page=${1}`;
      const response = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite?" + param
      );
      setDataPro(response.data.allPage.productsAnotherDetail);
      setDataJson(response.data.allPage.news);
      setName(response.data.allPage.newsCategoryInfo.name);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect
  useEffect(() => {
    getDataBlog();
  }, []);
  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header title={name} name={""} link_page={""} link_url={""} />
        <h2 className="mb-2 fs-34 text-center mt-9 mb-8 fadeInUp animated">
          {name}
        </h2>
        <BodySupport lstBlogContent={dataJson} />
        <ProductByCate dataProduct={dataPro} />
      </main>
    </div>
  );
};

export default BlogPage;
