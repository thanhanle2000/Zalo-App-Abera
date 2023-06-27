import React from "react";
import { useNavigate } from "zmp-ui";
import iconPayment from "/src/images/icon-pay.png";
import {
  img_url,
  IDWEB,
  img_header_large,
  formatPhoneNumber,
} from "../core/constant/constant";
import { openUrlInWebview } from "../core/hook/state_home";
import {
  InforHomeModel,
  ListMenu,
  ListPolicyInfo,
} from "../core/model/home/infor_home_model";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { openPhone } from "zmp-sdk";
import { saveNameCate } from "../core/db/db_storage";

interface Props {
  inforHome: InforHomeModel;
}
interface Item {
  id: number;
  name: string;
  link: string;
}

const FooterHome: React.FC<Props> = ({ inforHome }) => {
  // navigate
  const navigate = useNavigate();

  // get data company
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(
    inforHome?.website?.f_footerContent,
    "text/html"
  );
  const officeElements = parsedHTML.querySelectorAll("p");
  let f_address1 = "";
  let f_address2 = "";
  let f_address3 = "";
  if (officeElements.length >= 3) {
    f_address1 = officeElements[0].textContent ?? "";
    f_address2 = officeElements[1].textContent ?? "";
    f_address3 = officeElements[2].textContent ?? "";
  }
  // get data icon
  const getItemNet: Item[] = [
    { id: 1, name: "fab fa-twitter", link: "" },
    { id: 2, name: "fab fa-facebook-f", link: inforHome?.website?.f_facebook },
    { id: 3, name: "fab fa-instagram", link: inforHome?.website?.f_instagram },
    { id: 4, name: "fab fa-youtube", link: inforHome?.website?.f_tiktok },
  ];
  // xử lí mở webview
  function url_web_view(url: string) {
    openUrlInWebview(url);
  }

  // xử lí chuyển trang
  function handleNextPage(
    name: string,
    id: number,
    link: string,
    isCheck: boolean
  ) {
    let nextPage = "";
    if (link === "/") {
      nextPage = "/";
    }
    if (link === "abera") {
      navigate("/index_info");
    } else {
      navigate(
        isCheck === true ? "/index_product_all" : "/index_customer_support"
      );
    }
    saveNameCate(name, id, link === "abera" ? "gioi-thieu" : link);
    window.scrollTo(0, 0);
  }

  // open phone
  const openCallScreen = (phone: string) => {
    openPhone({
      phoneNumber: phone,
      success: () => {
        // xử lý khi gọi api thành công
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };

  // handle next page contact
  function nextPageContact() {
    window.scrollTo(0, 0);
    navigate("/index_contact");
  }

  return (
    <footer className="pt-lg-14 footer">
      <div className="container container-xl">
        <div className="row">
          <div className="col-lg col-md-4 col-12 mb-7 mb-lg-0">
            <h3 className="fs-20 mb-3">{inforHome?.website?.f_title1}</h3>
            <div>
              <p className="fs-14 row-hot">
                <LocalPhoneIcon className="icon-s-17" />
                <span className="title-hot">Hotline :</span>
                <strong
                  className="text-secondary"
                  onClick={() =>
                    openCallScreen(
                      inforHome?.website?.c_hotline1 ||
                        inforHome?.website?.c_hotline2
                    )
                  }
                >
                  {formatPhoneNumber(
                    inforHome?.website?.c_hotline1 ||
                      inforHome?.website?.c_hotline2
                  )}
                </strong>
              </p>
              <p className="fs-14 row-hot">
                <EmailIcon className="icon-s-17" />
                <span className="title-hot">Email :</span>
                <strong className="text-secondary">
                  {inforHome?.website?.f_email1}
                </strong>
              </p>
              <div className="fs-14 mb-3">{f_address1}</div>
              <div className="fs-14 mb-3">{f_address2}</div>
              <div className="fs-14 mb-3">{f_address3}</div>
            </div>
          </div>
          <div className="col-lg col-md-4  col-12 mb-7 mb-lg-0">
            <h3 className="fs-20 mb-3">Liên kế hữu ích</h3>
            <ul className="list-unstyled mb-0">
              {inforHome?.menuHeaderData?.listMenus.map(
                (e: ListMenu, index: number) => (
                  <div key={`menu-${e.id}-${index}`}>
                    {e.parentLevel !== 2 ? null : (
                      <li
                        className="pb-1"
                        onClick={() =>
                          handleNextPage(e.name, e.id, e.link, true)
                        }
                      >
                        <a className="text-body lh-175">{e.name}</a>
                      </li>
                    )}
                  </div>
                )
              )}
            </ul>
          </div>
          <div className="col-lg col-md-4 col-12 mb-7 mb-lg-0">
            <h3 className="fs-20 mb-3">Về chúng tôi</h3>
            <ul className="list-unstyled mb-0">
              {inforHome?.menuHeaderData?.listPolicyInfo.map(
                (e: ListPolicyInfo, index: number) => (
                  <div key={`policy-${e.id}-${index}`}>
                    <li
                      className="pb-1"
                      onClick={() =>
                        handleNextPage(e.name, e.id, e.link, false)
                      }
                    >
                      <a className="text-body lh-175">{e.name}</a>
                    </li>
                  </div>
                )
              )}
            </ul>
          </div>
          <div className="col-lg-5 col-12 mb-9 mb-lg-0">
            <h3 className="mb-2">{inforHome?.website?.f_title3}</h3>
            <p className="lh-2">{inforHome?.website?.f_title4}</p>
            <div onClick={nextPageContact}>
              <form className="pt-4">
                <div className="input-group position-relative">
                  <input
                    type="email"
                    id="email"
                    className="form-control bg-white rounded-left"
                    placeholder="Nhập địa chỉ email của bạn"
                    style={{ pointerEvents: "none" }}
                  />
                  <button
                    className="btn btn-secondary bg-hover-primary border-hover-primary"
                    style={{ pointerEvents: "none" }}
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row mt-0 mt-lg-15 align-items-center">
          <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center order-2 order-lg-1 mt-4 mt-md-7 mt-lg-0">
            <p className="mb-0 d-magrin-auto">
              {inforHome?.website?.f_copyright}
            </p>
            {
              /* <ul className="list-inline fs-18 ml-3 mb-0">
              {getItemNet.map((e: Item) => (
                <li
                  className="list-inline-item mr-4"
                  key={e.id}
                  onClick={() => url_web_view(e.link)}
                >
                  <a>
                    <i className={e.name} />
                  </a>
                </li>
              ))}
            </ul> */
              // tạm ẩn đợi xét duyệt
            }
          </div>
          <div className="col-12 col-lg-4 text-md-center order-1 order-lg-2 row-img">
            <img
              src={
                img_url +
                IDWEB +
                img_header_large +
                inforHome?.website?.h_logoHeader
              }
              alt="Glowing"
              className="w-50-img"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-md-right order-3 mt-4 mt-md-7 mt-lg-0 m-t-b-15 d-magrin-auto">
            <img className="m-b-30" src={iconPayment} alt="Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
