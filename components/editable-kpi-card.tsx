"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { EditableText } from "./editable-text"
import { EditableNumber } from "./editable-number"

interface EditableKpiCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  change?: number
  onTitleChange: (newTitle: string) => void
  onValueChange: (newValue: string | number) => void
  onDescriptionChange: (newDescription: string) => void
  onChangeValueChange?: (newChange: number) => void
  formatter?: (value: number) => string
  numeric?: boolean
  prefix?: string
  suffix?: string
}

export function EditableKpiCard({
  title,
  value,
  description,
  icon,
  change,
  onTitleChange,
  onValueChange,
  onDescriptionChange,
  onChangeValueChange,
  formatter = (val) => val.toString(),
  numeric = false,
  prefix = "",
  suffix = "",
}: EditableKpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <EditableText text={title} onTextChange={onTitleChange} className="text-gold-500" />
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {numeric ? (
            <EditableNumber
              value={typeof value === "number" ? value : Number.parseFloat(value.toString())}
              onValueChange={(val) => onValueChange(val)}
              formatter={formatter}
              prefix={prefix}
              suffix={suffix}
              className="text-2xl"
            />
          ) : (
            <EditableText text={value.toString()} onTextChange={(val) => onValueChange(val)} className="text-2xl" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          <EditableText
            text={description}
            onTextChange={onDescriptionChange}
            className="text-xs text-muted-foreground"
          />
        </p>
        {change !== undefined && onChangeValueChange && (
          <div className="mt-2 flex items-center text-xs">
            {change >= 0 ? (
              <>
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <EditableNumber
                  value={Math.abs(change)}
                  onValueChange={(val) => onChangeValueChange(val * (change >= 0 ? 1 : -1))}
                  suffix="%"
                  className="text-green-500"
                />
              </>
            ) : (
              <>
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                <EditableNumber
                  value={Math.abs(change)}
                  onValueChange={(val) => onChangeValueChange(val * (change >= 0 ? 1 : -1))}
                  suffix="%"
                  className="text-red-500"
                />
              </>
            )}
            <span className="ml-1 text-muted-foreground">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
