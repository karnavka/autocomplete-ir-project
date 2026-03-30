import React from "react";
import "./SearchBar.css";
import { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { Parameters } from "./Parameters";

type SearchBarProps = {
  onSearch: (query: string, param: string) => void;
  param: string;
  SetParameters: (param: string) => void;
  clusterResults: () => void;
};

export const SearchBar = ({
  onSearch,
  param,
  SetParameters,
  clusterResults
}: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query, param);
    }
  };

  const [query, setQuery] = useState("");
  const [popUp, openPopUp] = useState(false);
  const closePopUp = async () => {
    openPopUp(false);
  };
  return (
    <div className="inputAndPopup">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Шукати тут..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="cluster-button" onClick={clusterResults}>
          Кластеризувати
        </button>
        <button id="parameters-button" onClick={() => openPopUp(true)}>
          Параметри
        </button>
      </div>
      {popUp && (
        <div className="popUP">
          <Parameters
            SetParameters={SetParameters}
            closePopUp={closePopUp}
            param={param}
          />
        </div>
      )}
    </div>
  );
};
