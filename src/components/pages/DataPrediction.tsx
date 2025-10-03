import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, BarChart3, Target, Zap, Filter, Download, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface PredictionMetric {
  id: string
  metric: string
  currentValue: number
  predictedValue: number
  accuracy: number
  trend: 'up' | 'down' | 'stable'
  confidence: 'High' | 'Medium' | 'Low'
  timeframe: string
}

const mockPredictions: PredictionMetric[] = [
  {
    id: 'PM-001',
    metric: 'Fleet Utilization',
    currentValue: 87.5,
    predictedValue: 92.3,
    accuracy: 94.2,
    trend: 'up',
    confidence: 'High',
    timeframe: 'Next 30 days'
  },
  {
    id: 'PM-002',
    metric: 'Maintenance Cost',
    currentValue: 125000,
    predictedValue: 118000,
    accuracy: 89.7,
    trend: 'down',
    confidence: 'High',
    timeframe: 'Next 30 days'
  },
  {
    id: 'PM-003',
    metric: 'Energy Consumption',
    currentValue: 45000,
    predictedValue: 47200,
    accuracy: 91.5,
    trend: 'up',
    confidence: 'Medium',
    timeframe: 'Next 30 days'
  },
  {
    id: 'PM-004',
    metric: 'Punctuality Rate',
    currentValue: 98.7,
    predictedValue: 99.1,
    accuracy: 96.8,
    trend: 'up',
    confidence: 'High',
    timeframe: 'Next 30 days'
  },
  {
    id: 'PM-005',
    metric: 'Passenger Load',
    currentValue: 125000,
    predictedValue: 132000,
    accuracy: 88.3,
    trend: 'up',
    confidence: 'Medium',
    timeframe: 'Next 30 days'
  }
]

export function DataPrediction() {
  const { t } = useTranslation()
  const [timeframeFilter, setTimeframeFilter] = useState<string>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<string>('all')
  const [trendFilter, setTrendFilter] = useState<string>('all')

  const filteredData = mockPredictions.filter(prediction => {
    const matchesTimeframe = timeframeFilter === 'all' || prediction.timeframe === timeframeFilter
    const matchesConfidence = confidenceFilter === 'all' || prediction.confidence === confidenceFilter
    const matchesTrend = trendFilter === 'all' || prediction.trend === trendFilter
    return matchesTimeframe && matchesConfidence && matchesTrend
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  const getConfidenceBadge = (confidence: string) => {
    const variants = {
      'High': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' },
      'Medium': { variant: 'standby' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Low': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' }
    }
    const config = variants[confidence as keyof typeof variants] || { variant: 'default' as const, className: '' }
    return (
      <Badge variant={config.variant} className={config.className}>
        {confidence}
      </Badge>
    )
  }

  const formatValue = (value: number, metric: string) => {
    if (metric.includes('Cost') || metric.includes('Revenue')) {
      return `$${value.toLocaleString()}`
    }
    if (metric.includes('Rate') || metric.includes('Utilization')) {
      return `${value}%`
    }
    return value.toLocaleString()
  }

  const analytics = {
    total: mockPredictions.length,
    highConfidence: mockPredictions.filter(p => p.confidence === 'High').length,
    averageAccuracy: mockPredictions.reduce((sum, p) => sum + p.accuracy, 0) / mockPredictions.length,
    upwardTrends: mockPredictions.filter(p => p.trend === 'up').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Prediction</h2>
        <p className="text-gray-600 dark:text-gray-300">AI-powered analytics and predictive insights for railway operations</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Predictions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">High Confidence</p>
                <p className="text-2xl font-bold text-green-600">{analytics.highConfidence}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Accuracy</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.averageAccuracy.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Upward Trends</p>
                <p className="text-2xl font-bold text-green-600">{analytics.upwardTrends}</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timeframes</SelectItem>
                <SelectItem value="Next 7 days">Next 7 days</SelectItem>
                <SelectItem value="Next 30 days">Next 30 days</SelectItem>
                <SelectItem value="Next 90 days">Next 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Confidence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Confidence</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={trendFilter} onValueChange={setTrendFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Trend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trends</SelectItem>
                <SelectItem value="up">Upward</SelectItem>
                <SelectItem value="down">Downward</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Predictions
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((prediction) => (
          <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{prediction.metric}</CardTitle>
                {getTrendIcon(prediction.trend)}
              </div>
              <div className="flex items-center gap-2">
                {getConfidenceBadge(prediction.confidence)}
                <Badge variant="outline">{prediction.timeframe}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
                  <span className="font-semibold">{formatValue(prediction.currentValue, prediction.metric)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Predicted</span>
                  <span className="font-semibold text-blue-600">{formatValue(prediction.predictedValue, prediction.metric)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
                  <span className="font-semibold text-green-600">{prediction.accuracy.toFixed(1)}%</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Change: {((prediction.predictedValue - prediction.currentValue) / prediction.currentValue * 100).toFixed(1)}%</span>
                    <span>Confidence: {prediction.confidence}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Key Insights</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Fleet utilization is expected to increase by 4.8%</li>
                  <li>• Maintenance costs are predicted to decrease by 5.6%</li>
                  <li>• Energy consumption will likely increase by 4.9%</li>
                  <li>• Punctuality rate is forecasted to improve to 99.1%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Optimize energy consumption strategies</li>
                  <li>• Prepare for increased passenger load</li>
                  <li>• Continue current maintenance practices</li>
                  <li>• Monitor fleet utilization closely</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
