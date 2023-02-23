import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Game from "./components/Game";
import "./style.css";
import Leadership from "./components/Leadership";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leadership" element={<Leadership />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
