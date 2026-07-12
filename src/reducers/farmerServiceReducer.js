const initialState = {
    services: [],
    selectedService: null,

    loading: false,
    error: null,

    Page: 0,
    pageSize: 3,
    totalPages: 0,
    totalElements: 0,
};

const farmerServiceReducer = (state = initialState, action) => {
    switch (action.type) {

        case "FETCH_SERVICES_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "FETCH_SERVICES_SUCCESS":
            return {
                ...state,
                loading: false,
                services: action.payload.content,
                Page: action.payload.number,
                pageSize: action.payload.size,
                totalPages: action.payload.totalPages,
                totalElements: action.payload.totalElements,
            };

        case "FETCH_SERVICES_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "FETCH_SERVICE_BY_ID_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "FETCH_SERVICE_BY_ID_SUCCESS":
            return {
                ...state,
                loading: false,
                selectedService: action.payload,
            };

        case "FETCH_SERVICE_BY_ID_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CLEAR_SELECTED_SERVICE":
            return {
                ...state,
                selectedService: null,
            };

        default:
            return state;
    }
};

export { initialState };
export default farmerServiceReducer;