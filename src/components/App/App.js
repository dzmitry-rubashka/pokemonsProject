import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "../../pages/MainPage/MainPage";
import Header from "../Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
