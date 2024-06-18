import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const Pagination = ({
  ordersPerPage,
  totalOrders,
  currentPage,
  setCurrentPage,
}) => {
  const searchQuery = useSelector((state: RootState) => state.searchQuery);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  const handlePreviousButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const calculatePages = () => {
      setPageNumbers([]);
      const newTotalPages = Math.ceil(totalOrders / ordersPerPage);
      setTotalPages(newTotalPages);
    };

    calculatePages();
  }, [totalOrders, ordersPerPage, searchQuery]);

  const handleNextButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="m-4 flex flex-row justify-center ">
      <div className=" inline-flex justify-center ">
        <button onClick={() => handlePreviousButton()}>
          <span className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <span className=" flex flex-row justify-center flex-nowrap w-2/4">
          <span>Page{"   "}</span>
          <input
            type="text"
            className="px-2 pb-2 w-[25%] justify-center items-center min-w-8"
            value={currentPage}
            name="currentPage"
            onChange={handleChange}
            readOnly
          />
          <span className="w-[25%] justify-center items-center min-w-14">
            of {totalPages}{" "}
          </span>
        </span>

        <button onClick={() => handleNextButton()}>
          <span className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
