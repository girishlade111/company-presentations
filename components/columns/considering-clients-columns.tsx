"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type ConsideringClient = {
  id: string
  name: string
  sqm: number
  company: string
  budget: number
  meetingDate: string
  status: string
  type: "B2B" | "B2C"
}

export const columns: ColumnDef<ConsideringClient>[] = [
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
    accessorKey: "sqm",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Area (m²)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const sqm = Number.parseFloat(row.getValue("sqm"))
      return <div className="text-right font-medium">{sqm.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Budget (€)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const budget = Number.parseFloat(row.getValue("budget"))
      return <div className="text-right font-medium">{budget.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline"

      switch (status.toLowerCase()) {
        case "offer":
          variant = "default"
          break
        case "visitation":
          variant = "secondary"
          break
        case "meeting":
          variant = "outline"
          break
        case "boq":
          variant = "destructive"
          break
      }

      return <Badge variant={variant}>{status}</Badge>
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
