import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";

export default function MainLayout() {
  return (
    <div
      className="w-full h-full pt-3 "
      style={{
        backgroundImage: `url("background.jpg")`,
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Header />

      <Outlet />
      <footer className="w-full h-10 text-center text-2xl text-white border-t border-black bg-gradient-to-br from-gray-800 to-gray-400">
        footer
      </footer>
    </div>
  );
}
