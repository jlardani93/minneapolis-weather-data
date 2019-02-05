import axios from 'axios'

export const DarkSkyApi  = {

    getForecast() {
        return axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/44.9778,-93.2650`)
            .then(res => {
                const { time, temperature, apparentTemperature, humidity, windSpeed } = res.data.currently
                console.log('currently', res.data.currenty)
                return { time, temperature, apparentTemperature, humidity, windSpeed }
            })
            .catch(error => { console.log("Error message:", error.response.data) }
        )
    }
}