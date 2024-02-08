import { useNavigate } from "react-router-dom";
import { generate, count } from "random-words";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearsuggestion,
  setfocused,
  setsearchterm,
} from "../Store/Slices/SearchSlice";
import { useSelector } from "react-redux";

const useSearchBarFN = () => {
  const [inputtext, setinputtext] = useState("");
  const isfocused = useSelector((store) => store.search.isfocused);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handlesubmit whic redirect us to other site
  const handlesubmit = (e, gerneatedword) => {
    dispatch(clearsuggestion());

    if (!gerneatedword) {
      dispatch(setsearchterm(inputtext));
      setinputtext(e.target.value);
    } else {
      dispatch(setsearchterm(gerneatedword));
      setinputtext(gerneatedword);
    }

    navigate("/search");
  };

  //suggestion handler
  function searchSuggestionHandler(e) {
    setinputtext(e.target.value);
    if (!isfocused) {
      dispatch(setfocused(true));
    }
  }

  //list items use for search
  function suggestionTextuse(e) {
    e.preventDefault();
    const selectedSuggestion = e.target.textContent;
    handlesubmit(e, selectedSuggestion);
  }

  //random text use for search
  function randomtext(e) {
    let gerneatedword = generate();
    handlesubmit(e, gerneatedword);
  }

  return {
    inputtext,
    handlesubmit,
    searchSuggestionHandler,
    suggestionTextuse,
    randomtext,
    setinputtext,
  };
};

export default useSearchBarFN;
