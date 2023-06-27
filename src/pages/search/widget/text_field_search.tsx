import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "zmp-ui";
import { IDWEB, URL_Web } from "../../../core/constant/constant";
import { checkStatusKey, setKeySearch } from "../../../core/hook/state_home";

interface Props {
  onClose: () => void;
}
const TextFieldSearch = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    // navigate
    const navigate = useNavigate();

    // useEffect
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);

    // recoil
    const [status, setStatus] = useRecoilState(checkStatusKey);
    const [key, setKey] = useRecoilState(setKeySearch);

    // handle search
    const handleSearch = () => {
      if (searchTerm.trim() === "") {
        setError("Nội dung tìm kiếm không được trống!");
      } else {
        setError("");
        setSearchTerm("");
        addKeywordToLocalStorage(searchTerm);
        updateKeySearchToServer(searchTerm);
      }
    };

    // handle key down
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    // useEffect
    useEffect(() => {
      const storedKeywords = JSON.parse(
        localStorage.getItem("searchKeywords") || "[]"
      );
      setKeywords(storedKeywords);
    }, []);

    // add key search to text field
    const addKeywordToLocalStorage = (keyword: string) => {
      if (keyword && typeof keyword === "string" && keyword !== "") {
        const storedKeywords = JSON.parse(
          localStorage.getItem("keywords") || "[]"
        );

        if (!storedKeywords.some((item: any) => item.key === keyword)) {
          setStatus((prev) => !prev);

          const newKeyword = {
            id: storedKeywords.length + 1,
            key: keyword,
          };
          const updatedKeywords = [...storedKeywords, newKeyword];
          localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
          setKeywords(updatedKeywords);
        }
      }
    };

    // handle next page
    function handleNextPage(key: string) {
      props.onClose();
      setKey(key);
      navigate("/index_search_result");
      window.scrollTo(0, 0);
    }

    // update key search to server
    const updateKeySearchToServer = async (key: string) => {
      const param = {
        key: key,
        websiteId: IDWEB,
      };
      try {
        const reponse = await axios.post(
          URL_Web + "SearchsMobile/UpdateKeyWords",
          param
        );
        if (reponse.data.success === true) {
          handleNextPage(key);
        }
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <div className="m-t-30">
        <FormControl variant="standard" fullWidth>
          <Input
            className={error ? "form-s-i-error" : "form-s-i"}
            placeholder="Bạn cần tìm gì hôm nay?"
            ref={ref}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="i-s-text-field" />
              </InputAdornment>
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              paddingBottom: "5px",
            }}
            disableUnderline
            {...props}
          />
        </FormControl>
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }
);

export default TextFieldSearch;
