import React from "react";
import { Custom_Header } from "../../path/page/component";
import { BodyContact } from "../../path/page/contact/widget_contact";

const ContactPage = () => {
  return (
    <div className="w-p-no-scroll w-p-m-top">
      <main id="content">
        <Custom_Header
          title={"Liên Hệ"}
          name={""}
          link_page={""}
          link_url={""}
        />
        <h2 className="text-center mt-9 mb-8">LIÊN HỆ VỚI ABERA</h2>
        <BodyContact />
      </main>
    </div>
  );
};

export default ContactPage;
