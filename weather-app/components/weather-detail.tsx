import { Cloud, CloudRain, CloudFog, CloudLightning, Sun, CloudSun, Droplets, Wind } from "lucide-react"
import { format } from "date-fns"

interface WeatherData {
  id: number
  date: Date
  formattedDate: string
  condition: string
  tempHigh: number
  tempLow: number
  humidity: number
  windSpeed: number
  precipitation: number
}

interface WeatherDetailProps {
  weatherData: WeatherData
}

export default function WeatherDetail({ weatherData }: WeatherDetailProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-12 w-12 md:h-16 md:w-16 text-yellow-500" />
      case "Clear":
        return <Sun className="h-12 w-12 md:h-16 md:w-16 text-yellow-500" />
      case "Partly Cloudy":
        return <CloudSun className="h-12 w-12 md:h-16 md:w-16 text-gray-500" />
      case "Cloudy":
        return <Cloud className="h-12 w-12 md:h-16 md:w-16 text-gray-500" />
      case "Rainy":
        return <CloudRain className="h-12 w-12 md:h-16 md:w-16 text-blue-500" />
      case "Thunderstorm":
        return <CloudLightning className="h-12 w-12 md:h-16 md:w-16 text-purple-500" />
      case "Foggy":
        return <CloudFog className="h-12 w-12 md:h-16 md:w-16 text-gray-400" />
      default:
        return <Sun className="h-12 w-12 md:h-16 md:w-16 text-yellow-500" />
    }
  }

  const isToday = new Date().toDateString() === weatherData.date.toDateString()
  const displayDate = isToday ? "Today" : format(weatherData.date, "EEEE, MMMM d, yyyy")

  return (
    <div>
      <div className="text-lg md:text-xl font-semibold mb-1 text-gray-800 dark:text-white">{displayDate}</div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 mt-3 md:mt-4">
        <div className="flex items-center">
          <div className="mr-4">{getWeatherIcon(weatherData.condition)}</div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{weatherData.tempHigh}°C</div>
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-300">{weatherData.condition}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4 mt-3 md:mt-0">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 md:p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Droplets className="h-4 w-4 text-blue-500 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Humidity</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
              {weatherData.humidity}%
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 md:p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Wind className="h-4 w-4 text-blue-500 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Wind</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
              {weatherData.windSpeed} km/h
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 md:p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <CloudRain className="h-4 w-4 text-blue-500 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Precipitation</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
              {weatherData.precipitation}%
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 md:p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Sun className="h-4 w-4 text-blue-500 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Low</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
              {weatherData.tempLow}°C
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

