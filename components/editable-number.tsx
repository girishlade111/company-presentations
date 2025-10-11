"use client"

import { useState } from "react"
import { Check, X, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EditableNumberProps {
  value: number
  onValueChange: (value: number) => void
  formatter?: (value: number) => string
  parser?: (value: string) => number
  prefix?: string
  suffix?: string
  className?: string
  min?: number
  max?: number
}

export function EditableNumber({
  value,
  onValueChange,
  formatter = (val) => val.toString(),
  parser = (val) => Number.parseFloat(val),
  prefix = "",
  suffix = "",
  className = "",
  min,
  max,
}: EditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(formatter(value))

  const handleSave = () => {
    try {
      let newValue = parser(editValue)

      if (min !== undefined) {
        newValue = Math.max(min, newValue)
      }

      if (max !== undefined) {
        newValue = Math.min(max, newValue)
      }

      onValueChange(newValue)
      setEditValue(formatter(newValue))
    } catch (e) {
      // If parsing fails, reset to the original value
      setEditValue(formatter(value))
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(formatter(value))
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-1">
        {prefix && <span className="text-sm text-muted-foreground">{prefix}</span>}
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-7 w-full text-navy-600"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") handleCancel()
          }}
        />
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
        <Button size="icon" variant="ghost" className="h-7 w-7 text-navy-600" onClick={handleSave}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 text-navy-600" onClick={handleCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      className={`p-0 h-auto font-normal hover:bg-transparent hover:underline flex items-center ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {prefix}
      {formatter(value)}
      {suffix}
      <Edit2 className="ml-1 h-3 w-3 opacity-50" />
    </Button>
  )
}
