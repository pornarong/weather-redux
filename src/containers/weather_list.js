import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {  
    getTempData(data) {
        return data.main.temp;
    }
    renderWeather(data) {
        const name = data.city.name;  
        const temps = data.list.map(weather => weather.main.temp); 
        const pressures = data.list.map(weather => weather.main.pressure); 
        const humidities = data.list.map(weather => weather.main.humidity);      
        return (
            <tr key={name}>
                <td className="col-md-3"><GoogleMap lat={data.city.coord.lat} lon={data.city.coord.lon} /></td>
                <td className="col-md-3"><Chart color="red" data={temps} width={180} height={120} units="K" /></td>
                <td className="col-md-3"><Chart color="blue" data={pressures} width={180} height={120} units="hPa" /></td>
                <td className="col-md-3"><Chart color="green" data={humidities} width={180} height={120} units="%" /></td>
            </tr>
        )
    }
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>   
                        <th className="col-md-3">City</th>
                        <th className="col-md-3">Temperature (K)</th>
                        <th className="col-md-3">Pressure (hPa)</th>
                        <th className="col-md-3">Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);