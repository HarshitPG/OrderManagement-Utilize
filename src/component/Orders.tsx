import React, { ChangeEvent, FormEvent, useState } from "react";

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

const Orders = ({ order, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order>(order);
  const [errors, setErrors] = useState<Errors>({});

  const validateOrder = () => {
    const errors: Errors = {};

    if (editedOrder.customer_name.length < 3) {
      errors.customer_name = "Customer Name must have at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedOrder.customer_email)) {
      errors.customer_email = "Customer Email is not valid";
    }

    const validProducts = ["Product 1", "Product 2", "Product 3"];
    if (!validProducts.includes(editedOrder.product)) {
      errors.product =
        "Product must be one of Product 1, Product 2, or Product 3";
    }

    if (editedOrder.quantity <= 0 || isNaN(editedOrder.quantity)) {
      errors.quantity = "Quantity must be a numeric value greater than 0";
    }

    return errors;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setEditedOrder(order);
    setIsEditing(false);
  };
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateOrder();
    if (Object.keys(errors).length === 0) {
      onEdit(order.id, editedOrder);
      setIsEditing(false);
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedOrder = { ...editedOrder, [name]: value };

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

    setEditedOrder(updatedOrder);
  };

  return (
    <div>
      <div className="rounded overflow-hidden shadow-lg flex flex-col">
        <div className="px-6 py-4 mb-auto">
          <div className="text-black-500 text-sm">
            {isEditing ? (
              <input
                name="id"
                className="w-full h-8 px-3 text-sm text-gray-700 border border-blue-500 rounded shadow-sm"
                value={editedOrder.id}
                readOnly
              />
            ) : (
              <span>Order ID: {editedOrder.id}</span>
            )}
          </div>
          <div className="text-black-500 text-sm">
            {isEditing ? (
              <>
                <input
                  name="customer_name"
                  className="w-full h-8 px-3 text-sm text-gray-700 border border-blue-500 rounded shadow-sm"
                  value={editedOrder.customer_name}
                  onChange={handleChange}
                />
                {errors.customer_name && (
                  <span className="text-red-500 text-xs italic">
                    {errors.customer_name}
                  </span>
                )}
              </>
            ) : (
              <span>Customer Name: {editedOrder.customer_name}</span>
            )}
          </div>
          <div className="text-black-500 text-sm">
            {isEditing ? (
              <>
                <input
                  name="customer_email"
                  className="w-full h-8 px-3 text-sm text-gray-700 border border-blue-500 rounded shadow-sm"
                  value={editedOrder.customer_email}
                  onChange={handleChange}
                />
                {errors.customer_email && (
                  <span className="text-red-500 text-xs italic">
                    {errors.customer_email}
                  </span>
                )}
              </>
            ) : (
              <span>Customer Email: {editedOrder.customer_email}</span>
            )}
          </div>
          <div className="text-black-500 text-sm">
            {isEditing ? (
              <>
                <input
                  name="product"
                  className="w-full h-8 px-3 text-sm text-gray-700 border border-blue-500 rounded shadow-sm"
                  value={editedOrder.product}
                  onChange={handleChange}
                />
                {errors.product && (
                  <span className="text-red-500 text-xs italic">
                    {errors.product}
                  </span>
                )}
              </>
            ) : (
              <span>Product: {editedOrder.product}</span>
            )}
          </div>
          <div className="text-black-500 text-sm">
            {isEditing ? (
              <>
                <input
                  className="w-full h-8 px-3 text-sm text-gray-700 border border-blue-500 rounded shadow-sm"
                  name="quantity"
                  value={editedOrder.quantity}
                  onChange={handleChange}
                  type="number"
                  min="1"
                />
                {errors.quantity && (
                  <span className="text-red-500 text-xs italic">
                    {errors.quantity}
                  </span>
                )}
              </>
            ) : (
              <span>Quantity: {editedOrder.quantity}</span>
            )}
          </div>
          <div className="text-black-500 text-sm">
            {isEditing ? (
              <input
                name="order_value"
                className="w-full h-8 px-3 text-sm text-gray-700 border border-blue-500 rounded shadow-sm"
                value={editedOrder.order_value}
                readOnly
              />
            ) : (
              <span>Order Value: {editedOrder.order_value}</span>
            )}
          </div>
        </div>
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <div className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            {isEditing ? (
              <button className="border-0" onClick={handleSave}>
                <strong>Save</strong>
              </button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>

          <div className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            {isEditing ? (
              <button className="border-0" onClick={handleClose}>
                <strong>Close</strong>
              </button>
            ) : (
              <button onClick={() => onDelete(editedOrder.id)}>Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
