import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { Suggestion } from "./components/Suggestion";
import Logo from "./assets/guglya.png";
import FlutterShyGif from "./assets/flutter.gif";
import CatGif from "./assets/cat.gif";
import SillyGif from "./assets/silly.gif";

function App() {
  const [results, setResults] = useState<string[]>([]);

  return (
    <div className="App">
      <div className="GifHolder">
        <img src={SillyGif} className="gif" />
        <img src={FlutterShyGif} className="gif" />
      </div>

      <div className="search-container">
        <img src={Logo} />
        <SearchBar setResults={setResults}  />
        <Suggestion results={results} />
        <img src={CatGif} id="nyan-cat" />
      </div>
    </div>
  );
}

export default App;