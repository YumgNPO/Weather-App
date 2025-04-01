"use client"

import { Cloud, CloudRain, CloudFog, CloudLightning, Sun, CloudSun } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface WeatherCardProps {
  weatherData: WeatherData
  isSelected: boolean
  onClick: () => void
}

export default function WeatherCard({ weatherData, isSelected, onClick }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
      case "Clear":
        return <Sun className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
      case "Partly Cloudy":
        return <CloudSun className="h-6 w-6 md:h-8 md:w-8 text-gray-500" />
      case "Cloudy":
        return <Cloud className="h-6 w-6 md:h-8 md:w-8 text-gray-500" />
      case "Rainy":
        return <CloudRain className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
      case "Thunderstorm":
        return <CloudLightning className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
      case "Foggy":
        return <CloudFog className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
      default:
        return <Sun className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
    }
  }

  const isToday = new Date().toDateString() === weatherData.date.toDateString()

  return (
    <div
      className={cn(
        "flex-shrink-0 w-[100px] md:w-[130px] p-2 md:p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected
          ? "bg-blue-100 dark:bg-blue-900 shadow-md"
          : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",
      )}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
    >
      <div className="flex flex-col items-center">
        <div className="text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          {isToday ? "Today" : weatherData.formattedDate}
        </div>

        <div className="my-1 md:my-2">{getWeatherIcon(weatherData.condition)}</div>

        <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 md:mb-2 line-clamp-1">
          {weatherData.condition}
        </div>

        <div className="flex justify-between w-full">
          <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-white">{weatherData.tempHigh}°</span>
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{weatherData.tempLow}°</span>
        </div>
      </div>
    </div>
  )
}

