"use client"

import { useState } from "react"
import { Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EditableProgressProps {
  value: number
  plannedValue?: number
  onValueChange: (value: number) => void
  onPlannedValueChange?: (value: number) => void
  className?: string
  showPercentage?: boolean
}

export function EditableProgress({
  value,
  plannedValue,
  onValueChange,
  onPlannedValueChange,
  className = "",
  showPercentage = true,
}: EditableProgressProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [editPlannedValue, setEditPlannedValue] = useState(plannedValue ?? 100)

  const handleSave = () => {
    onValueChange(editValue)
    if (plannedValue !== undefined && onPlannedValueChange) {
      onPlannedValueChange(editPlannedValue)
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setEditPlannedValue(plannedValue ?? 100)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="space-y-1">
        {plannedValue !== undefined && showPercentage && (
          <div className="flex justify-between text-xs">
            <span>Actual: {value}%</span>
            <span>Planned: {plannedValue}%</span>
          </div>
        )}
        <div className="relative flex items-center">
          <div className="flex-grow">
            {plannedValue !== undefined ? (
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-muted-foreground/20" style={{ width: `${plannedValue}%` }}></div>
                <div className="absolute inset-0 h-full bg-primary" style={{ width: `${value}%` }}></div>
              </div>
            ) : (
              <Progress value={value} className={`h-2 ${className}`} />
            )}
          </div>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-1 h-6 w-6 text-navy-600">
              <Sliders className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
        </div>
        {!plannedValue && showPercentage && (
          <div className="flex justify-end text-xs">
            <span>{value}%</span>
          </div>
        )}
      </div>

      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Actual Progress</label>
              <span className="text-sm">{editValue}%</span>
            </div>
            <Slider
              value={[editValue]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => setEditValue(val[0])}
              className="text-navy-600"
            />
          </div>

          {plannedValue !== undefined && onPlannedValueChange && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Planned Progress</label>
                <span className="text-sm">{editPlannedValue}%</span>
              </div>
              <Slider
                value={[editPlannedValue]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => setEditPlannedValue(val[0])}
                className="text-navy-600"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" className="bg-navy-600 text-white hover:bg-navy-700" onClick={handleSave}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
