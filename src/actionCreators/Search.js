import * as SEARCH from '../actionTypes/Search';

export function getAirports() {
  return {
    type: SEARCH.GET_AIRPORTS,
  };
}

export function getAirportsSucccess(airports) {
  return {
    type: SEARCH.GET_AIRPORTS_SUCCESS,
    airports,
  };
}

export function getAirportsFailure(error) {
  return {
    type: SEARCH.GET_AIRPORTS_FAILURE,
    error,
  };
}


export function getAvailableFlights(searchDetails) {
  return {
    type: SEARCH.GET_AVAILABLE_FLIGHTS,
    searchDetails
  };
}

export function getAvailableFlightsSucccess(flightList) {
  return {
    type: SEARCH.GET_AVAILABLE_FLIGHTS_SUCCESS,
    flightList,
  };
}

export function getAvailableFlightsFailure(error) {
  return {
    type: SEARCH.GET_AVAILABLE_FLIGHTS_FAILURE,
    error,
  };
}
