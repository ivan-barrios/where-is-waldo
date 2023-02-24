import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import "./style.css";
import Leadership from "./components/Leadership";

const App = () => {
  const [bearColor, setBearColor] = useState("white");
  const [monkeyColor, setMonkeyColor] = useState("white");
  const [sealColor, setSealColor] = useState("white");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <BrowserRouter>
      <Header
        bearColor={bearColor}
        monkeyColor={monkeyColor}
        sealColor={sealColor}
        minutes={minutes}
        seconds={seconds}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Game
              setBearColor={setBearColor}
              setMonkeyColor={setMonkeyColor}
              setSealColor={setSealColor}
              minutes={minutes}
              seconds={seconds}
            />
          }
        />
        <Route path="/leadership" element={<Leadership />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
