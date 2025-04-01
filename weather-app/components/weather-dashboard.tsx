"use client"

import { useState } from "react"
import { format, subDays } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import WeatherCarousel from "./weather-carousel"
import WeatherDetail from "./weather-detail"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

// Generate 7 days of mock weather data
const generateWeatherData = () => {
  const weatherConditions = [
    { condition: "Sunny", tempHigh: 28, tempLow: 18, humidity: 45, windSpeed: 8, precipitation: 0 },
    { condition: "Partly Cloudy", tempHigh: 24, tempLow: 16, humidity: 50, windSpeed: 10, precipitation: 0 },
    { condition: "Cloudy", tempHigh: 22, tempLow: 15, humidity: 60, windSpeed: 12, precipitation: 10 },
    { condition: "Rainy", tempHigh: 20, tempLow: 14, humidity: 75, windSpeed: 15, precipitation: 30 },
    { condition: "Thunderstorm", tempHigh: 19, tempLow: 13, humidity: 85, windSpeed: 20, precipitation: 60 },
    { condition: "Clear", tempHigh: 26, tempLow: 17, humidity: 40, windSpeed: 5, precipitation: 0 },
    { condition: "Foggy", tempHigh: 21, tempLow: 14, humidity: 90, windSpeed: 3, precipitation: 5 },
  ]

  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i)
    const randomIndex = Math.floor(Math.random() * weatherConditions.length)

    return {
      id: i,
      date: date,
      formattedDate: format(date, "EEE, MMM d"),
      ...weatherConditions[randomIndex],
    }
  }).reverse()
}

const weatherData = generateWeatherData()

export default function WeatherDashboard() {
  const [selectedDay, setSelectedDay] = useState(weatherData[weatherData.length - 1])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">Weather Forecast</h1>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full h-9 w-9 md:h-10 md:w-10">
          {isDarkMode ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-0">
        <CardContent className="p-3 md:p-6">
          <WeatherDetail weatherData={selectedDay} />

          <div className="mt-6 md:mt-8">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-700 dark:text-gray-200">
              7-Day Forecast
            </h2>
            <WeatherCarousel weatherData={weatherData} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

