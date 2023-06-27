import React from "react";

const LogoHeader = ({ logo }) => {
  return (
    <div className="logo-header">
      <div className="r-header-cus">
        <img src={logo} alt="Logo" />
        <div className="title-cus-header">Abera Việt Nam</div>
      </div>
    </div>
  );
};

export default LogoHeader;
