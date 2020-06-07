import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import { countrySlugOverrides } from 'utils';

export const setUpCountriesData = (herokuData) => {
  let countries = [];
  countries = herokuData.map((d) => {
    let slug = d.country.toLowerCase().split(' ').join('-');
    let overrideExists = find(countrySlugOverrides, (c) => c.country === d.country);
    if (overrideExists) slug = overrideExists.slug;
    return {
      name: d.country,
      slug
    };
  });
  // sort by country name
  countries = sortBy(countries, (c) => c.name);
  return countries;
};
