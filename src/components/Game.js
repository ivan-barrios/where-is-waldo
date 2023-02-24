import { db } from "../firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import img from "../img/wiwImg.jpg";
import { useEffect, useState } from "react";

const Game = ({
  setBearColor,
  setMonkeyColor,
  setSealColor,
  minutes,
  seconds,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [clickCoords, setClickCoords] = useState({});
  const [menuCoords, setMenuCoords] = useState({});
  const [foundBear, setFoundBear] = useState(false);
  const [foundMonkey, setFoundMonkey] = useState(false);
  const [foundSeal, setFoundSeal] = useState(false);
  const [displayWin, setDisplayWin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (foundBear && foundMonkey && foundSeal) {
      handleWin();
    }
  }, [foundBear, foundMonkey, foundSeal]);

  const handleWin = () => {
    setDisplayWin(true);
  };

  const getClickPosition = (e) => {
    setMenuCoords({ x: e.pageX, y: e.pageY });
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const realX = (x * 955) / e.target.clientWidth;
    const realY = (y * 1536) / e.target.clientHeight;
    return {
      realX,
      realY,
    };
  };

  const handleClick = (e) => {
    setClickCoords(getClickPosition(e));
    setShowMenu(!showMenu);
  };

  const coordsCollection = collection(db, "charactersCoords");

  const handleMenuClick = async (animal) => {
    setShowMenu(!showMenu);
    const id = `${animal}Coords`;
    const charactersCoords = await getCharactersCoords(id);
    const verifyX = Math.abs(clickCoords.realX - charactersCoords.x) < 60;
    const verifyY = Math.abs(clickCoords.realY - charactersCoords.y) < 60;
    console.log(clickCoords.realX, clickCoords.realY);
    changeCharColor(verifyX, verifyY, animal);
  };

  const changeCharColor = (verifyX, verifyY, animal) => {
    if (verifyX && verifyY) {
      switch (animal) {
        case "bear":
          setBearColor("green");
          setFoundBear(true);
          break;
        case "monkey":
          setMonkeyColor("green");
          setFoundMonkey(true);
          break;
        case "seal":
          setSealColor("green");
          setFoundSeal(true);
          break;
        default:
          console.log("Sorry, there was an error finding the animal");
      }
    } else {
      switch (animal) {
        case "bear":
          setBearColor("red");
          break;
        case "monkey":
          setMonkeyColor("red");
          break;
        case "seal":
          setSealColor("red");
          break;
        default:
          console.log("Sorry, there was an error finding the animal");
      }
    }
  };

  //Gets the respective animal coords
  const getCharactersCoords = async (id) => {
    try {
      const data = await getDocs(coordsCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filteredData.find((data) => data.id === id);
    } catch (err) {
      console.error(err);
    }
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

  return (
    <div>
      <div className="flex justify-center bg-slate-900">
        <div className="h-fit bg-orange-600">
          <img src={img} alt="Waldo Img" onClick={handleClick} />
          {displayWin ? (
            <div className="text-white text-xl lg:text-5xl md:text-4xl absolute top-0 left-0 h-full w-full bg-black bg-opacity-80 flex flex-col gap-16 items-center justify-center">
              <h1 className="text-6xl text-lime-200 font-extrabold">
                You Won!
              </h1>
              <form className="flex flex-col gap-4">
                <label id="name">Your Name:</label>
                <input
                  className="text-black"
                  id="name"
                  placeholder="Your Name..."
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <button
                  className="text-xl lg:text-5xl md:text-3xl"
                  onClick={(e) => {
                    e.preventDefault();
                    handleName();
                    setDisplayWin(false);
                  }}
                >
                  Done
                </button>
              </form>
            </div>
          ) : null}
          {showMenu ? (
            <div
              className="p-2 absolute bg-neutral-800 text-white flex flex-col w-32"
              style={{ left: menuCoords.x, top: menuCoords.y }}
            >
              <p>Which is it?</p>
              <button
                className="hover:bg-neutral-600"
                onClick={() => handleMenuClick("bear")}
              >
                Bear
              </button>
              <button
                className="hover:bg-neutral-600"
                onClick={() => handleMenuClick("monkey")}
              >
                Monkey
              </button>
              <button
                className="hover:bg-neutral-600"
                onClick={() => handleMenuClick("seal")}
              >
                Seal
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Game;
