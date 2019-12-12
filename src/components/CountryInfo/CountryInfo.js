import React, {Component} from 'react';
import axios from 'axios';
import './CountryInfo.css';

class CountryInfo extends Component {
    state = {
        loadedInfo: null,
        loadedBorders: []
    };

    async componentDidUpdate(prevProps) {
        if (this.props.name && this.props.name !== prevProps.name) {
            const response = await axios.get('https://restcountries.eu/rest/v2/name/' + this.props.name);
            const loadedInfo = response.data[0];
            const borders = loadedInfo.borders;

            const loadedBorders = [];
            await Promise.all(borders.map(border => axios.get('https://restcountries.eu/rest/v2/alpha/' + border)))
                .then(responses => Promise.all(responses.map(response => {
                    const data = response.data;
                    loadedBorders.push(data.name);
                    return loadedBorders;
                })));
            this.setState({loadedInfo, loadedBorders});
        }
    }

    render() {
        const imageStyle = {
            width: "30%"
        };

        const borders = this.state.loadedBorders.map(border => {
            return (
                <li key={border}>{border}</li>
            )
        });

        return this.state.loadedInfo && ((
            <div className='country'>
                <div className='header'>
                    <h1>{this.state.loadedInfo.name}</h1>
                    <img style={imageStyle} src={this.state.loadedInfo.flag} alt=""/>
                </div>
                <div className='info'>
                    <p><b>Capital:</b> {this.state.loadedInfo.capital}</p>
                    <p><b>Population:</b> {this.state.loadedInfo.population}</p>
                </div>
                <p className='etc'>etc</p>
                <ul className='borders'>
                    <p><b>Borders with:</b></p>
                    {borders}
                </ul>
            </div>
        ));
    }
}

export default CountryInfo;