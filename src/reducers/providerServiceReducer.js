export const initialState = {
  services: [],
  loading: false,
  error: null,

  // Pagination
  currentPage: 0,
  pageSize: 3,
  totalPages: 0,
  totalElements: 0,

  // Search
  keyword: "",
};

export const providerServiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_SERVICES":
      return {
        ...state,
        loading: false,
        services: action.payload.content,
        currentPage: action.payload.number,
        pageSize: action.payload.size,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        error: null,
      };

    case "ADD_SERVICE":
      return {
        ...state,
        services: [action.payload, ...state.services],
      };

    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service,
        ),
      };

    case "DELETE_SERVICE":
      return {
        ...state,
        services: state.services.filter(
          (service) => service.id !== action.payload,
        ),
      };

    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };

    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.payload,
        currentPage: 0,
      };

    default:
      return state;
  }
};
