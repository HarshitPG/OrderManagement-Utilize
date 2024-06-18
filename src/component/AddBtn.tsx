import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../store/actions.ts";
import { Dispatch } from "../store/store.ts";
const AddBtn: React.FC = () => {
  const dispatch: Dispatch = useDispatch();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(openModal());
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-4 shadow-lg"
      >
        Add New Order
      </button>
    </div>
  );
};

export default AddBtn;
