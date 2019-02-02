import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import { DarkSkyApi } from './models/DarkSkyApi';
import { WeatherDataManager } from './models/WeatherDataManager';

require('dotenv').config({ path: '../.env' })

const app = express()
const router = express.Router()

const API_PORT = process.env.API_PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api', router);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' })
})

app.get('/api', (req, res) => res.send({
    server: {
        name: 'Minneapolis Weather Forecast Server',
        apiVersion: '0.2'
    },
    availableDataSeries: {
        forecastData: {
            name: 'Minneapolis forecast data',
            description: 'Temperature, apparent temperature, humidity, and wind speed in Minneapolis recorded every minute since 12:00 PM Feb 1, 2019'
        },
        currentForecastData: {
            name: 'Minneapolis current forecast data',
            description: 'Current temperature, apparent temperature, humidity, and wind speed in Minneapolis'
        }
    }
}))

app.get('/api/forecastData', (req, res) => res.send({
    format: 'date', 
    data: WeatherDataManager.read()
}))

// TODO: create cache for this. Update it whenever data is added to weather-data.json
app.get('/api/averageForecastData', (req, res) => res.send({
    format: 'date',
    data: WeatherDataManager.getAverageData()
}))

// TODO: create cache for current forecast and return that instead
// app.get('/api/currentForecastData', (req, res) => res.send({
//     format: 'date',
//     data: WeatherDataManager.read().pop()[1]
// }))


// Receive updated forecast every minute

setInterval(() => { DarkSkyApi.getForecast().then(forecast => WeatherDataManager.write(forecast)) }, 60*1000)

app.listen(API_PORT, () => console.log(`I'm Listening on port ${API_PORT}`))