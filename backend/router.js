import express from 'express'
import { WeatherDataManager } from './models/WeatherDataManager'
import { Cache } from './models/Cache'

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

registerDataEndPoint('/forecastData', WeatherDataManager.read())
registerDataEndPoint('/averageForecastData', Cache.getAverageData())
registerDataEndPoint('/currentForecastData', Cache.getCurrentForecast())

function registerDataEndPoint(endpoint, data) {
    router.get(endpoint, (req, res) => res.send({
        format: 'date',
        data
    }))
}