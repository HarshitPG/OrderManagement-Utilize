import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, closeModal } from "../store/actions.ts";
import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "../store/store.ts";
import { RootState } from "../store/reducers.ts";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product: string;
  quantity: number;
  order_value: number;
}

interface Errors {
  id?: string;
  customer_name?: string;
  customer_email?: string;
  product?: string;
  quantity?: string;
}

const AddOrder = () => {
  const dispatch: Dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders);

  const [newOrder, setNewOrder] = useState<Order>({
    id: uuidv4(),
    customer_name: "",
    customer_email: "",
    product: "Product 1",
    quantity: 1,
    order_value: 29,
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateOrder = () => {
    const errors: Errors = {};

    if (orders.some((order) => order.id === newOrder.id)) {
      errors.id = "Order ID must be unique";
    }

    if (newOrder.customer_name.length < 3) {
      errors.customer_name = "Customer Name must have at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newOrder.customer_email)) {
      errors.customer_email = "Customer Email is not valid";
    }

    const validProducts = ["Product 1", "Product 2", "Product 3"];
    if (!validProducts.includes(newOrder.product)) {
      errors.product =
        "Product must be one of Product 1, Product 2, or Product 3";
    }

    if (newOrder.quantity <= 0 || isNaN(newOrder.quantity)) {
      errors.quantity = "Quantity must be a numeric value greater than 0";
    }

    return errors;
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateOrder();
    if (Object.keys(errors).length === 0) {
      dispatch(addOrder(newOrder));
      dispatch(closeModal());
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedOrder = { ...newOrder, [name]: value };

    if (name === "product" || name === "quantity") {
      const productPrices = {
        "Product 1": 29,
        "Product 2": 49,
        "Product 3": 149,
      };
      const orderValue =
        productPrices[updatedOrder.product] * updatedOrder.quantity;
      updatedOrder.order_value = orderValue;
    }

    setNewOrder(updatedOrder);
  };

  return (
    <div className="bg-black/50 fixed top-0 right-0 left-0 z-50 h-full flex items-center justify-center">
      <div className="relative p-4  w-full max-w-md h-full md:h-auto">
        <div className="  bg-white rounded-lg shadow">
          <button
            onClick={handleClose}
            type="button"
            className=" justify-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto flex items-center "
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <form className="w-full px-6 pb-6" onSubmit={handleSave}>
            <input
              name="id"
              placeholder="Order Id"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 mb-4"
              value={newOrder.id}
              onChange={handleChange}
              // readOnly
            />
            {errors.id && (
              <p className="text-red-500 text-xs italic">{errors.id}</p>
            )}
            <input
              name="customer_name"
              placeholder="Customer Name"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 mb-4"
              value={newOrder.customer_name}
              onChange={handleChange}
            />
            {errors.customer_name && (
              <p className="text-red-500 text-xs italic">
                {errors.customer_name}
              </p>
            )}
            <input
              name="customer_email"
              placeholder="Customer Email"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 mb-4"
              value={newOrder.customer_email}
              onChange={handleChange}
            />
            {errors.customer_email && (
              <p className="text-red-500 text-xs italic">
                {errors.customer_email}
              </p>
            )}
            <select
              name="product"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 mb-4"
              value={newOrder.product}
              onChange={handleChange}
            >
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
            </select>
            {errors.product && (
              <p className="text-red-500 text-xs italic">{errors.product}</p>
            )}
            <input
              name="quantity"
              placeholder="Quantity"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 mb-4"
              value={newOrder.quantity}
              onChange={handleChange}
              type="number"
              min="1"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs italic">{errors.quantity}</p>
            )}
            <input
              name="order_value"
              placeholder="Order Value"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1 mb-4"
              value={newOrder.order_value}
              readOnly
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
