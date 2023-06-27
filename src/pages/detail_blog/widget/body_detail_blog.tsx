import React from "react";
import parse from "html-react-parser";

interface Props {
  data: any;
}
const BodyDetailBlog: React.FC<Props> = ({ data }) => {
  return <div className="p-l-r-t-10 fadeInUp animated">{parse(data)}</div>;
};

export default BodyDetailBlog;
