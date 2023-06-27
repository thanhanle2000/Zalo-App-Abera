import parse from "html-react-parser";
import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  label: string;
  description: string;
}
const AccordionCard: React.FC<Props> = ({ id, label, description }) => {
  // setState
  const [isCollapsed, setIsCollapsed] = useState(id === 1);

  // useEffect
  useEffect(() => {
    setIsCollapsed(id === 1);
  }, [id]);

  // handle click
  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      {label === "" ? null : (
        <div className="card border-0 bg-transparent">
          <div
            className="card-header border-0 d-block d-md-none bg-transparent px-0 py-1"
            id={`headingDetails-${label}`}
          >
            <h5 className="mb-0">
              <button
                className="btn lh-2 fs-18 py-1 px-6 shadow-none w-100 collapse-parent border text-primary"
                data-toggle="false"
                data-target={`#detail-collapse-${label}`}
                aria-expanded={isCollapsed}
                aria-controls={`detail-collapse-${label}`}
                onClick={handleClick}
              >
                {label}
              </button>
            </h5>
          </div>
          <div
            id={`detail-collapse-${label}`}
            className={`collapsible collapse ${isCollapsed ? "show" : ""}`}
            aria-labelledby={`headingDetails-${label}`}
            data-parent="#collapse-tabs-accordion-01"
          >
            <div
              id={`accordion-style-${label}`}
              className="accordion accordion-01 border-md-0 border p-md-0 p-6"
            >
              <div>{parse(description)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccordionCard;
