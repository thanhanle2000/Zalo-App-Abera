import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { followOA, getAccessToken, getUserInfo } from "zmp-sdk";
import {
  ID_OA,
  URL_Web,
  domain_abera,
  language_VN,
} from "../../../core/constant/constant";

import {
  BodyHomeModel,
  LstDaum,
} from "../../../core/model/home/body_home_model";
import {
  AboutInforPage,
  BodyHomePage,
  HighLightInforPage,
} from "../../../path/page/home/widget_home";
import {
  getAccessTokenZaloUser,
  saveAccessTokenZaloUser,
} from "../../../core/db/db_storage";

const HomePage = () => {
  //setState
  const [bodyData, setBodyData] = useState<BodyHomeModel>();
  const [idOA, setIdOA] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // lấy thông tin token user
  const getTokenUserZalo = () => {
    const token_user = getAccessTokenZaloUser();
    if (!token_user) {
      getAccessToken({
        success: (accessToken) => {
          // xử lý khi gọi api thành công
          saveAccessTokenZaloUser(accessToken);
        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        },
      });
    } else {
      console.log("Đã có token");
    }
  };

  // lấy thông tin user
  const getInfoProfileUser = async () => {
    try {
      const data = await getUserInfo();
      const { userInfo } = data;
      localStorage.setItem("idUser", userInfo.id);
      setIdOA(userInfo.idByOA!);
      if (userInfo.idByOA === "") {
        handleFollowOA();
      } else {
        console.log("User đã follow OA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // follow OA
  const handleFollowOA = () => {
    followOA({
      id: ID_OA,
      success: () => {
        return console.log("follow");
      },
      fail: (error) => console.log(error),
    });
  };

  // cho phép người dùng nhận thông báo quan zalo mini app
  // const sendNotification = () => {
  //   requestSendNotification({
  //     success: (data) => {
  //       console.log("Gọi API thành công", data);
  //       // Xử lý khi gọi API thành công
  //     },
  //     fail: (error) => {
  //       console.log("Gọi API thất bại", error);
  //       // Xử lý khi gọi API thất bại
  //     },
  //   });
  // };

  // lấy thông tin cho trang chủ
  const getDataBodyHome = useCallback(async () => {
    try {
      setIsLoading(true);
      const param = `_language=${language_VN}&url=/&name=${domain_abera}&page=${1}`;
      const respon = await axios.get(
        URL_Web + "HomeMobile/GetBodyDataWebsite?" + param
      );
      setBodyData(respon.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      await getDataBodyHome();
      getTokenUserZalo();
      getInfoProfileUser();
    };
    fetchData();
  }, []);

  // gán giá trị cho lstData
  const lstData = useMemo(() => bodyData?.homePage?.lstData, [bodyData]);

  const rootItems = useMemo(() => {
    if (lstData) {
      return lstData.filter((item) => item.parentGuidId === "0");
    }
    return [];
  }, [lstData]);

  const result = useMemo(() => {
    const resultObj: Record<
      string,
      { name: string; type: number; childItems?: LstDaum[] }
    > = {};

    rootItems.forEach((rootItem) => {
      const childItems = lstData?.filter(
        (item) => item.parentGuidId === rootItem.guidId
      );
      resultObj[rootItem.name] = {
        ...rootItem,
        childItems,
      };
    });

    return resultObj;
  }, [rootItems, lstData]);

  // hàm lấy dữ liệu theo type
  const getObjectByType = useCallback(
    (objectArray: Record<string, unknown>[], type: number): unknown => {
      return objectArray.find((obj) => obj.type === type);
    },
    []
  );

  // set type data
  const TYPE_MAP = {
    24: "lstDataCustomerReview",
    25: "lstDataImgReview",
    26: "obDataPartner",
    28: "obDataProBestSale",
    29: "obDataUtilities",
    30: "obDataProCombo",
    38: "obDataTradeMark",
  };

  // get value object
  const objectArray = useMemo(() => Object.values(result), [result]);

  const resultObj = useMemo(() => {
    const resultObj: Record<string, unknown> = {};

    for (const [type, name] of Object.entries(TYPE_MAP)) {
      resultObj[name] = getObjectByType(objectArray, Number(type));
    }

    return resultObj;
  }, [objectArray, getObjectByType]);

  // lấy lst ý kiến khách hàng type = 24
  const lstDataCustomerReview = resultObj["lstDataCustomerReview"];

  // lấy lst img review type = 25
  const lstDataImgReview = resultObj["lstDataImgReview"];

  // lấy ob đối tác type = 26
  const obDataPartner = resultObj["obDataPartner"];

  // lấy ob sản phẩm bán chạy type = 28
  const obDataProBestSale = resultObj["obDataProBestSale"];

  // lấy lst tiện ích theo type = 29
  const obDataUtilities = resultObj["obDataUtilities"];

  // lấy ob sản combo type = 30
  const obDataProCombo = resultObj["obDataProCombo"];

  // lấy ob thương hiệu type = 38
  const obDataTradeMark = resultObj["obDataTradeMark"];

  // lấy lst banner theo type = 8
  const bannerData = useMemo(() => {
    const bannerItems = Object.values(result).find((obj) =>
      obj.childItems?.some((item) => item?.type === 8)
    );
    return bannerItems?.childItems?.flat().map((item, index) => ({
      ...item,
      key: index,
    }));
  }, [result]);

  return (
    <div className="w-p-no-scroll">
      <BodyHomePage
        lstPrBestSale={obDataProBestSale}
        lstBanner={bannerData}
        lstTradeMark={obDataTradeMark!}
      />
      <AboutInforPage
        lstDataCombo={obDataProCombo}
        lstDataPartner={obDataPartner}
      />
      <HighLightInforPage
        lstDataCustomerReview={lstDataCustomerReview}
        lstUtilities={obDataUtilities}
        lstDataImgReview={lstDataImgReview}
      />
    </div>
  );
};

export default HomePage;
