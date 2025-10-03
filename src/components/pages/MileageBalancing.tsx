import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gauge, TrendingUp, TrendingDown, Target, Filter, Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface MileageData {
  id: string
  trainId: string
  currentMileage: number
  targetMileage: number
  variance: number
  efficiency: 'High' | 'Normal' | 'Low'
  lastService: string
  nextService: string
  route: string
}

const mockData: MileageData[] = [
  {
    id: 'MB-001',
    trainId: 'TR-4521',
    currentMileage: 125430,
    targetMileage: 130000,
    variance: 3.5,
    efficiency: 'High',
    lastService: '2024-01-10',
    nextService: '2024-02-10',
    route: 'Route A'
  },
  {
    id: 'MB-002',
    trainId: 'TR-4522',
    currentMileage: 98000,
    targetMileage: 100000,
    variance: 2.0,
    efficiency: 'High',
    lastService: '2024-01-12',
    nextService: '2024-02-12',
    route: 'Route B'
  },
  {
    id: 'MB-003',
    trainId: 'TR-4523',
    currentMileage: 145000,
    targetMileage: 140000,
    variance: -3.6,
    efficiency: 'Low',
    lastService: '2024-01-08',
    nextService: '2024-02-08',
    route: 'Route C'
  },
  {
    id: 'MB-004',
    trainId: 'TR-4524',
    currentMileage: 112000,
    targetMileage: 115000,
    variance: 2.6,
    efficiency: 'Normal',
    lastService: '2024-01-15',
    nextService: '2024-02-15',
    route: 'Route D'
  },
  {
    id: 'MB-005',
    trainId: 'TR-4525',
    currentMileage: 138000,
    targetMileage: 135000,
    variance: -2.2,
    efficiency: 'Normal',
    lastService: '2024-01-05',
    nextService: '2024-02-05',
    route: 'Route E'
  }
]

export function MileageBalancing() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [efficiencyFilter, setEfficiencyFilter] = useState<string>('all')
  const [varianceFilter, setVarianceFilter] = useState<string>('all')

  const filteredData = mockData.filter(train => {
    const matchesSearch = train.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.route.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEfficiency = efficiencyFilter === 'all' || train.efficiency === efficiencyFilter
    const matchesVariance = varianceFilter === 'all' || 
      (varianceFilter === 'positive' && train.variance > 0) ||
      (varianceFilter === 'negative' && train.variance < 0) ||
      (varianceFilter === 'zero' && train.variance === 0)
    return matchesSearch && matchesEfficiency && matchesVariance
  })

  const getEfficiencyBadge = (efficiency: string) => {
    const variants = {
      'High': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' },
      'Normal': { variant: 'standby' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Low': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' }
    }
    const config = variants[efficiency as keyof typeof variants] || { variant: 'default' as const, className: '' }
    return (
      <Badge variant={config.variant} className={config.className}>
        {efficiency}
      </Badge>
    )
  }

  const getVarianceDisplay = (variance: number) => {
    const isPositive = variance > 0
    const isNegative = variance < 0
    const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Target
    const color = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-4 w-4" />
        <span className="font-medium">{variance > 0 ? '+' : ''}{variance.toFixed(1)}%</span>
      </div>
    )
  }

  const analytics = {
    total: mockData.length,
    highEfficiency: mockData.filter(t => t.efficiency === 'High').length,
    normalEfficiency: mockData.filter(t => t.efficiency === 'Normal').length,
    lowEfficiency: mockData.filter(t => t.efficiency === 'Low').length,
    averageVariance: mockData.reduce((sum, t) => sum + t.variance, 0) / mockData.length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mileage Balancing</h2>
        <p className="text-gray-600 dark:text-gray-300">Monitor train mileage efficiency and target achievement</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Trains</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <Gauge className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">High Efficiency</p>
                <p className="text-2xl font-bold text-green-600">{analytics.highEfficiency}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Low Efficiency</p>
                <p className="text-2xl font-bold text-red-600">{analytics.lowEfficiency}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Variance</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.averageVariance.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by Train ID or Route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={efficiencyFilter} onValueChange={setEfficiencyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Efficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Efficiency</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={varianceFilter} onValueChange={setVarianceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Variance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Variance</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="zero">Zero</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mileage Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mileage Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Current Mileage</TableHead>
                  <TableHead>Target Mileage</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead>Next Service</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((train) => (
                  <TableRow key={train.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{train.trainId}</TableCell>
                    <TableCell>{train.route}</TableCell>
                    <TableCell className="font-medium">{train.currentMileage.toLocaleString()}</TableCell>
                    <TableCell>{train.targetMileage.toLocaleString()}</TableCell>
                    <TableCell>{getVarianceDisplay(train.variance)}</TableCell>
                    <TableCell>{getEfficiencyBadge(train.efficiency)}</TableCell>
                    <TableCell>{train.nextService}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
