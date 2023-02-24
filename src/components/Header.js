import { Link } from "react-router-dom";
import bear from "../img/Bear.png";
import seal from "../img/Seal.png";
import monkey from "../img/Monkey.png";

const Header = ({ bearColor, monkeyColor, sealColor, minutes, seconds }) => {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center p-4 bg-slate-800 text-white">
      <div className="flex justify-around items-center w-full h-full">
        <div className="flex gap-4">
          <img
            src={bear}
            alt="Bear"
            className="rounded-full w-3/12 border-solid border-4"
            style={{ borderColor: `${bearColor}` }}
          />
          <img
            src={monkey}
            alt="Monkey"
            className="rounded-full w-3/12 h-fit border-solid border-4 border-white"
            style={{ borderColor: `${monkeyColor}` }}
          />
          <img
            src={seal}
            alt="Seal"
            className="rounded-full h-fit w-3/12 border-solid border-4 border-white"
            style={{ borderColor: `${sealColor}` }}
          />
        </div>
      </div>
      <div>
        <div className="text-xl lg:text-7xl md:text-5xl">
          {minutes}:{seconds}
        </div>
      </div>
      <Link to="/leadership" className="text-xl lg:text-7xl md:text-5xl">
        <div>Leadership</div>
      </Link>
    </div>
  );
};

export default Header;
