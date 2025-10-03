import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Play, Pause, Square, Download, RefreshCw, BarChart3, Clock } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface Simulation {
  id: string
  name: string
  type: 'Fleet Optimization' | 'Route Planning' | 'Maintenance Scheduling' | 'Passenger Flow'
  status: 'Running' | 'Paused' | 'Completed' | 'Stopped'
  progress: number
  duration: string
  parameters: Record<string, any>
  results?: {
    efficiency: number
    cost: number
    time: number
    recommendations: string[]
  }
  startedAt: string
  description: string
}

const mockSimulations: Simulation[] = [
  {
    id: 'SIM-001',
    name: 'Peak Hour Fleet Optimization',
    type: 'Fleet Optimization',
    status: 'Running',
    progress: 75,
    duration: '2h 15m',
    parameters: {
      trains: 25,
      routes: 8,
      peakHours: '7-9 AM, 5-7 PM',
      constraints: 'Maintenance windows'
    },
    startedAt: '2024-02-01 14:30',
    description: 'Optimizes fleet deployment during peak hours'
  },
  {
    id: 'SIM-002',
    name: 'Maintenance Window Planning',
    type: 'Maintenance Scheduling',
    status: 'Completed',
    progress: 100,
    duration: '1h 45m',
    parameters: {
      trains: 30,
      maintenanceTypes: ['Scheduled', 'Preventive', 'Emergency'],
      timeWindow: '22:00-06:00'
    },
    results: {
      efficiency: 94.2,
      cost: 125000,
      time: 6.5,
      recommendations: [
        'Schedule heavy maintenance on weekends',
        'Optimize bay allocation for efficiency',
        'Implement predictive maintenance'
      ]
    },
    startedAt: '2024-01-31 16:00',
    description: 'Plans optimal maintenance schedules'
  },
  {
    id: 'SIM-003',
    name: 'Route Efficiency Analysis',
    type: 'Route Planning',
    status: 'Paused',
    progress: 45,
    duration: '1h 20m',
    parameters: {
      routes: 12,
      stations: 45,
      frequency: 'Every 5 minutes',
      constraints: 'Track capacity'
    },
    startedAt: '2024-02-01 10:15',
    description: 'Analyzes route efficiency and optimization opportunities'
  },
  {
    id: 'SIM-004',
    name: 'Passenger Flow Modeling',
    type: 'Passenger Flow',
    status: 'Stopped',
    progress: 0,
    duration: '0m',
    parameters: {
      stations: 45,
      timePeriod: '24 hours',
      passengerData: 'Historical + Real-time'
    },
    startedAt: '2024-01-30 09:00',
    description: 'Models passenger flow patterns and capacity planning'
  }
]

export function Simulation() {
  const { t } = useTranslation()
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [newSimulationName, setNewSimulationName] = useState('')

  const filteredData = mockSimulations.filter(simulation => {
    const matchesType = typeFilter === 'all' || simulation.type === typeFilter
    const matchesStatus = statusFilter === 'all' || simulation.status === statusFilter
    return matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Running': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' },
      'Paused': { variant: 'standby' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Completed': { variant: 'default' as const, className: 'bg-blue-100 text-blue-800' },
      'Stopped': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' }
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
      'Fleet Optimization': { className: 'bg-blue-100 text-blue-800' },
      'Route Planning': { className: 'bg-green-100 text-green-800' },
      'Maintenance Scheduling': { className: 'bg-orange-100 text-orange-800' },
      'Passenger Flow': { className: 'bg-purple-100 text-purple-800' }
    }
    const config = variants[type as keyof typeof variants] || { className: '' }
    return (
      <Badge variant="outline" className={config.className}>
        {type}
      </Badge>
    )
  }

  const analytics = {
    total: mockSimulations.length,
    running: mockSimulations.filter(s => s.status === 'Running').length,
    completed: mockSimulations.filter(s => s.status === 'Completed').length,
    paused: mockSimulations.filter(s => s.status === 'Paused').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Simulation</h2>
        <p className="text-gray-600 dark:text-gray-300">Operational modeling and simulation tools for railway optimization</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Simulations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Running</p>
                <p className="text-2xl font-bold text-green-600">{analytics.running}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.completed}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Paused</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.paused}</p>
              </div>
              <Pause className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter simulation name..."
                value={newSimulationName}
                onChange={(e) => setNewSimulationName(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Fleet Optimization">Fleet Optimization</SelectItem>
                <SelectItem value="Route Planning">Route Planning</SelectItem>
                <SelectItem value="Maintenance Scheduling">Maintenance Scheduling</SelectItem>
                <SelectItem value="Passenger Flow">Passenger Flow</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Stopped">Stopped</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              New Simulation
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((simulation) => (
          <Card key={simulation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{simulation.name}</CardTitle>
                {getStatusBadge(simulation.status)}
              </div>
              <div className="flex items-center gap-2">
                {getTypeBadge(simulation.type)}
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {simulation.duration}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {simulation.status === 'Running' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{simulation.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${simulation.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Started</span>
                    <span className="text-sm">{simulation.startedAt}</span>
                  </div>
                  
                  {simulation.results && (
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Efficiency</span>
                        <span className="font-semibold text-green-600">{simulation.results.efficiency}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Cost</span>
                        <span className="font-semibold">${simulation.results.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">{simulation.description}</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {simulation.status === 'Running' && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Square className="h-4 w-4 mr-1" />
                        Stop
                      </Button>
                    </>
                  )}
                  {simulation.status === 'Paused' && (
                    <>
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Square className="h-4 w-4 mr-1" />
                        Stop
                      </Button>
                    </>
                  )}
                  {simulation.status === 'Completed' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Results
                    </Button>
                  )}
                  {simulation.status === 'Stopped' && (
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Restart
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Results */}
      {filteredData.some(s => s.results) && (
        <Card>
          <CardHeader>
            <CardTitle>Latest Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData
                .filter(s => s.results)
                .map((simulation) => (
                  <div key={simulation.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{simulation.name}</h4>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{simulation.results?.efficiency}%</p>
                        <p className="text-sm text-gray-600">Efficiency</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">${simulation.results?.cost.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Cost</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{simulation.results?.time}h</p>
                        <p className="text-sm text-gray-600">Time</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Recommendations:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {simulation.results?.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
