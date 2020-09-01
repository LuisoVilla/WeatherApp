import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from  './../services/TransformForecast'
import './styles.css';

export const api_key = "b886ac2edd16146a5080d5888aade5f6";
export const url = "http://api.openweathermap.org/data/2.5/forecast";

class ForecastExtended extends Component {

    constructor () {
        super ();
        this.state = {
            forecastData: null
        }
    }

    componentDidMount(){
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props.city) {
            this.setState({forecastData: null});
            this.updateCity(nextProps.city);
        }
    }

    updateCity = city => {
        const url_forecast = `${url}?q=${city}&appid=${api_key}`
        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData);
                this.setState({forecastData})
            }
        )
    }
    renderForecastItemsDays(forecastData) {
        return forecastData.map(forecast => (
        <ForecastItem
            key={`${forecast.weekDay}${forecast.hour}`}
            weekDay = {forecast.weekDay} 
            hour = {forecast.hour}
            data = {forecast.data}>                
        </ForecastItem> ));
    }
    renderProgress = () => {
        return (<h3>"Cargando Pronostico extendido: "</h3>);
    }
    render () {
        const {city} = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className='forecast-title'>Pronóstico extendido para {city}</h2>
                {forecastData ?
                this.renderForecastItemsDays(forecastData) : this.renderProgress()}
            </div>);
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired, 
}
export default ForecastExtended;