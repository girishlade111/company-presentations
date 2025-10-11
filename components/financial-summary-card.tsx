"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { EditableNumber } from "@/components/editable-number"
import { EditableText } from "@/components/editable-text"
import { EditableProgress } from "@/components/editable-progress"

interface FinancialSummaryCardProps {
  title: string
  revenue: number
  profit: number
  target: number
  revenueChange?: number
  profitChange?: number
  onRevenueChange?: (value: number) => void
  onProfitChange?: (value: number) => void
  onTargetChange?: (value: number) => void
  onRevenueChangeChange?: (value: number) => void
  onProfitChangeChange?: (value: number) => void
}

export function FinancialSummaryCard({
  title,
  revenue,
  profit,
  target,
  revenueChange = 0,
  profitChange = 0,
  onRevenueChange = () => {},
  onProfitChange = () => {},
  onTargetChange = () => {},
  onRevenueChangeChange = () => {},
  onProfitChangeChange = () => {},
}: FinancialSummaryCardProps) {
  const revenuePercentage = Math.round((revenue / target) * 100)
  const profitPercentage = Math.round((profit / revenue) * 100)
  const targetProfitPercentage = 30 // Assuming 30% profit margin target

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <EditableText
            text={`${title} Financial Summary`}
            onTextChange={(text) => console.log(`Title changed to: ${text}`)}
            className="text-gold-500"
          />
        </CardTitle>
        <CardDescription>
          <EditableText
            text="Current financial performance"
            onTextChange={(text) => console.log(`Description changed to: ${text}`)}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Revenue</span>
                <div className="text-2xl font-bold">
                  <EditableNumber
                    value={revenue}
                    onValueChange={onRevenueChange}
                    formatter={(val) => `€${val.toLocaleString()}`}
                    parser={(val) => Number(val.replace(/[^0-9]/g, ""))}
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-muted-foreground">Target</span>
                <div className="text-2xl font-bold">
                  <EditableNumber
                    value={target}
                    onValueChange={onTargetChange}
                    formatter={(val) => `€${val.toLocaleString()}`}
                    parser={(val) => Number(val.replace(/[^0-9]/g, ""))}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress: {revenuePercentage}%</span>
                {revenueChange !== 0 && (
                  <span className={revenueChange > 0 ? "text-green-500" : "text-red-500"}>
                    {revenueChange > 0 ? (
                      <ArrowUpRight className="inline h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="inline h-3 w-3 mr-1" />
                    )}
                    <EditableNumber
                      value={Math.abs(revenueChange)}
                      onValueChange={(val) => onRevenueChangeChange(revenueChange >= 0 ? val : -val)}
                      suffix="% from last period"
                      className={revenueChange > 0 ? "text-green-500" : "text-red-500"}
                    />
                  </span>
                )}
              </div>
              <EditableProgress
                value={revenuePercentage}
                onValueChange={(val) => {
                  // Calculate new revenue based on percentage
                  const newRevenue = Math.round((val / 100) * target)
                  onRevenueChange(newRevenue)
                }}
                showPercentage={false}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Profit</span>
                <div className="text-2xl font-bold">
                  <EditableNumber
                    value={profit}
                    onValueChange={onProfitChange}
                    formatter={(val) => `€${val.toLocaleString()}`}
                    parser={(val) => Number(val.replace(/[^0-9]/g, ""))}
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-muted-foreground">Margin</span>
                <div className="text-2xl font-bold">
                  <EditableNumber
                    value={profitPercentage}
                    onValueChange={(val) => {
                      // Calculate new profit based on margin percentage
                      const newProfit = Math.round((val / 100) * revenue)
                      onProfitChange(newProfit)
                    }}
                    suffix="%"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Target Margin: {targetProfitPercentage}%</span>
                {profitChange !== 0 && (
                  <span className={profitChange > 0 ? "text-green-500" : "text-red-500"}>
                    {profitChange > 0 ? (
                      <ArrowUpRight className="inline h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="inline h-3 w-3 mr-1" />
                    )}
                    <EditableNumber
                      value={Math.abs(profitChange)}
                      onValueChange={(val) => onProfitChangeChange(profitChange >= 0 ? val : -val)}
                      suffix="% from last period"
                      className={profitChange > 0 ? "text-green-500" : "text-red-500"}
                    />
                  </span>
                )}
              </div>
              <EditableProgress
                value={(profitPercentage / targetProfitPercentage) * 100}
                onValueChange={(val) => {
                  // Calculate new profit based on percentage of target margin
                  const newMarginPercentage = Math.round((val / 100) * targetProfitPercentage)
                  const newProfit = Math.round((newMarginPercentage / 100) * revenue)
                  onProfitChange(newProfit)
                }}
                className={profitPercentage >= targetProfitPercentage ? "bg-green-500" : "bg-amber-500"}
                showPercentage={false}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
