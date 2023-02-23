import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import img from "../img/wiwImg.jpg";
import { useState } from "react";

const Game = ({ setBearColor, setMonkeyColor, setSealColor }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [clickCoords, setClickCoords] = useState({});
  const [menuCoords, setMenuCoords] = useState({});
  const [foundAnimal, setFoundAnimal] = useState("");

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

  const handleMenuClick = async (e) => {
    setShowMenu(!showMenu);
    setFoundAnimal(e.target.innerText);
    console.log(foundAnimal);
    const id = `${e.target.innerText.toLowerCase()}Coords`;
    const charactersCoords = await getCharactersCoords(id);
    const verifyX = Math.abs(clickCoords.realX - charactersCoords.x) < 60;
    const verifyY = Math.abs(clickCoords.realY - charactersCoords.y) < 60;
    console.log(clickCoords.realX, clickCoords.realY);
    if (verifyX && verifyY) {
      switch (foundAnimal) {
        case "bear":
          setBearColor("green");
          break;
        case "monkey":
          setMonkeyColor("green");
          break;
        case "seal":
          setSealColor("green");
          break;
        default:
          console.log("Sorry, there was an error finding the animal");
      } //logging in the first click... why?
    }
  };

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

  return (
    <div>
      <div className="flex justify-center bg-slate-900 h-full">
        <div>
          <img src={img} alt="Waldo Img" onClick={handleClick} />
          {showMenu ? (
            <div
              className="p-2 absolute bg-neutral-800 text-white flex flex-col w-32"
              style={{ left: menuCoords.x, top: menuCoords.y }}
            >
              <p>Which is it?</p>
              <button
                className="hover:bg-neutral-600"
                onClick={handleMenuClick}
              >
                Bear
              </button>
              <button
                className="hover:bg-neutral-600"
                onClick={handleMenuClick}
              >
                Monkey
              </button>
              <button
                className="hover:bg-neutral-600"
                onClick={handleMenuClick}
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
