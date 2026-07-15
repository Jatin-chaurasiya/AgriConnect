export const initialState = {
  bookings: [],
  providerBookings: [],
  historyBookings: [],

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
        providerBookings: [],
        totalPages: 0,
        totalElements: 0,
        page: 0,
        keyword: "",
        status: "All",
        loading: false,
        error: null,
      };

    case "FETCH_PROVIDER_BOOKINGS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_PROVIDER_BOOKINGS_SUCCESS":
      return {
        ...state,
        loading: false,
        providerBookings: action.payload.content,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        error: null,
      };

    case "FETCH_PROVIDER_BOOKINGS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ACCEPT_BOOKING_SUCCESS":
      return {
        ...state,
        providerBookings: state.providerBookings.map((booking) =>
          booking.id === action.payload
            ? { ...booking, bookingStatus: "ACCEPTED" }
            : booking,
        ),
      };

    case "REJECT_BOOKING_SUCCESS":
      return {
        ...state,
        providerBookings: state.providerBookings.map((booking) =>
          booking.id === action.payload.id
            ? {
                ...booking,
                bookingStatus: "REJECTED",
                rejectionReason: action.payload.reason,
              }
            : booking,
        ),
      };

    case "COMPLETE_BOOKING_SUCCESS":
      return {
        ...state,
        providerBookings: state.providerBookings.map((booking) =>
          booking.id === action.payload
            ? { ...booking, bookingStatus: "COMPLETED" }
            : booking,
        ),
      };
    case "FETCH_BOOKING_HISTORY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_BOOKING_HISTORY_SUCCESS":
      return {
        ...state,
        loading: false,
        historyBookings: action.payload.content,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        error: null,
      };

    case "FETCH_BOOKING_HISTORY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
