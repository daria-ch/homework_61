import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Countries from "./components/Countries/Countries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

class App extends Component {

    state = {
        countries: [],
        selectedCountry: null
    };

    selectedCountryHandler = name => {
        this.setState({selectedCountry: name});
    };


    async componentDidMount() {
        const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code');

        const countries = response.data;

        this.setState({countries: countries});

    }

    render() {

        const countriesList = this.state.countries.map(country => (
            <Countries
                key={country.name}
                name={country.name}
                getInfo={() => this.selectedCountryHandler(country.name)}
            />
        ));

        return (
            <div className='App'>
                <section className='countries-list'>
                    <div className="countries">
                        {countriesList}
                    </div>
                </section>
                <section className='country-info'>
                    <CountryInfo
                        name={this.state.selectedCountry}
                    />
                </section>
            </div>
        );
    }
}

export default App;