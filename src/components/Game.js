import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import img from "../img/wiwImg.jpg";
import { useState } from "react";

const Game = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [clickCoords, setClickCoords] = useState({});
  const [menuCoords, setMenuCoords] = useState({});

  const getClickPosition = (e) => {
    setMenuCoords({ x: e.pageX, y: e.pageY });
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const realX = (x * 955) / e.target.clientWidth;
    const realY = (y * 1536) / e.target.clientHeight;
    console.log(realX, realY);
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

  const handleMenuClick = (e) => {
    setShowMenu(!showMenu);
    const id = `${e.target.innerText.toLowerCase()}Coords`;
    const charactersCoords = getCharactersCoords(id);
    charactersCoords.then((coords) => {
      //Correct?
    });
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
