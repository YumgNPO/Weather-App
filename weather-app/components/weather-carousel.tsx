"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import WeatherCard from "./weather-card"
import { useMobile } from "@/hooks/use-mobile"

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

interface WeatherCarouselProps {
  weatherData: WeatherData[]
  selectedDay: WeatherData
  onSelectDay: (day: WeatherData) => void
}

export default function WeatherCarousel({ weatherData, selectedDay, onSelectDay }: WeatherCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const isMobile = useMobile()

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 120 : 300
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 shadow-md h-8 w-8 md:h-10 md:w-10"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-2 md:gap-3 pb-4 scrollbar-hide -mx-1 px-1 touch-pan-x"
        onScroll={checkScrollButtons}
      >
        {weatherData.map((day) => (
          <WeatherCard
            key={day.id}
            weatherData={day}
            isSelected={selectedDay.id === day.id}
            onClick={() => onSelectDay(day)}
          />
        ))}
      </div>

      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 shadow-md h-8 w-8 md:h-10 md:w-10"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

