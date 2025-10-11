"use client"

import { useState } from "react"
import { Check, X, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditableTextProps {
  text: string
  onTextChange: (text: string) => void
  className?: string
  multiline?: boolean
  placeholder?: string
}

export function EditableText({
  text,
  onTextChange,
  className = "",
  multiline = false,
  placeholder = "Enter text...",
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(text)

  const handleSave = () => {
    onTextChange(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(text)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-start space-x-1">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="min-h-[80px] text-navy-600"
            placeholder={placeholder}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel()
              if (e.key === "Enter" && e.ctrlKey) handleSave()
            }}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="h-7 w-full text-navy-600"
            placeholder={placeholder}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") handleCancel()
            }}
          />
        )}
        <div className="flex flex-col">
          <Button size="icon" variant="ghost" className="h-7 w-7 mb-1 text-navy-600" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-navy-600" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      className={`p-0 h-auto font-normal text-left hover:bg-transparent hover:underline flex items-center ${className} ${text ? "" : "text-muted-foreground italic"}`}
      onClick={() => setIsEditing(true)}
    >
      {text || placeholder}
      <Edit2 className="ml-1 h-3 w-3 opacity-50 flex-shrink-0" />
    </Button>
  )
}
