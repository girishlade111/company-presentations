"use client"

import { useState } from "react"
import { Edit2, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

interface ChartDataPoint {
  [key: string]: any
}

interface EditableChartDataProps {
  data: ChartDataPoint[]
  onDataChange: (data: ChartDataPoint[]) => void
  mainKey: string
  valueKeys: { key: string; label: string }[]
  title?: string
}

export function EditableChartData({
  data,
  onDataChange,
  mainKey,
  valueKeys,
  title = "Edit Chart Data",
}: EditableChartDataProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState<ChartDataPoint[]>(data)

  const handleSave = () => {
    onDataChange(editData)
    setIsOpen(false)
  }

  const handleChange = (rowIndex: number, key: string, value: string) => {
    const newData = [...editData]
    // Parse numeric values
    const parsedValue = key === mainKey ? value : isNaN(Number.parseFloat(value)) ? value : Number.parseFloat(value)
    newData[rowIndex] = { ...newData[rowIndex], [key]: parsedValue }
    setEditData(newData)
  }

  const handleAddRow = () => {
    // Create a new row with default values
    const newRow: ChartDataPoint = { [mainKey]: `New ${mainKey}` }
    valueKeys.forEach(({ key }) => {
      newRow[key] = 0
    })
    setEditData([...editData, newRow])
  }

  const handleRemoveRow = (index: number) => {
    setEditData(editData.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent text-navy-600 hover:underline flex items-center"
          size="sm"
        >
          <Edit2 className="h-3 w-3 mr-1" />
          Edit chart data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-gold-500">{title}</DialogTitle>
          <DialogDescription>Edit the chart data points below. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{mainKey}</TableHead>
                {valueKeys.map(({ label, key }) => (
                  <TableHead key={key}>{label}</TableHead>
                ))}
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {editData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <Input
                      value={row[mainKey]}
                      onChange={(e) => handleChange(rowIndex, mainKey, e.target.value)}
                      className="h-8"
                    />
                  </TableCell>
                  {valueKeys.map(({ key }) => (
                    <TableCell key={key}>
                      <Input
                        type="number"
                        value={row[key]}
                        onChange={(e) => handleChange(rowIndex, key, e.target.value)}
                        className="h-8"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveRow(rowIndex)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button variant="outline" className="flex items-center mt-2 w-full justify-center" onClick={handleAddRow}>
          <Plus className="h-4 w-4 mr-1" />
          Add row
        </Button>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setEditData(data)
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button className="bg-navy-600 text-white hover:bg-navy-700" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
