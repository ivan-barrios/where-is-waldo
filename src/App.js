import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import "./style.css";
import Leadership from "./components/Leadership";

const App = () => {
  const [bearColor, setBearColor] = useState("white");
  const [monkeyColor, setMonkeyColor] = useState("white");
  const [sealColor, setSealColor] = useState("white");

  return (
    <BrowserRouter>
      <Header
        bearColor={bearColor}
        monkeyColor={monkeyColor}
        sealColor={sealColor}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Game
              setBearColor={setBearColor}
              setMonkeyColor={setMonkeyColor}
              setSealColor={setSealColor}
            />
          }
        />
        <Route path="/leadership" element={<Leadership />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
