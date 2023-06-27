import React, { useEffect, useState } from "react";
import { BodyCart } from "../../path/page/cart/widget_cart";
import { Custom_Header } from "../../path/page/component";

import { getPhoneNumber } from "zmp-sdk";
import axios from "axios";
import {
  getAccessTokenZaloUser,
  getNumberPhoneByUser,
  setPhoneNumberByUser,
} from "../../core/db/db_storage";
import { useRecoilState } from "recoil";
import { setStatusLoadApiPhoneNumber } from "../../core/hook/state_home";
import { Key_App } from "../../core/constant/constant";

const CartPage = () => {
  // setState
  const [number, setNumer] = useState(0);

  // recoil
  const [statusLoad, setStatusLoad] = useRecoilState(
    setStatusLoadApiPhoneNumber
  );

  // get token user
  const number_phone = getNumberPhoneByUser();
  const token_user = getAccessTokenZaloUser();

  // lấy thông tin sdt user
  getPhoneNumber({
    success: async (data) => {
      console.log("connect api.........");
      await parseJsonToken(token_user, data.token, Key_App);
    },
    fail: (error) => {
      // Xử lý khi gọi api thất bại
      console.log(error);
    },
  });

  // xử lí parse số điện thoại từ ob data
  const parseJsonToken = async (
    userAccessToken: any,
    code: any,
    secretKey: string
  ) => {
    try {
      const response = await axios.get("https://graph.zalo.me/v2.0/me/info", {
        headers: {
          access_token: userAccessToken,
          code: code,
          secret_key: secretKey,
        },
      });
      // Xử lý phản hồi thành công
      console.log("number phone get api : " + response.data.data.number);
      setNumer(response.data.data.number);
      setPhoneNumberByUser(response.data.data.number);
      setStatusLoad(true);
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
      setStatusLoad(false);
    }
  };

  // useEffect
  useEffect(() => {
    number_phone === null ? getPhoneNumber() : null;
  }, [number]);

  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={"Giỏ hàng"}
          name={""}
          link_page={""}
          link_url={""}
        />
        <BodyCart />
      </main>
    </div>
  );
};

export default CartPage;
