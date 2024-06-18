import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tabIndex } from "../store/actions.ts";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/reducers.ts";
import { Dispatch } from "../store/store.ts";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders);

  const totalOrderValue = orders.reduce(
    (total, order) => total + order.order_value,
    0
  );

  const handleTabIndex = (index: number) => {
    dispatch(tabIndex(index));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">
      <div className="font-bold text-xl tracking-tight">Logo</div>
      <div className="flex items-center">
        <div className=" text-sm px-2 py-2 leading-none rounded-full ">
          Total Value: ${totalOrderValue}{" "}
        </div>
        <div
          className="text-sm px-2 py-2 leading-none rounded-full hover:bg-gray-700"
          onClick={() => {
            handleTabIndex(1);
          }}
        >
          Home
        </div>
        <div
          className="text-sm px-2 py-2 leading-none rounded-full hover:bg-gray-700"
          onClick={() => {
            handleTabIndex(2);
          }}
        >
          Profile
        </div>
        <div
          onClick={() => {
            handleLogout();
            handleTabIndex(1);
          }}
          className="text-sm px-2 py-2 leading-none rounded-full hover:bg-gray-700"
        >
          Logout
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
