import axios from 'axios'

export class DarkSkyApi {

    static getForecast() {
        return axios.get(`https://api.darksky.net/forecast/badkey/44.9778,-93.2650`)
            .then(res => {
                const { time, temperature, apparentTemperature, humidity, windSpeed } = res.data.currently
                return { time, temperature, apparentTemperature, humidity, windSpeed }
            })
            .catch(error => { console.log(error) }
        )
    }
}