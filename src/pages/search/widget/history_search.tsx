import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getStatusKey, setKeySearch } from "../../../core/hook/state_home";
import { useNavigate } from "zmp-ui";
interface Props {
  onClose: () => void;
}
const HistorySearch = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose }, ref) => {
    // navigate
    const navigate = useNavigate();

    // recoil
    const [key, setKey] = useRecoilState(setKeySearch);

    // handle next page
    function handleNextPage(key: string) {
      onClose();
      setKey(key);
      window.scrollTo(0, 0);
      navigate("/index_search_result");
    }

    // get data history key local
    const storedKeywords = JSON.parse(localStorage.getItem("keywords") || "[]");

    // status check update key
    const status = useRecoilValue(getStatusKey);

    // useState
    const [data, setData] = useState<any>([]);

    // useEffect
    useEffect(() => {
      setData(storedKeywords);
    }, [status]);

    return (
      <div className="col-s-top m-t-30">
        <div className="t-top-key">Lịch sử tìm kiếm</div>
        <div
          className={
            data.length === 0 ? "row-s-top m-t-10 h-45" : "row-s-top m-t-10"
          }
        >
          {data.map((e: any, index: number) => (
            <div
              className="t-key-s-top"
              key={index}
              onClick={() => handleNextPage(e.key)}
            >
              {e.key}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default HistorySearch;
