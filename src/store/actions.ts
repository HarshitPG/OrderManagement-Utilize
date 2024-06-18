export const ADD_ORDER = "ADD_ORDER";
export const EDIT_ORDER = "EDIT_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const SET_ORDER = "SET_ORDER";
export const SEARCH_ORDER = "SEARCH_ORDER";
export const TAB_INDEX = "TAB_INDEX";
export const SET_MODAL = "SET_MODAL";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export interface Order {
  id: string;
  customer_name: string;
  customer_email: String;
  product: string;
  quantity: number;
  order_value: number;
}

export interface AddOrderAction {
  type: typeof ADD_ORDER;
  payload: Order;
}

export interface EditOrderAction {
  type: typeof EDIT_ORDER;
  payload: {
    id: String;
    orderId: string;
    updatedOrder: Partial<Order>;
  };
}

export interface DeleteOrderAction {
  type: typeof DELETE_ORDER;
  payload: string;
}

export interface SetOrdersAction {
  type: typeof SET_ORDER;
  payload: Order[];
}

export interface SearchOrdersAction {
  type: typeof SEARCH_ORDER;
  payload: string;
}

export interface TabIndexAction {
  type: typeof TAB_INDEX;
  payload: number;
}

export interface OpenModalAction {
  type: typeof OPEN_MODAL;
}

export interface CloseModalAction {
  type: typeof CLOSE_MODAL;
}

export type OrderActionTypes =
  | AddOrderAction
  | EditOrderAction
  | DeleteOrderAction
  | SetOrdersAction
  | SearchOrdersAction
  | TabIndexAction
  | OpenModalAction
  | CloseModalAction;

export const tabIndex = (index: number): TabIndexAction => ({
  type: TAB_INDEX,
  payload: index,
});

export const openModal = (): OpenModalAction => ({
  type: OPEN_MODAL,
});

export const closeModal = (): CloseModalAction => ({
  type: CLOSE_MODAL,
});

export const addOrder = (order: Order): AddOrderAction => ({
  type: ADD_ORDER,
  payload: order,
});

export const editOrder = (orderId: string, updatedOrder: Partial<Order>) => ({
  type: EDIT_ORDER,
  payload: { orderId, updatedOrder },
});

export const deleteOrder = (orderId: string): DeleteOrderAction => ({
  type: DELETE_ORDER,
  payload: orderId,
});

export const setOrders = (orders: Order[]): SetOrdersAction => ({
  type: SET_ORDER,
  payload: orders,
});

export const searchOrders = (query: string): SearchOrdersAction => ({
  type: SEARCH_ORDER,
  payload: query,
});
