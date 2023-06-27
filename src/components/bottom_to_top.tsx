import React from "react";
interface Props {
  onClick: () => void;
}
const BottomToTop: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      style={{ transition: "opacity 0.3s" }}
      className={"position-fixed pos-fixed-bottom-right p-6 z-index-10"}
    >
      <a
        onClick={onClick}
        href="#"
        className="text-decoration-none bg-white text-primary hover-white bg-hover-primary shadow p-0 w-48px h-48px rounded-circle fs-20 d-flex align-items-center justify-content-center"
        title="Back To Top"
      >
        <i className="fal fa-arrow-up" />
      </a>
    </div>
  );
};

export default BottomToTop;
