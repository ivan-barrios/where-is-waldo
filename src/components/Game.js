import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import img from "../img/wiwImg.jpg";

const Game = () => {
  const handleClick = () => {
    //Append Menu
  };
  const getClickPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const realX = (x * 955) / e.target.clientWidth; // x coordinates
    const realY = (y * 1536) / e.target.clientHeight; //y coordinates
    return {
      realX,
      realY,
    };
  };

  const coordsCollection = collection(db, "charactersCoords");

  const handleMenuClick = (e) => {
    const getCharactersCoords = async () => {
      try {
        const data = await getDocs(coordsCollection);
        const filteredData = data.docs.map((doc) => ({ ...doc.data() }));
        return filteredData;
      } catch (err) {
        console.error(err);
      }
    };
    const charactersCoords = getCharactersCoords();
    const coords = getClickPosition(e);
    const verifyX = Math.abs();
  };

  return (
    <div>
      <div className="flex justify-center bg-slate-900">
        <img src={img} alt="Waldo Img" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Game;
