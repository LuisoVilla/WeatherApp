import React, {Component}  from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import {PropTypes} from 'prop-types';
import Location from './Location';
import WeatherData from  './WeatherData';
import './styles.css';
import transformWeather from './../../services/TransformWeather'; 
import getUrlWeatherByCity from './../../services/GetUrlWeatherByCity';

class WeatherLocation extends Component {

    constructor (props) {
        super(props);
        const {city} = props;
        this.state = {
            city,
            data: null,
        };
        console.log("1");
    }

    componentDidMount() {
        console.log("2");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("3");
    }

    componentWillMount() {
        console.log("Unsafe4");
        this.handleUpdateClick();
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Unsafe5");
    }

    handleUpdateClick = () => {
        const api_weather = getUrlWeatherByCity(this.state.city);
        fetch(api_weather).then(resolve => {
            return resolve.json();
        }).then(data => {
            const newWeather = transformWeather(data);
            console.log(newWeather);
            // console.log(data);
            this.setState({
                data: newWeather
            });
        });
    }

    render() {
        console.log("6");
        const { onWeatherLocationClick }= this.props;
        const {city, data} = this.state
        return (
            <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
                <Location city={city}></Location>
                {data ? 
                    <WeatherData data={data}></WeatherData> : <CircularProgress size={50} /> 
                }
                {/* <button onClick={this.handleUpdateClick}>Actualizar</button> */}
            </div>
        );
    }
}

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func,
}
export default WeatherLocation;