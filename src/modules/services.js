import axios from 'axios';
import { countrySlugOverrides } from 'utils';
import find from 'lodash/find';

export const getGeolocation = async () => {
  try {
    let { data } = await axios.get(
      'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572'
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCasesByCountry = async (country) => {
  try {
    let selectedCountry;
    let override = find(countrySlugOverrides, c => c.country === country);
    if (override) {
      selectedCountry = override.slug;
    }
    selectedCountry = country.toLowerCase().split(' ').join('-');

    let { data } = await axios.get(`https://api.covid19api.com/dayone/country/${selectedCountry}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHerokuAllStatus = async () => {
  try {
    let { data } = await axios.get('https://coronavirus-19-api.herokuapp.com/countries');
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
