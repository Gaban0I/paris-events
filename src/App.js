import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.js";
import Search from "./pages/Search";
import Favoris from "./pages/Favoris";
import EventPage from "./pages/event";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/recherche" element={<Search />}></Route>
        <Route path="/favoris" element={<Favoris />}></Route>
        <Route path="/event/:id" Component={EventPage}></Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;

// ajouter la partie de recherche d'événement
