import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { searchOrders } from "../store/actions.ts";
import { Dispatch } from "../store/store.ts";

function SearchBar() {
  const dispatch: Dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
    // uncommend the below to implement the search onchange inside the input box/ fuzzy search. Also implement the required changes in the Home.tsx
    // dispatch(searchOrders(e.target.value.trim()));
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(searchOrders(searchQuery.trim()));
  };

  return (
    <div className=" flex justify-center mb-2 mt-4">
      <input
        className=" text-md py-1 px-2  border-2  placeholder-text-300 rounded-l"
        type="text"
        placeholder="Search orders by ID"
        onChange={handleChange}
      />{" "}
      <button
        type="button"
        className="bg-gray-500  px-5 py-1 text-lg font-bold  cursor-pointer rounded-r text-white"
        value="Search"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
