import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Cpu, Target, Zap, Filter, Play, Download, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface MLAnalysis {
  id: string
  name: string
  type: 'Classification' | 'Regression' | 'Clustering' | 'Anomaly Detection'
  status: 'Running' | 'Completed' | 'Failed' | 'Pending'
  accuracy: number
  progress: number
  dataset: string
  algorithm: string
  results: number
  lastRun: string
  description: string
}

const mockAnalyses: MLAnalysis[] = [
  {
    id: 'ML-001',
    name: 'Fleet Performance Prediction',
    type: 'Regression',
    status: 'Completed',
    accuracy: 94.2,
    progress: 100,
    dataset: 'Fleet Operations',
    algorithm: 'Random Forest',
    results: 1250,
    lastRun: '2024-02-01 14:30',
    description: 'Predicts fleet performance based on historical data'
  },
  {
    id: 'ML-002',
    name: 'Maintenance Anomaly Detection',
    type: 'Anomaly Detection',
    status: 'Running',
    accuracy: 0,
    progress: 67,
    dataset: 'Maintenance Records',
    algorithm: 'Isolation Forest',
    results: 0,
    lastRun: '2024-02-01 15:45',
    description: 'Detects unusual patterns in maintenance data'
  },
  {
    id: 'ML-003',
    name: 'Passenger Flow Classification',
    type: 'Classification',
    status: 'Completed',
    accuracy: 91.8,
    progress: 100,
    dataset: 'Passenger Data',
    algorithm: 'SVM',
    results: 890,
    lastRun: '2024-01-31 10:15',
    description: 'Classifies passenger flow patterns'
  },
  {
    id: 'ML-004',
    name: 'Energy Consumption Clustering',
    type: 'Clustering',
    status: 'Failed',
    accuracy: 0,
    progress: 0,
    dataset: 'Energy Data',
    algorithm: 'K-Means',
    results: 0,
    lastRun: '2024-01-30 16:20',
    description: 'Groups trains by energy consumption patterns'
  },
  {
    id: 'ML-005',
    name: 'Route Optimization',
    type: 'Regression',
    status: 'Pending',
    accuracy: 0,
    progress: 0,
    dataset: 'Route Data',
    algorithm: 'Neural Network',
    results: 0,
    lastRun: 'Never',
    description: 'Optimizes train routes for efficiency'
  }
]

export function MLAnalysis() {
  const { t } = useTranslation()
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [algorithmFilter, setAlgorithmFilter] = useState<string>('all')

  const filteredData = mockAnalyses.filter(analysis => {
    const matchesType = typeFilter === 'all' || analysis.type === typeFilter
    const matchesStatus = statusFilter === 'all' || analysis.status === statusFilter
    const matchesAlgorithm = algorithmFilter === 'all' || analysis.algorithm === algorithmFilter
    return matchesType && matchesStatus && matchesAlgorithm
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Running': { variant: 'standby' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Completed': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' },
      'Failed': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' },
      'Pending': { variant: 'default' as const, className: 'bg-gray-100 text-gray-800' }
    }
    const config = variants[status as keyof typeof variants] || { variant: 'default' as const, className: '' }
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      'Classification': { className: 'bg-blue-100 text-blue-800' },
      'Regression': { className: 'bg-green-100 text-green-800' },
      'Clustering': { className: 'bg-purple-100 text-purple-800' },
      'Anomaly Detection': { className: 'bg-orange-100 text-orange-800' }
    }
    const config = variants[type as keyof typeof variants] || { className: '' }
    return (
      <Badge variant="outline" className={config.className}>
        {type}
      </Badge>
    )
  }

  const analytics = {
    total: mockAnalyses.length,
    completed: mockAnalyses.filter(a => a.status === 'Completed').length,
    running: mockAnalyses.filter(a => a.status === 'Running').length,
    failed: mockAnalyses.filter(a => a.status === 'Failed').length,
    averageAccuracy: mockAnalyses
      .filter(a => a.accuracy > 0)
      .reduce((sum, a) => sum + a.accuracy, 0) / mockAnalyses.filter(a => a.accuracy > 0).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ML Analysis</h2>
        <p className="text-gray-600 dark:text-gray-300">Machine learning models and AI-driven insights for railway operations</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Models</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed</p>
                <p className="text-2xl font-bold text-green-600">{analytics.completed}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Running</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.running}</p>
              </div>
              <Cpu className="h-8 w-8 text-yellow-600" />
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
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Classification">Classification</SelectItem>
                <SelectItem value="Regression">Regression</SelectItem>
                <SelectItem value="Clustering">Clustering</SelectItem>
                <SelectItem value="Anomaly Detection">Anomaly Detection</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Algorithms</SelectItem>
                <SelectItem value="Random Forest">Random Forest</SelectItem>
                <SelectItem value="SVM">SVM</SelectItem>
                <SelectItem value="K-Means">K-Means</SelectItem>
                <SelectItem value="Isolation Forest">Isolation Forest</SelectItem>
                <SelectItem value="Neural Network">Neural Network</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Run Analysis
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ML Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((analysis) => (
          <Card key={analysis.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{analysis.name}</CardTitle>
                {getStatusBadge(analysis.status)}
              </div>
              <div className="flex items-center gap-2">
                {getTypeBadge(analysis.type)}
                <Badge variant="outline">{analysis.algorithm}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Dataset</span>
                  <span className="font-medium">{analysis.dataset}</span>
                </div>
                
                {analysis.status === 'Running' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{analysis.progress}%</span>
                    </div>
                    <Progress value={analysis.progress} className="h-2" />
                  </div>
                )}
                
                {analysis.accuracy > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
                    <span className="font-semibold text-green-600">{analysis.accuracy.toFixed(1)}%</span>
                  </div>
                )}
                
                {analysis.results > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Results</span>
                    <span className="font-semibold text-blue-600">{analysis.results.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Last Run</span>
                  <span className="text-sm">{analysis.lastRun}</span>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">{analysis.description}</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {analysis.status === 'Pending' && (
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {analysis.status === 'Completed' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Results
                    </Button>
                  )}
                  {analysis.status === 'Failed' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Top Performing Models</h4>
              <div className="space-y-2">
                {mockAnalyses
                  .filter(a => a.accuracy > 0)
                  .sort((a, b) => b.accuracy - a.accuracy)
                  .slice(0, 3)
                  .map((analysis, index) => (
                    <div key={analysis.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">{index + 1}. {analysis.name}</span>
                      <span className="text-sm font-semibold text-green-600">{analysis.accuracy.toFixed(1)}%</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Recent Activity</h4>
              <div className="space-y-2">
                {mockAnalyses
                  .sort((a, b) => new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime())
                  .slice(0, 3)
                  .map((analysis) => (
                    <div key={analysis.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm">{analysis.name}</span>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(analysis.status)}
                        <span className="text-xs text-gray-500">{analysis.lastRun}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
