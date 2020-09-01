import React, { Component } from 'react';
import { Grid, Col, Row} from 'react-flexbox-grid';
import './App.css';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationList from './components/LocationList';
import { AppBar, Paper } from '@material-ui/core';
import ForecastExtended from './components/ForecastExtended';

const cities = [
    'Buenos Aires,ar',
    'Washington,us',
    'Ciudad de Mexico, mx',
    'Madrid,es',
    'Lima,pe',
    'Tucuman,ar',
];
class App extends Component {

  constructor() {
    super();
    this.state = { city: null}
  }
  handleSelectionLocation = city => {
    this.setState({city});
    console.log(`handleSelectedLocation${city}`);
  }

  render () {
    const {city} = this.state;
    return (
    <Grid>
      <Row>
        <AppBar position='sticky'>
          <Toolbar>
            <Typography color='inherit'>
              Weather App
            </Typography>
          </Toolbar>
        </AppBar>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <LocationList cities = {cities} 
            onSelectedLocation = {this.handleSelectionLocation}> 
          </LocationList>
        </Col>
        <Col xs={12} md={6}>
          <Paper>
            <div className="details">
              {
                city ? 
                <ForecastExtended city = {city} ></ForecastExtended> : null
              }
            </div>
          </Paper>
        </Col>
      </Row>
    </Grid>
    );
  }
}

export default App;
