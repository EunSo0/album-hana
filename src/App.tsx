import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AlbumLayout } from "./components/AlbumLayout";
import { Login } from "./components/Login";
import { Albums } from "./components/Albums";
import { Album } from "./components/Album";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AlbumLayout />}>
          <Route index element={<Login />} />
          <Route path="albums" element={<Albums />} />
          <Route path="albums/:id" element={<Album />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
