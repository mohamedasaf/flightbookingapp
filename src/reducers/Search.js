import * as SEARCH from "../actionTypes/Search";

const initialState = {
  airports: [],
  flightList: [],
  values: {
    destinationCity: "",
    sourceCity: "",
    travelDate: "",
    returnDate: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH.GET_AIRPORTS:
      return {
        ...state,
      };
    case SEARCH.GET_AIRPORTS_SUCCESS: {
      const { airports } = action;
      const airportsList =
        airports &&
        airports.length &&
        airports.map((item) => {
          return { value: item.city, label: `${item.name}, ${item.city}` };
        });
      return {
        ...state,
        airportsList,
      };
    }
    case SEARCH.GET_AIRPORTS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SEARCH.GET_AVAILABLE_FLIGHTS:
      return {
        ...state,
        searchDetails: action.searchDetails,
        isLoading: true,
      };
    case SEARCH.GET_AVAILABLE_FLIGHTS_SUCCESS: {
      const { searchDetails } = state;
      const {
        sourceCity,
        destinationCity,
        travelDate,
        returnDate,
      } = searchDetails;
      const { flightList } = action;
      const availableFlights = [...flightList];
      const availableFlightList =
        availableFlights &&
        availableFlights.length &&
        availableFlights.filter((item) => {
          const {
            source,
            destination,
            depatureDate,
            returnDate: fligthRreturnDate,
          } = item;
          let isFiltered =
            source === sourceCity &&
            destination === destinationCity &&
            depatureDate === travelDate;
          if (returnDate) {
            isFiltered = isFiltered && returnDate === fligthRreturnDate;
          }
          return isFiltered;
        });
      return {
        ...state,
        isLoading: false,
        flightList: availableFlightList,
      };
    }
    case SEARCH.GET_AVAILABLE_FLIGHTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
