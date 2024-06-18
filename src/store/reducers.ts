import {
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  SET_ORDER,
  SEARCH_ORDER,
  TAB_INDEX,
  OPEN_MODAL,
  CLOSE_MODAL,
  OrderActionTypes,
  Order,
} from "./actions.ts";

interface RootState {
  orders: Order[];
  searchQuery: string;
  tabIndex: number;
  isModalOpen: boolean;
}

const initialState: RootState = {
  orders: [],
  searchQuery: "",
  tabIndex: 1,
  isModalOpen: false,
};

const rootReducer = (
  state = initialState,
  action: OrderActionTypes
): RootState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case TAB_INDEX:
      return {
        ...state,
        tabIndex: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case EDIT_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.updatedOrder }
            : order
        ),
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case SEARCH_ORDER:
      return {
        ...state,
        // orders: state.orders.filter((order) =>
        //   order.id.toLowerCase().includes(action.payload.toLowerCase())
        // ),
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
export type { RootState };
