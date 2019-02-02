import React, { Component } from 'react';

class App extends Component {

  state = {
    forecastData: null,
    averageForecastData: null,
    activeTable: null,
  }

  handleFetchData = name => () => {
    fetch(`/api/${name}`)
      .then(res => res.json())
      .then(res => {this.setState({ [name]: res.data, activeTable: name }) })
  }

  render() {

    const averages  = this.state.averageForecastData
    const { forecastData, activeTable } = this.state

    return (
      <div>
        <button onClick={this.handleFetchData('forecastData')}>Get Minneapolis Weather Data</button>
        <button onClick={this.handleFetchData('averageForecastData')}>Get Averages</button>
        {averages && activeTable === 'averageForecastData' &&
          (<table>
            <thead>
              <tr>
                <th>Average Temperature</th>
                <th>Average Apparent Temperature</th>
                <th>Average Humidity</th>
                <th>Average Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{round(averages.averageTemperature)} F</td>
                <td>{round(averages.averageApparentTemperature)} F </td>
                <td>{round(averages.averageHumidity*100)}%</td>
                <td>{round(averages.averageWindSpeed)} mph</td>
              </tr>
            </tbody>
          </table>)}
        {forecastData && activeTable === 'forecastData' && 
          (<table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
                <th>Apparent Temperature</th>
                <th>Humidity</th>
                <th>Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              {this.state.forecastData && this.state.forecastData.map( ([date, forecast]) => (
                <tr key={date}>
                  <td>{new Date(forecast.time*1000).toTimeString()}</td>
                  <td>{forecast.temperature} F</td>
                  <td>{forecast.apparentTemperature} F </td>
                  <td>{forecast.humidity*100}%</td>
                  <td>{forecast.windSpeed} mph</td>
                </tr>
              ))}
            </tbody>
          </table>)}
      </div>
    );
  }
}

const round = num => Math.round(num*100)/100

export default App;
