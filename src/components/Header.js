import { Link } from "react-router-dom";
import bear from "../img/Bear.png";
import seal from "../img/Seal.png";
import monkey from "../img/Monkey.png";

const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center p-4 bg-slate-800 text-white">
      <div className="flex justify-around items-center w-full h-full">
        <div className="flex gap-4">
          <img src={bear} alt="Osito" className="rounded-full w-3/12" />
          <img src={seal} alt="Osito" className="rounded-full w-3/12 h-fit" />
          <img src={monkey} alt="Osito" className="rounded-full h-fit w-3/12" />
        </div>
      </div>
      <div>
        <div className="text-xl lg:text-7xl md:text-5xl">Timer</div>
      </div>
      <Link to="/leadership" className="text-xl lg:text-7xl md:text-5xl">
        <div>Leadership</div>
      </Link>
    </div>
  );
};

export default Header;
