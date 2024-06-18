import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../component/Pagination.tsx";
import axios from "axios";
import OrderData from "../component/OrderData.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/actions.ts";
import SearchBar from "../component/SearchBar.tsx";
import AddOrder from "../component/AddOrder.tsx";
import AddBtn from "../component/AddBtn.tsx";
import { RootState } from "../store/reducers.ts";
import { Dispatch } from "../store/store.ts";

const Home = () => {
  const [user, setUser] = useState(null);
  const orders = useSelector((state: RootState) => state.orders);
  const searchQuery = useSelector((state: RootState) => state.searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.isModalOpen);

  useEffect(() => {
    const userInfoString = localStorage.getItem("user");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setUser(userInfo);
    } else {
      navigate("/");
    }

    axios
      .get("Data.json")
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch, navigate]);

  // uncommend the below to implement the search onchange inside the input box/ fuzzy search. Also implement the required changes in the SearchBar.tsx
  // const filteredOrders = orders.filter((order) =>
  //   order.id.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const filteredOrders = searchQuery
    ? orders.filter(
        (order) => order.id.toLowerCase() === searchQuery.toLowerCase()
      )
    : orders;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <>
      <SearchBar />
      <OrderData orders={currentOrders} /> <div />
      <Pagination
        ordersPerPage={ordersPerPage}
        totalOrders={filteredOrders.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {isModalOpen && <AddOrder />}
      <AddBtn />
    </>
  );
};

export default Home;
