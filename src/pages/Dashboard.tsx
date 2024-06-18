import React from "react";
import Home from "../sections/Home.tsx";
import { useSelector } from "react-redux";
import Profile from "../sections/Profile.tsx";
import NavBar from "../component/NavBar.tsx";
import { RootState } from "../store/reducers.ts";

const Dashboard = () => {
  const tabIndexNumber = useSelector((state: RootState) => state.tabIndex);
  return (
    <div>
      <NavBar />
      {tabIndexNumber === 1 && <Home />}
      {tabIndexNumber === 2 && <Profile />}
    </div>
  );
};

export default Dashboard;
