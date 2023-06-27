import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import {
  IDWEB,
  URL_Web,
  domain_abera,
  img_header_large,
  img_url,
  language_VN,
} from "../core/constant/constant";
import { clearAllDB, getDataNameCate } from "../core/db/db_storage";
import { InforHomeModel } from "../core/model/home/infor_home_model";
import logo_abera from "../images/img_box/logo-new.jpg";
import "../vendors/ABERA/styles_abera_index.css";
import LogoHeader from "./logo-header";
import PageScreen from "./page_screen";
import { CustomModal } from "../path/page/component";

const MyApp = () => {
  // useState
  const [inforHome, setInforHome] = useState<InforHomeModel>();
  const [imgSrc, setImgSrc] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // get idActive cate
  const idActives = getDataNameCate();

  // get data infor home app
  const getDataInforHome = async () => {
    try {
      const { data } = await axios.get(
        URL_Web +
          "HomeMobile/GetDataWebsite?name=" +
          domain_abera +
          "&_language=" +
          language_VN
      );
      setInforHome(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Lấy dữ liệu và set giá trị vào state
    getDataInforHome();

    // Kiểm tra nếu là lần đầu vào web thì hiển thị modal
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      // clearAllDB(); // xóa all db khi cần test
      setModalOpen(true);
      sessionStorage.setItem("isFirstVisit", "true");
    }
  }, []);

  useEffect(() => {
    // Kiểm tra nếu cả imgSrc và inforHome có dữ liệu thì tắt modal
    if (imgSrc && inforHome) {
      setTimeout(() => {
        setModalOpen(false);
      }, 2000); // Đợi 2 giây trước khi tắt modal
    }
  }, [imgSrc, inforHome]);

  useEffect(() => {
    // Cập nhật giá trị cho imgSrc khi inforHome thay đổi
    if (inforHome) {
      const logo = inforHome.website.h_favicon;
      const imgSrc = img_url + IDWEB + img_header_large + logo;
      setImgSrc(imgSrc);
    }
  }, [inforHome]);

  // handle close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <RecoilRoot>
      <LogoHeader logo={logo_abera} />
      <App>
        <Suspense>
          <SnackbarProvider>
            <ZMPRouter>
              <PageScreen inforHome={inforHome!} idActives={idActives.id} />
            </ZMPRouter>
          </SnackbarProvider>
        </Suspense>
      </App>
      <CustomModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        logo_abera={logo_abera}
      />
    </RecoilRoot>
  );
};

export default MyApp;
