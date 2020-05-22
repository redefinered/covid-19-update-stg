import React from 'react';
import Loader from 'components/loader.component';
import CountrySelector from 'components/country-selector/country-selector.component';
import Time from 'components/time/time.component';
import { Container, Jumbotron } from 'react-bootstrap';
import Fields from 'components/fields/fields.component';
import axios from 'axios';
import './homepage.styles.scss';

const { REACT_APP_VERSION, REACT_APP_GEOLOCATION_DB_API_KEY } = process.env;

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      country: null,
      searchString: ''
    };
  }

  async componentDidMount() {
    // get new cases today
    const { data } = await axios.get('https://coronavirus-19-api.herokuapp.com/countries');
    this.setState({ data }, async () => {
      const { data } = await axios.get(
        `https://geolocation-db.com/json/${REACT_APP_GEOLOCATION_DB_API_KEY}`
      );
      const { country_name } = data;
      // let country_name = 'United States';
      /**
       * TODO: test dropdown for other countries
       * HACK FIX USA FOR NOW
       */
      this.setState({ country: country_name === 'United States' ? 'USA' : country_name });
    });
  }

  handleSelect = (event) => {
    this.setState({ country: event.target.getAttribute('value') });
  };

  handleSearch = (event) => {
    this.setState({ searchString: event.target.value });
  };

  render() {
    const { data, country, searchString } = this.state;
    if (data.length === 0 || !country) return <Loader />;

    return (
      <Container fluid>
        <Jumbotron className="mt-3">
          <h1>Covid-19 Updates</h1>
          <Time />
          <p className="lead">
            This page updates everyday so you stay updated on the global situation regarding the
            Coronovirus pandemic
          </p>
          <CountrySelector
            data={data}
            handleSelect={this.handleSelect}
            selectedCountry={country}
            handleSearch={this.handleSearch}
            searchString={searchString}
          />
        </Jumbotron>
        <Fields country={country} data={data} />
        <footer className="py-3">
          <p className="text-muted">&copy; reddeguzman | {`v${REACT_APP_VERSION}`}</p>
        </footer>
      </Container>
    );
  }
}

export default Homepage;
