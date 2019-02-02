import express from 'express'
import { WeatherDataManager } from './models/WeatherDataManager'

export const router = express.Router()

router.get('/', (req, res) => res.send({
    server: {
        name: 'Minneapolis Weather Forecast Server',
        apiVersion: '0.2'
    },
    availableDataSeries: {
        forecastData: {
            name: 'Minneapolis forecast data',
            description: 'Temperature, apparent temperature, humidity, and wind speed in Minneapolis recorded every minute since 12:00 PM Feb 1, 2019'
        },
        averageForecastData: {
            name: ' Minneapolis average forecast data',
            description: 'Average temperature, apparent temperature, humidity, and wind speed in Minneapolis'
        },
        currentForecastData: {
            name: 'Minneapolis current forecast data',
            description: 'Current temperature, apparent temperature, humidity, and wind speed in Minneapolis'
        }
    }
}))

router.get('/forecastData', (req, res) => res.send({
    format: 'date', 
    data: WeatherDataManager.read()
}))

// TODO: create cache for this. Update it whenever data is added to weather-data.json
router.get('/averageForecastData', (req, res) => res.send({
    format: 'date',
    data: WeatherDataManager.getAverageData()
}))

// TODO: create cache for current forecast and return that instead
// app.get('/api/currentForecastData', (req, res) => res.send({
//     format: 'date',
//     data: WeatherDataManager.read().pop()[1]
// }))
