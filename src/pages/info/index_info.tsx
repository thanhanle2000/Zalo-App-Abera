import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  URL_Web,
  domain_abera,
  language_VN,
} from "../../core/constant/constant";
import { Custom_Header } from "../../path/page/component";
import parse from "html-react-parser";
import { getDataNameCate } from "../../core/db/db_storage";

const InfoPage = () => {
  // lấy thông tin tên page
  const data = getDataNameCate();

  // useState
  const [lstdata, setLstData] = useState<any>();

  // get data info
  const getDataInfo = async () => {
    try {
      const param = `_language=${language_VN}&url=${
        data.link
      }&name=${domain_abera}&page=${1}`;
      const response = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite?" + param
      );
      setLstData(response?.data?.homePage?.aboutUs);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect
  useEffect(() => {
    getDataInfo();
  }, []);

  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={"Giới thiệu"}
          name={""}
          link_page={""}
          link_url={""}
        />
        <h2 className="text-center mt-9 mb-8 fadeInUp animated">
          {lstdata?.name ?? ""}
        </h2>
        <div className="p-l-r-t-10 fadeInUp animated">
          {parse(lstdata?.description ?? "")}
        </div>
      </main>
    </div>
  );
};

InfoPage.propTypes = {};

export default InfoPage;
