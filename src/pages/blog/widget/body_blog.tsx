import React from "react";
import { useNavigate } from "zmp-ui";
import { img_url, IDWEB, formatDate } from "../../../core/constant/constant";
import { LstDaum } from "../../../core/model/home/body_home_model";
import { saveNameDetailBlog } from "../../../core/db/db_storage";

interface Props {
  lstBlogContent: any;
}
const BodySupport: React.FC<Props> = ({ lstBlogContent }) => {
  // navigate
  const navigate = useNavigate();

  // xử lí chuyển trang
  function handleNextPage(name: string, id: number, link: string) {
    saveNameDetailBlog(name, id, link);
    navigate("/index_detail_blog");
    window.scrollTo(0, 0);
  }

  return (
    <div>
      {lstBlogContent?.map((e: LstDaum) => (
        <div
          className="col-md-6 mb-8"
          key={e.id}
          onClick={() => handleNextPage(e.name, e.id, e.link!)}
        >
          <div
            className="card border-0 fadeInUp animated"
            data-animate="fadeInUp"
          >
            <a className="hover-shine card-img-top">
              <img src={img_url + IDWEB + "/news/large/" + e.images} />
            </a>
            <div className="card-body p-0 text-left">
              <ul className="list-inline mt-4 fs-13 text-uppercase letter-spacing-01 lh-1 font-weight-600">
                <li className="list-inline-item pr-3 border-right border-2x"></li>
                <li className="list-inline-item pr-3">
                  {formatDate(e.createdAt)}
                </li>
              </ul>
              <h2 className="card-title fs-15 font-weight-500 mb-2">
                <a className="text-decoration-none">{e.name}</a>
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BodySupport;
