import express from 'express'
import logger from 'morgan'
import { DarkSkyApi } from './models/DarkSkyApi';
import { WeatherDataManager } from './models/WeatherDataManager';
import { router } from './router'

require('dotenv').config({ path: '../.env' })

const app = express()
const API_PORT = process.env.API_PORT || 3001

app.use(logger('dev'))
app.use('/api', router);

// Receive updated forecast every minute
setInterval(() => { DarkSkyApi.getForecast().then(forecast => WeatherDataManager.write(forecast)) }, 60*1000)

app.listen(API_PORT, () => console.log(`I'm Listening on port ${API_PORT}`))