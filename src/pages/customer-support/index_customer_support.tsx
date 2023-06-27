import React from "react";
import { Custom_Header } from "../../path/page/component";
import { getDataNameCate } from "../../core/db/db_storage";

const CustomerSupportPage = () => {
  // get data
  const data = getDataNameCate();
  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={data?.nameCate}
          name={""}
          link_page={""}
          link_url={""}
        />
        <h2
          className="mb-2 fs-34 text-center mt-9 mb-8 fadeInUp animated"
          data-animate="fadeInUp"
        >
          {data?.nameCate}
        </h2>
      </main>
    </div>
  );
};

export default CustomerSupportPage;
