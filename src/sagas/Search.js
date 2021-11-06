import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as SEARCH from '../actionTypes/Search';
import * as searchActionCreators from '../actionCreators/Search';
import { doGet } from '../utils/fetchWrapper';


export function* getAirports() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getAirports);
    yield put(searchActionCreators.getAirportsSucccess(response));
  } catch (error) {
    yield put(searchActionCreators.getAirportsFailure(error));
  }
}


export function* getAvailableFlights() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getAvailableFlights);
    yield put(searchActionCreators.getAvailableFlightsSucccess(response));
  } catch (error) {
    yield put(searchActionCreators.getAvailableFlightsFailure(error));
  }
}

export function* searchWatchers() {
  yield [
    takeLatest(SEARCH.GET_AIRPORTS, getAirports),
    takeLatest(SEARCH.GET_AVAILABLE_FLIGHTS, getAvailableFlights)
  ];
}
