"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Edit2, Plus, Trash, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EditableListProps {
  items: string[]
  onItemsChange: (items: string[]) => void
  className?: string
  bulletType?: "number" | "bullet" | "check" | "none"
  title?: string
  addNewText?: string
  editable?: boolean
}

export function EditableList({
  items,
  onItemsChange,
  className = "",
  bulletType = "bullet",
  title,
  addNewText = "Add new item",
  editable = true,
}: EditableListProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editItems, setEditItems] = useState<string[]>(items)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [newItem, setNewItem] = useState("")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (editingIndex !== null && itemRefs.current[editingIndex]) {
      itemRefs.current[editingIndex]?.focus()
    }
  }, [editingIndex])

  const handleSave = () => {
    onItemsChange(editItems.filter((item) => item.trim() !== ""))
    setIsEditing(false)
    setEditingIndex(null)
  }

  const handleCancel = () => {
    setEditItems(items)
    setIsEditing(false)
    setEditingIndex(null)
  }

  const handleAddItem = () => {
    if (newItem.trim()) {
      setEditItems([...editItems, newItem])
      setNewItem("")
    }
  }

  const handleRemoveItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index))
  }

  const handleUpdateItem = (index: number, value: string) => {
    const newItems = [...editItems]
    newItems[index] = value
    setEditItems(newItems)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    if (draggedIndex !== index) {
      const newItems = [...editItems]
      const draggedItem = newItems[draggedIndex]

      // Remove the dragged item
      newItems.splice(draggedIndex, 1)
      // Insert it at the new position
      newItems.splice(index, 0, draggedItem)

      setEditItems(newItems)
      setDraggedIndex(index)
    }
  }

  const getBullet = (index: number, item: string) => {
    switch (bulletType) {
      case "number":
        return (
          <div className="h-5 w-5 rounded-full bg-gold-500 text-white flex items-center justify-center text-xs">
            {index + 1}
          </div>
        )
      case "check":
        return (
          <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</div>
        )
      case "bullet":
        return <div className="h-2 w-2 rounded-full bg-navy-600 mt-2"></div>
      default:
        return null
    }
  }

  if (isEditing) {
    return (
      <Card className="p-4">
        {title && <h3 className="font-medium mb-3 text-gold-500">{title}</h3>}
        <div className="space-y-2 mb-4">
          {editItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-muted/50 p-2 rounded-md"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
            >
              <div className="cursor-move touch-none">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              {editingIndex === index ? (
                <Input
                  ref={(el) => (itemRefs.current[index] = el)}
                  value={item}
                  onChange={(e) => handleUpdateItem(index, e.target.value)}
                  className="h-7 flex-grow"
                  autoFocus
                  onBlur={() => setEditingIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditingIndex(null)
                  }}
                />
              ) : (
                <span className="flex-grow cursor-text truncate" onClick={() => setEditingIndex(index)}>
                  {item}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder={addNewText}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem()
              }
            }}
          />
          <Button variant="outline" size="icon" onClick={handleAddItem} disabled={!newItem.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="bg-navy-600 text-white hover:bg-navy-700" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {title && <h3 className="font-medium mb-2 text-gold-500">{title}</h3>}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            {getBullet(index, item)}
            <span className="flex-grow">{item}</span>
          </li>
        ))}
      </ul>
      {editable && (
        <Button
          variant="ghost"
          className="p-0 h-auto mt-2 text-navy-600 hover:bg-transparent hover:underline"
          onClick={() => setIsEditing(true)}
        >
          <Edit2 className="h-3 w-3 mr-1" />
          Edit list
        </Button>
      )}
    </div>
  )
}
