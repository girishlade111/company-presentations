"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDateContext } from "@/context/date-context"

export function DateRangePicker({
  className,
  align = "end",
  showPresets = true,
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: "center" | "start" | "end"
  showPresets?: boolean
}) {
  const { dateRange, setDateRange, presets, applyPreset } = useDateContext()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              if (range) {
                setDateRange(range)
                setIsOpen(false)
              }
            }}
            numberOfMonths={2}
          />
          {showPresets && (
            <div className="border-t border-border p-3">
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      applyPreset(preset.value)
                      setIsOpen(false)
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
