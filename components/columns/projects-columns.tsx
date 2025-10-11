"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditableDate } from "@/components/editable-date"

export type Project = {
  id: string
  name: string
  actual: number
  planned: number
  startDate: string
  endDate: string
  type: "B2B" | "B2C"
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const actual = row.original.actual
      const planned = row.original.planned

      return (
        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs">
            <span>Actual: {actual}%</span>
            <span>Planned: {planned}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-muted-foreground/20" style={{ width: `${planned}%` }}></div>
            <div className="absolute inset-0 h-full bg-primary" style={{ width: `${actual}%` }}></div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <EditableDate
          date={row.original.startDate}
          onDateChange={(newDate) => {
            // This would be handled by the parent component
            console.log(`Updating start date for ${row.original.id} to ${newDate}`)
          }}
        />
      )
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <EditableDate
          date={row.original.endDate}
          onDateChange={(newDate) => {
            // This would be handled by the parent component
            console.log(`Updating end date for ${row.original.id} to ${newDate}`)
          }}
        />
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <Badge variant={type === "B2B" ? "default" : "secondary"}>{type}</Badge>
    },
  },
]
