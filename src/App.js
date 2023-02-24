import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import "./style.css";
import Leadership from "./components/Leadership";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const App = () => {
  const [bearColor, setBearColor] = useState("white");
  const [monkeyColor, setMonkeyColor] = useState("white");
  const [sealColor, setSealColor] = useState("white");
  const [username, setUsername] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [displayWin, setDisplayWin] = useState(false);
  const [displayRestart, setDiplayRestart] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setSeconds((prevSec) => prevSec + 1);
        if (seconds === 59) {
          setMinutes((prevMin) => prevMin + 1);
          setSeconds(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, seconds]);

  const handleWin = () => {
    setDisplayWin(true);
    setTimerOn(false);
  };

  const nameCollection = collection(db, "bestTimes"); //Gets the bestTimes collection

  const handleName = async () => {
    //Uploads the information about user
    try {
      await addDoc(nameCollection, { minutes, seconds, username });
    } catch (err) {
      console.error(err);
    }
  };

  //const restartGame = () => {
  //  setBearColor("white");
  //  setMonkeyColor("white");
  //  setSealColor("white");
  //};

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
              handleWin={handleWin}
            />
          }
        />
        <Route path="/leadership" element={<Leadership />} />
      </Routes>
      {displayWin ? (
        <div className="text-white text-xl lg:text-5xl md:text-4xl fixed top-0 left-0 h-full w-full bg-black bg-opacity-80 flex flex-col gap-16 items-center justify-center">
          <h1 className="text-6xl text-lime-200 font-extrabold">You Won!</h1>
          <form className="flex flex-col gap-4 items-center">
            <label id="name">Your Name:</label>
            <input
              className="text-black"
              id="name"
              placeholder="Your Name..."
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <button
              className="text-xl lg:text-5xl md:text-3xl w-fit p-4 bg-slate-900 rounded-xl"
              onClick={(e) => {
                e.preventDefault();
                handleName();
                setDisplayWin(false);
                setDiplayRestart(true);
              }}
            >
              Done
            </button>
          </form>
        </div>
      ) : null}
      {displayRestart ? (
        <form className="flex justify-center items-center bg-black bg-opacity-80 fixed top-0 left-0 w-full h-full">
          <button
            className="p-12 rounded-2xl hover:bg-slate-600 bg-slate-900 text-white text-6xl"
            type="submit"
          >
            Restart
          </button>
        </form>
      ) : null}
    </BrowserRouter>
  );
};

export default App;
