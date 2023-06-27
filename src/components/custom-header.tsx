import React from "react";
import { useNavigate } from "zmp-ui";
import { saveNameCate } from "../core/db/db_storage";

interface Props {
  title: string;
  name: string;
  link_page: string;
  link_url: string;
}
const Custom_Header: React.FC<Props> = ({
  title,
  name,
  link_page,
  link_url,
}) => {
  // navigate
  const navigate = useNavigate();
  // handle next page
  function handleNextPageHome(url: string, type: number) {
    navigate(type === 1 ? "/" : url);
    saveNameCate(name, 0, link_url ?? "");
    window.scrollTo(0, 0);
  }

  const handleHomeClick = () => {
    handleNextPageHome(link_page, 1);
  };

  const handleCategoryClick = () => {
    handleNextPageHome(link_page, 2);
  };

  return (
    <section className="py-2 bg-gray-2 m-t-15">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-site py-0 d-flex justify-content-center">
            <li className="breadcrumb-item">
              <a
                className="text-decoration-none text-body"
                onClick={handleHomeClick}
              >
                Trang chủ
              </a>
            </li>
            {name === "" ? null : (
              <li
                className="breadcrumb-item pl-0 d-flex align-items-center"
                aria-current="page"
                onClick={handleCategoryClick}
              >
                {name}
              </li>
            )}
            <li
              className="breadcrumb-item active pl-0 d-flex align-items-center"
              aria-current="page"
            >
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Custom_Header;
