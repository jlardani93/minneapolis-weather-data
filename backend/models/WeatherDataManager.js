import fs from 'fs'
import { Observable } from '../lib/Observable';
import { truthy } from '../lib/js-utils';

const WEATHER_DATA_PATH = '../weather-data.json'

export const WeatherDataManager = (function() {

    const { observers, subscribe, notify, unsubscribe } = new Observable()
    
    const read = () => JSON.parse(fs.readFileSync(WEATHER_DATA_PATH)).data
    
    const write = ({ time, temperature, apparentTemperature, humidity, windSpeed }) => {
        const forecast = { time, temperature, apparentTemperature, humidity, windSpeed }
        if (Object.values(forecast).every(truthy)) {
            const newData = JSON.stringify({ data: [...read(), [time, { ...forecast }]] }, null, 2)
            fs.writeFileSync(WEATHER_DATA_PATH, newData)
            notify(newData.data)
        } else {
            console.log('The provided forecast is invalid')
        }
    }
    
    const getAverageData = (data = read()) => {
        const average = propName => data.reduce( (acc, forecast) => acc + forecast[1][propName], 0)/data.length
        return {
            averageTemperature: average('temperature'),
            averageApparentTemperature: average('apparentTemperature'),
            averageHumidity: average('humidity'),
            averageWindSpeed: average('windSpeed')
        }
    }

    const getCurrentForecast = (data = read()) => data.pop()[1]
    
    return { read, write, getAverageData, getCurrentForecast, observers, subscribe, notify, unsubscribe }
}())