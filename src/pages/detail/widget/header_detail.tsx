import React from "react";
import { useNavigate } from "zmp-ui";
interface Props {
  nameDetail: string;
}
const HeaderDetail: React.FC<Props> = ({ nameDetail }) => {
  // navigate
  const navigate = useNavigate();

  // handle next page product
  function handleNextPage(id: number) {
    let link = "";
    if (id === 1) {
      link = `/`;
    } else if (id === 2) {
      link = "/index_product_all";
    }
    navigate(link);
    window.scrollTo(0, 0);
  }
  return (
    <section className="py-2 bg-gray-2">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-site py-0 d-flex justify-content-center">
            <li className="breadcrumb-item">
              <a
                className="text-decoration-none text-body"
                onClick={() => handleNextPage(1)}
              >
                Trang chủ
              </a>
            </li>
            <li className="breadcrumb-item pl-0 d-flex align-items-center">
              <a
                className="text-decoration-none text-body"
                onClick={() => handleNextPage(2)}
              >
                Tất cả sản phẩm
              </a>
            </li>
            <li
              className="breadcrumb-item active pl-0 d-flex align-items-center"
              aria-current="page"
            >
              {nameDetail}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default HeaderDetail;
