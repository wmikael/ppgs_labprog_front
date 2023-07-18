import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "./DefaultLayout.css";

export function DefaultLayout() {
  return (
    <div className="background">
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
