export const initialState = {
  bookings: [],
  loading: false,
  error: null,

  page: 0,
  size: 3,

  totalPages: 0,
  totalElements: 0,

  keyword: "",
  status: "All",
};
const bookingReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKINGS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_BOOKINGS_SUCCESS":
      return {
        ...state,
        loading: false,
        bookings: action.payload.content,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        error: null,
      };

    case "FETCH_BOOKINGS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.payload,
        page: 0,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "RESET_BOOKINGS":
      return {
        ...state,
        bookings: [],
        totalPages: 0,
        totalElements: 0,
        page: 0,
        keyword: "",
        status: "All",
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default bookingReducer;