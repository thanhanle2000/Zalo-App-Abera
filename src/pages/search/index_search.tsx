import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  HistorySearch,
  TextFieldSearch,
  TopKeySearch,
} from "../../path/page/search/widget_search";

interface Props {
  onClose: () => void;
}
const SearchPage = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose }, ref) => {
    return (
      <div
        className="w-p-no-scroll bk-gr"
        ref={ref}
        role="dialog"
        tabIndex={-1}
      >
        <div className="r-search">
          <div onClick={onClose} className="bk-close-i">
            <CloseIcon className="i-close-s" />
          </div>
          <div className="text-h-search">Tìm kiếm</div>
        </div>
        <TextFieldSearch onClose={onClose} />
        <TopKeySearch onClose={onClose} />
        <HistorySearch onClose={onClose} />
      </div>
    );
  }
);

export default SearchPage;
