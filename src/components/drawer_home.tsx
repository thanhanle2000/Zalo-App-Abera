import React, { useState } from "react";
import { img_url, IDWEB, img_header_large } from "../core/constant/constant";
import { InforHomeModel } from "../core/model/home/infor_home_model";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "zmp-ui";
import { useRecoilState } from "recoil";
import { saveNameCate } from "../core/db/db_storage";
import { setEleventPage } from "../core/hook/state_home";

interface Props {
  inforHome: InforHomeModel;
  idActive: number;
  onClose: () => void;
  onOpen: () => void;
}
interface Item {
  id: number;
  name: string;
}

const DrawerHome: React.FC<Props> = ({
  inforHome,
  idActive,
  onClose,
  onOpen,
}) => {
  // navigate
  const navigate = useNavigate();

  // useState
  const [isList, setIsList] = useState(false);
  const [idPage, setIdPage] = useRecoilState(setEleventPage);

  // handle in/ut list
  function handleIsList() {
    setIsList(!isList);
  }

  // xử lí chuyển trang theo cate
  function handleNextPageByCate(
    name: string,
    id: number,
    link: string,
    isCheck: boolean
  ) {
    let nextPage = "";
    if (link === "/") {
      nextPage = "/";
    } else if (link === "san-pham") {
      nextPage = "/index_product_all";
    } else if (link === "lien-he") {
      nextPage = "/index_contact";
    } else if (link === "blog") {
      nextPage = "/index_blog";
    } else if (link === "gioi-thieu") {
      nextPage = "/index_info";
    }
    onClose();
    setTimeout(() => {
      navigate(isCheck === true ? "/index_cate" : nextPage);
      setIdPage(id);
      saveNameCate(name, id, link);
      window.scrollTo(0, 0);
    }, 100);
  }

  // get data item net
  const getItemNet: Item[] = [
    {
      id: 1,
      name: "fab fa-pinterest-p",
    },
    {
      id: 2,
      name: "fab fa-facebook-f",
    },
    {
      id: 3,
      name: "fab fa-instagram",
    },
    {
      id: 4,
      name: "fab fa-twitter",
    },
  ];

  // get data item blogs
  interface Menu {
    name: string;
    link: string;
  }

  interface ParentMenu extends Menu {
    id: number;
    children?: ParentMenu[];
  }

  const parentMenus: ParentMenu[] = [];

  inforHome?.menuHeaderData?.listMenus
    .filter((menu) => menu.parentGuidId === "0")
    .sort((a, b) => a.sortBy - b.sortBy)
    .forEach((parentMenu) => {
      const children: ParentMenu[] = inforHome?.menuHeaderData?.listMenus
        .filter((menu) => menu.parentGuidId === parentMenu.guidId)
        .map((child) => ({
          id: child.id,
          name: child.name,
          link: child.link,
          children: inforHome?.menuHeaderData?.listMenus
            .filter((menu) => menu.parentGuidId === child.guidId)
            .map((subChild) => ({
              id: subChild.id,
              name: subChild.name,
              link: subChild.link,
            })),
        }));

      const newParentMenu: ParentMenu = {
        id: parentMenu.id,
        name: parentMenu.name,
        link: parentMenu.link,
        children: children,
      };
      parentMenus.push(newParentMenu);
    });
  const img_header = inforHome?.website?.h_logoHeader;
  return (
    <div className="bg-white col-dis-draw">
      <div className="canvas-overlay canvas-close"></div>
      <div className="pt-5 pb-7 card border-0 h-100">
        <div className="d-flex align-items-center card-header border-0 py-0 pl-8 pr-7 mb-9 bg-transparent">
          <a
            onClick={() => handleNextPageByCate("", 0, "/", false)}
            className="d-block w-179px"
          >
            <img
              src={img_url + IDWEB + img_header_large + img_header}
              alt="Glowing"
            />
          </a>
          <span
            className="d-inline-block text-right fs-24 ml-auto lh-1 text-primary"
            onClick={onClose}
          >
            <i className="fal fa-times" />
          </span>
        </div>
        <div className="overflow-y-auto pl-8 pr-7 card-body pt-0">
          <ul className="navbar-nav px-0 ">
            {parentMenus.map((parentMenu, index: number) => (
              <li
                className="dropdown py-1 px-0 "
                key={`parentMenu-${parentMenu.id}-${index}`}
              >
                <a
                  className="p-0 text-header"
                  data-toggle="dropdown"
                  onClick={() =>
                    parentMenu.link === "#"
                      ? null
                      : handleNextPageByCate(
                          parentMenu.name,
                          parentMenu.id,
                          parentMenu.link,
                          false
                        )
                  }
                >
                  {parentMenu.name}
                  {parentMenu?.children && parentMenu?.children?.length > 0 ? (
                    <div className="i-c-12" onClick={handleIsList}>
                      <ArrowForwardIosIcon />
                    </div>
                  ) : null}
                </a>
                {isList === false ? null : (
                  <div className="x-animated x-fadeInUp">
                    {parentMenu.children?.map((child, childIndex: number) => (
                      <div
                        key={`child-${parentMenu.id}-${child.id}-${childIndex}`}
                      >
                        <h4 className="dropdown-header text-secondary fs-16 color-header-item">
                          {child.name}
                        </h4>
                        {child?.children?.map(
                          (childItem, childItemIndex: number) => (
                            <div
                              className={
                                idActive === childItem.id
                                  ? "dropdown-item active m-d-10"
                                  : "dropdown-item m-d-10"
                              }
                              onClick={() =>
                                handleNextPageByCate(
                                  childItem.name,
                                  childItem.id,
                                  childItem.link,
                                  true
                                )
                              }
                              key={`childItem-${parentMenu.id}-${child.id}-${childItem.id}-${childItemIndex}`}
                            >
                              <a className="dropdown-link">{childItem.name}</a>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 mt-auto pb-0 pt-4 m-b-40">
        {
          /* <ul className="list-inline d-flex align-items-center mb-3">
            {getItemNet.map((e: Item) => (
              <li className="list-inline-item mr-4" key={e.id}>
                <a href="#" className="fs-20 lh-1">
                  <i className={e.name} />
                </a>
              </li>
            ))}
          </ul> */
          // tạm ẩn đợi xét duyệt
        }
        <p className="mb-0 text-gray p-l-6">
          {inforHome?.website?.f_copyright}
        </p>
      </div>
    </div>
  );
};

export default DrawerHome;
