import React from "react";
const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-overlay"></div>
      <div className="loading-content">
        <div className="loading-wrapper">
          <div className="loader-css-amation"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
