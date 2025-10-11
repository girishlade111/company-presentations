"use client"

import { useState } from "react"
import { format, parse } from "date-fns"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EditableDateProps {
  date: string
  format?: string
  onDateChange: (newDate: string) => void
  className?: string
}

export function EditableDate({ date, format: dateFormat = "dd.MM.yyyy", onDateChange, className }: EditableDateProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Parse the string date to a Date object
  const parsedDate = parse(date, dateFormat, new Date())

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(format(newDate, dateFormat))
      setIsEditing(false)
    }
  }

  return (
    <Popover open={isEditing} onOpenChange={setIsEditing}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className={`p-0 h-auto font-normal hover:bg-transparent hover:underline ${className}`}>
          {date}
          <Calendar className="ml-1 h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent mode="single" selected={parsedDate} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
