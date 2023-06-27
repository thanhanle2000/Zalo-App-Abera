import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IDWEB, URL_Web, domain_abera } from "../../../core/constant/constant";
import { setStateSnack } from "../../../core/hook/state_home";
import {
  CustomSnackbar,
  TextFormContact,
} from "../../../path/page/contact/widget_contact";

const BodyContact = () => {
  // setState
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // snackbar
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    question: "",
  });

  // recoil
  const [snack, setSnack] = useRecoilState(setStateSnack);

  // useEffect
  useEffect(() => {
    if (snack === 1) {
      const timeout = setTimeout(() => {
        setSnack(0);
      }, 1800);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [snack, setSnack]);

  // gán biến data empty
  const isFormDataEmpty = Object.values(formData).some((value) => value === "");

  // handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isFormDataEmpty) {
      setFormError(true);
    } else {
      setIsLoading(true);
      try {
        await postSubmitContact();
        setSnack(1);
        setSnackbarVisible(true);
        setTimeout(() => {
          setIsLoading(false);
          setFormError(false);
          setFormData({
            email: "",
            name: "",
            phone: "",
            question: "",
          });
        }, 300);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  // hàm xử lí gửi contact
  const postSubmitContact = async () => {
    const param = {
      websiteId: IDWEB,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      note: formData.question,
      domainWebsite: domain_abera,
    };
    const respose = await axios.post(
      URL_Web + "HomeMobile/SendContactMobile",
      param
    );
    return respose.data;
  };

  // gán text error
  const text_error = "Vui lòng nhập thông tin này!";

  return (
    <>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="col-lg-12">
          <form onSubmit={handleSubmit}>
            <TextFormContact
              id={"name"}
              name={"name"}
              className={`form-control ${
                formError && formData.name === "" && !isLoading
                  ? "form-control-error"
                  : ""
              }`}
              placeholder={"Tên của bạn"}
              value={formData.name}
              onChange={(e: any) =>
                setFormData({ ...formData, name: e.target.value })
              }
              showError={formError && formData.name === "" && !isLoading}
              errorMessage={text_error}
            />
            <TextFormContact
              id={"phone"}
              name={"phone"}
              className={`form-control ${
                formError && formData.phone === "" && !isLoading
                  ? "form-control-error"
                  : ""
              }`}
              placeholder={"Số điện thoại"}
              value={formData.phone}
              onChange={(e: any) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              showError={formError && formData.phone === "" && !isLoading}
              errorMessage={text_error}
            />
            <TextFormContact
              id={"email"}
              name={"email"}
              className={`form-control ${
                formError && formData.email === "" && !isLoading
                  ? "form-control-error"
                  : ""
              }`}
              placeholder={"Email"}
              value={formData.email}
              onChange={(e: any) =>
                setFormData({ ...formData, email: e.target.value })
              }
              showError={formError && formData.email === "" && !isLoading}
              errorMessage={text_error}
            />
            <TextFormContact
              id={"note"}
              name={"note"}
              className={`form-control ${
                formError && formData.question === "" && !isLoading
                  ? "form-control-error"
                  : ""
              }`}
              placeholder={"Nhập câu hỏi của bạn ở đây"}
              value={formData.question}
              onChange={(e: any) =>
                setFormData({ ...formData, question: e.target.value })
              }
              showError={formError && formData.question === "" && !isLoading}
              errorMessage={text_error}
            />
            <div className="r-submit-contact m-t-20">
              <button type="submit" className="btn btn-confirm-address m-b-30">
                GỬI THÔNG TIN
              </button>
              <CustomSnackbar
                open={isSnackbarVisible}
                title={"Gửi thông tin liên hệ thành công."}
                handleClose={() => setSnackbarVisible(false)}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BodyContact;
