import React from "react";
import { useDispatch } from "react-redux";
import { deleteOrder, editOrder } from "../store/actions.ts";
import Orders from "./Orders.tsx";
import { Dispatch } from "../store/store.ts";

const OrderData = ({ orders }) => {
  const dispatch: Dispatch = useDispatch();

  const handleDelete = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  const handleEdit = (orderId, updatedOrder) => {
    dispatch(editOrder(orderId, updatedOrder));
  };

  return (
    <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {orders.map((order) => (
        <Orders
          key={order.id}
          order={order}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default OrderData;
