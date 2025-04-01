import WeatherDashboard from "@/components/weather-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <WeatherDashboard />
    </main>
  )
}

export const metadata = {
  title: "Weather App",
  description: "7-day weather forecast application",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

