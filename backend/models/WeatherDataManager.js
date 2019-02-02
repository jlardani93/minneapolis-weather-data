import fs, { access } from 'fs'

const WEATHER_DATA_PATH = '../weather-data.json'

export class WeatherDataManager {
    /*
    * Reads the time-series data on file for Minneapolis forecasts
    * */
    static read() {
        // error handling? 
        return JSON.parse(fs.readFileSync(WEATHER_DATA_PATH)).data
    }

    /*
    * Adds an entry to the time-series data on file for Minneapolis forecasts
    * */
    static write(forecast) {
        // error handling?
        const { time, temperature, apparentTemperature, humidity, windSpeed } = forecast
        if (time && temperature && apparentTemperature && humidity && windSpeed) {
            const data = this.read()
            const newData = JSON.stringify({ data: [
                ...data,
                [time, { time, temperature, apparentTemperature, humidity, windSpeed }]
            ]}, null, 2)
            fs.writeFileSync(WEATHER_DATA_PATH, newData)
        } else {
            console.log('The provided forecast is invalid')
        }
    }

    static getAverageData() {
        const data = this.read()
        const average = propName => data.reduce( (acc, forecast) => acc + forecast[1][propName], 0)/data.length
        return {
            averageTemperature: average('temperature'),
            averageApparentTemperature: average('apparentTemperature'),
            averageHumidity: average('humidity'),
            averageWindSpeed: average('windSpeed')
        }
    }
}