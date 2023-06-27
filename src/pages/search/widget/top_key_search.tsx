import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_Web, IDWEB } from "../../../core/constant/constant";
import { useNavigate } from "zmp-ui";
import { useRecoilState } from "recoil";
import { setKeySearch } from "../../../core/hook/state_home";

interface Props {
  onClose: () => void;
}
const TopKeySearch = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  // navigate
  const navigate = useNavigate();

  // useState
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  // recoil
  const [key, setKey] = useRecoilState(setKeySearch);

  // get data top key search
  const getDataTopKeySearch = async () => {
    try {
      const response = await axios.get(
        URL_Web + "searchsmobile/GetTopKeyWords?websiteId=" + IDWEB
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching top key search data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    getDataTopKeySearch();
  }, []);

  // handle next page
  function handleNextPage(key: string) {
    props.onClose();
    setKey(key);
    navigate("/index_search_result");
    window.scrollTo(0, 0);
  }

  return (
    <div className="col-s-top m-t-30">
      <div className="t-top-key">Top từ khóa</div>
      <div
        className={
          loading || data?.data.length === 0
            ? "row-s-top m-t-10 h-45"
            : "row-s-top m-t-10"
        }
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          data?.data?.map((e: any, index: number) => (
            <div
              className="t-key-s-top"
              key={index}
              onClick={() => handleNextPage(e.name)}
            >
              {e.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default TopKeySearch;
