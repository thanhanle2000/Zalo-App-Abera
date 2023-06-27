import Drawer from "@mui/material/Drawer";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { useNavigate } from "zmp-ui";
import { IDWEB, img_header_large, img_url } from "../core/constant/constant";
import { InforHomeModel } from "../core/model/home/infor_home_model";
import { DrawerHome } from "../path/page/component";
import { SearchPage } from "../path/page/page";
import { saveNameCate } from "../core/db/db_storage";

interface Props {
  inforHome: InforHomeModel;
  idActives: number;
  isCheck: boolean;
}
const CustomHeader: React.FC<Props> = ({ inforHome, idActives, isCheck }) => {
  // navigate
  const navigate = useNavigate();

  // image
  const image = inforHome?.website?.h_logoHeader;

  // Khởi tạo state
  const [state, setState] = useState({
    left: false, // Giá trị khởi tạo của anchor "left"
    // Khác anchor nếu cần thiết
  });
  const [modalOpen, setModalOpen] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  // Hàm xử lý sự kiện khi nhấp vào nút để mở/khóa Drawer
  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  // handle close
  const handleCloseDrawer = () => {
    setState({ ...state, left: false });
  };

  // handle open
  const handleOpenDrawer = () => {
    setState({ ...state, left: true });
  };

  // handle close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // handle search
  const handleSearch = () => {
    setModalOpen(true);
  };

  // handle next page
  function handleNextPageHome() {
    navigate("/");
    saveNameCate("", 0, "/");
    window.scrollTo(0, 0);
  }
  return (
    <header className="main-header navbar-light header-sticky header-sticky-smart position-absolute fixed-top">
      <div className="sticky-area">
        <div
          className={
            isCheck === true
              ? "container container-xxl"
              : "container container-xxl bk-header-w"
          }
        >
          <nav className="navbar navbar-expand-xl px-0 d-block">
            <div className="d-none d-xl-block">
              <div className="d-flex align-items-center flex-nowrap">
                <div className="w-50">
                  <div className="d-flex mt-3 mt-xl-0 align-items-center w-100">
                    <a
                      className="navbar-brand d-inline-block py-0"
                      onClick={handleNextPageHome}
                    >
                      <img
                        src={img_url + IDWEB + img_header_large + image}
                        alt="Glowing"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center d-xl-none h-55">
              <React.Fragment key={"left"}>
                <button
                  className="navbar-toggler border-0 px-0 canvas-toggle"
                  type="button"
                  onClick={toggleDrawer("left", true)}
                >
                  <span className="fs-24 toggle-icon" />
                </button>
                <Drawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  <div
                    style={{
                      width: "320px",
                      height: "100%",
                    }}
                  >
                    <DrawerHome
                      inforHome={inforHome!}
                      idActive={idActives}
                      onClose={handleCloseDrawer}
                      onOpen={handleOpenDrawer}
                    />
                  </div>
                </Drawer>
              </React.Fragment>
              <div className="mx-auto">
                <a
                  className="navbar-brand d-inline-block mr-0"
                  onClick={handleNextPageHome}
                >
                  <img
                    src={img_url + IDWEB + img_header_large + image}
                    alt="Glowing"
                    loading="lazy"
                  />
                </a>
              </div>
              <a
                className="nav-search d-flex align-items-center"
                onClick={handleSearch}
              >
                <svg className="icon icon-magnifying-glass-light fs-28">
                  <use xlinkHref="#icon-magnifying-glass-light" />
                </svg>
                <span className="d-none d-xl-inline-block ml-2 font-weight-500">
                  Search
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="modal-p"
        >
          <SearchPage ref={searchRef} onClose={handleCloseModal} />
        </Modal>
      )}
    </header>
  );
};

export default CustomHeader;
