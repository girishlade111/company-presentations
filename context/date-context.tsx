"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { subDays, subMonths, startOfMonth, endOfMonth, startOfWeek } from "date-fns"

type DateRange = {
  from: Date
  to: Date
}

type DateContextType = {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  presets: {
    label: string
    value: () => DateRange
  }[]
  applyPreset: (preset: () => DateRange) => void
  isLoading: boolean
}

const DateContext = createContext<DateContextType | undefined>(undefined)

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })
  const [isLoading, setIsLoading] = useState(false)

  const presets = [
    {
      label: "Today",
      value: () => ({
        from: new Date(),
        to: new Date(),
      }),
    },
    {
      label: "Yesterday",
      value: () => ({
        from: subDays(new Date(), 1),
        to: subDays(new Date(), 1),
      }),
    },
    {
      label: "Last 7 days",
      value: () => ({
        from: subDays(new Date(), 6),
        to: new Date(),
      }),
    },
    {
      label: "Last 30 days",
      value: () => ({
        from: subDays(new Date(), 29),
        to: new Date(),
      }),
    },
    {
      label: "This month",
      value: () => ({
        from: startOfMonth(new Date()),
        to: new Date(),
      }),
    },
    {
      label: "Last month",
      value: () => ({
        from: startOfMonth(subMonths(new Date(), 1)),
        to: endOfMonth(subMonths(new Date(), 1)),
      }),
    },
    {
      label: "This week",
      value: () => ({
        from: startOfWeek(new Date(), { weekStartsOn: 1 }),
        to: new Date(),
      }),
    },
  ]

  const applyPreset = (preset: () => DateRange) => {
    setIsLoading(true)
    setDateRange(preset())
    setTimeout(() => setIsLoading(false), 500) // Simulate loading
  }

  // When date range changes, simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [dateRange])

  return (
    <DateContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        dateRange,
        setDateRange,
        presets,
        applyPreset,
        isLoading,
      }}
    >
      {children}
    </DateContext.Provider>
  )
}

export function useDateContext() {
  const context = useContext(DateContext)
  if (context === undefined) {
    throw new Error("useDateContext must be used within a DateProvider")
  }
  return context
}
