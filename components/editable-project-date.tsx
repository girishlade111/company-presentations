"use client"

import { useState } from "react"
import { Check, X, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EditableProjectDateProps {
  date: string
  onDateChange: (newDate: string) => void
  className?: string
}

export function EditableProjectDate({ date, onDateChange, className }: EditableProjectDateProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(date)

  const handleSave = () => {
    onDateChange(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(date)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-1">
        <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="h-7 w-28" />
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCancel}>
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
      {date}
      <Edit2 className="ml-1 h-3 w-3 opacity-50" />
    </Button>
  )
}
