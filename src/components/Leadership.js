import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";

const Leadership = () => {
  const [timeList, setTimeList] = useState([]);

  const timeCollection = collection(db, "bestTimes");

  useEffect(() => {
    const getTimeCollection = async () => {
      try {
        const data = await getDocs(timeCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        const sortedData = filteredData.sort((a, b) => {
          const totalASeconds = a.minutes * 60 + a.seconds;
          const totalBSeconds = b.minutes * 60 + b.seconds;
          return totalASeconds - totalBSeconds;
        });
        setTimeList(sortedData);
      } catch (err) {
        console.error(err);
      }
    };
    getTimeCollection();
  }, []);

  return (
    <div className="bg-slate-900 p-4 text-white h-screen flex gap-12">
      <Link
        to="/"
        className="rounded-xl p-4 hover:bg-neutral-700 bg-black w-fit h-fit text-4xl"
      >
        ⇐
      </Link>
      <div className="w-10/12 p-2 flex flex-col gap-8 border-2 border-white">
        <div className="flex justify-around text- text-3xl mb-8 border-b-2">
          <div>Place</div>
          <div>Username</div>
          <div>Time</div>
        </div>
        {timeList.map((data, index) => (
          <div key={index} className="flex justify-around text-2xl ">
            <div>{index + 1}</div>
            <div>{data.username}</div>
            <div>
              {data.minutes < 10 ? "0" + data.minutes : data.minutes}:
              {data.seconds < 10 ? "0" + data.seconds : data.seconds}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
