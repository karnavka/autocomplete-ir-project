declare module "*.png";
declare module "*.svg";
import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar.tsx";
import Logo from "./assets/guglya.png";
import { SearchResults } from "./components/SearchResults.tsx";
import FlutterShyGif from "./assets/flutter.gif";
import CatGif from "./assets/cat.gif";
import SillyGif from "./assets/silly.gif";
import { Parameters } from "./components/Parameters.tsx";
import { ClusterResults } from "./components/ClusterResults.tsx";

function App() {
  const [param, setParam] = useState("zone");

  const [results, setResults] = useState([]);

  const [clusters, setClusters] = useState([]);

  const [lastQuery, setLastQuery] = useState("");

  const search = async (query: string, param: string) => {
    console.log("Searching for:", query);
    setLastQuery(query);
    setClusters([]);

    if (param === "zone") {
      fetch(`http://localhost:8080/searchByZone?q=${query}`)
        .then((response) => response.json())
        .then((json) => {
          setResults(json);
        });
    } else if (param === "wildcard") {
      fetch(`http://localhost:8080/wildCardSearch?q=${query}`)
        .then((response) => response.json())
        .then((json) => {
          setResults(json);
        });
    }
  };

  const setParameters = async (param: string) => {
    setParam(param);
  };

  const clusterResults = async () => {
    fetch(`http://localhost:8080/clusterize`)
      .then((response) => response.json())
      .then((json) => {
        setClusters(json);
      });
  };

  return (
    <div className="App">
      <div className="GifHolder">
        {" "}
        <img src={SillyGif} className="gif" />{" "}
        <img src={FlutterShyGif} className="gif" />{" "}
      </div>
      <div className="search-container">
        <img src={Logo} />
        <SearchBar
          onSearch={search}
          param={param}
          SetParameters={setParameters}
          clusterResults={clusterResults}
        />
        {/*  <div>SearchHints </div> */}
        <SearchResults results={results} />
        <ClusterResults clusters={clusters} />
        <img src={CatGif} id="nyan-cat" />
      </div>
    </div>
  );
}

export default App;
