import { WeatherDataManager } from "./WeatherDataManager";

export const Cache = (function() {

    let _currentForecast, _averageData

    const getCurrentForecast = () => _currentForecast 
    const getAverageData = () => _averageData 

    void function() {
        const update = data => {
            _currentForecast = WeatherDataManager.getCurrentForecast(data)
            _averageData = WeatherDataManager.getAverageData(data)
        }
        
        //Upon initialization, set currentForecast and averageData
        update(WeatherDataManager.read())

        //Update data in cache after new data is written
        WeatherDataManager.subscribe(update)
    }()

    return { getCurrentForecast, getAverageData }
})()