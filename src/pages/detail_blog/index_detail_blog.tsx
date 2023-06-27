import axios from "axios";

import React, { useEffect, useState } from "react";

import {
  language_VN,
  domain_abera,
  URL_Web,
  formatDate,
} from "../../core/constant/constant";
import { Custom_Header } from "../../path/page/component";
import { BodyDetailBlog } from "../../path/page/detail_blog/widget_detail_blog";
import { getDataNameDetailBlog } from "../../core/db/db_storage";

const DetailBlogPage = () => {
  // get name
  const dataLocal = getDataNameDetailBlog();

  // setState
  const [dataDetail, seDataDetail] = useState<any>();
  const [des, setDes] = useState("");
  // get data blog
  const getDataBlog = async () => {
    try {
      const param = `_language=${language_VN}&url=${
        dataLocal.link
      }&name=${domain_abera}&page=${1}`;
      const response = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite?" + param
      );
      seDataDetail(response?.data?.allPage?.newsDetail);
      setDes(response.data.allPage.newsDetail.description);
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
        <Custom_Header
          title={dataDetail?.name}
          name={"Blog"}
          link_page={"/index_blog"}
          link_url={"blog"}
        />
        <div className="fadeInUp animated">
          <h2 className="mb-2 fs-34 text-center mt-9 ">{dataDetail?.name}</h2>
          <li className="list-inline-item pr-3 text-al-center">
            {formatDate(dataDetail?.createdAt)}
          </li>
        </div>
        <BodyDetailBlog data={des} />
      </main>
    </div>
  );
};

export default DetailBlogPage;
