import "./SearchBar.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  setResults: React.Dispatch<React.SetStateAction<string[]>>;
  
};

export const SearchBar = ({ setResults }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = async (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/autocomplete?q=${encodeURIComponent(value)}&limit=5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data: string[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  };

  return (
    <div className="inputAndPopup">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Шукати тут..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};