import { createReducer } from 'reduxsauce';
import { Types } from './cases.actions';
import { countryNameOverrides } from 'utils';
import find from 'lodash/find';

const defaultState = {
  error: null,
  isFetching: false,
  isFetchingGrahpData: false,
  country: null,
  countries: [],
  casesFromDayOne: [],
  herokuAllStatus: [] // comes from heroku coronovirus 19 API
};

export default createReducer(defaultState, {
  [Types.SET_COUNTRY]: (state, action) => {
    let { country } = action;
    return {
      ...state,
      isFetching: false,
      country
    };
  },
  [Types.SET_COUNTRIES]: (state, action) => {
    const { countries } = action;
    return {
      ...state,
      countries
    };
  },
  [Types.GET_INITIAL_DATA]: (state) => {
    return {
      ...state,
      isFetching: true
    };
  },
  [Types.GET_INITIAL_DATA_SUCCESS]: (state, action) => {
    const { country, herokuAllStatus } = action.data;
    let overrideExists = find(countryNameOverrides, (c) => c.from === country);
    console.log('overrideExists', overrideExists);
    return {
      ...state,
      isFetching: false,
      country: overrideExists ? overrideExists.to : country,
      herokuAllStatus,
      error: null
    };
  },
  [Types.GET_INITIAL_DATA_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      error: action.error
    };
  },
  [Types.GET_CASES_BY_COUNTRY]: (state) => {
    return {
      ...state,
      isFetchingGrahpData: true
    };
  },
  [Types.GET_CASES_BY_COUNTRY_SUCCESS]: (state, action) => {
    const { casesFromDayOne } = action.data;
    return {
      ...state,
      isFetchingGrahpData: false,
      casesFromDayOne,
      error: null
    };
  },
  [Types.GET_CASES_BY_COUNTRY_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetchingGrahpData: false,
      error: action.error
    };
  }
});
