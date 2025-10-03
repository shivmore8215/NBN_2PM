import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, CheckCircle, Clock, AlertCircle, Filter, Plus, Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface CleaningSchedule {
  id: string
  trainId: string
  bay: string
  time: string
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Overdue'
  cleaningType: 'Deep Clean' | 'Standard' | 'Quick Clean' | 'Sanitization'
  assignedTeam: string
  duration: number
  notes: string
}

const mockData: CleaningSchedule[] = [
  {
    id: 'CS-001',
    trainId: 'TR-4521',
    bay: 'Bay 3',
    time: '2024-02-01 14:00',
    status: 'Completed',
    cleaningType: 'Deep Clean',
    assignedTeam: 'Team A',
    duration: 120,
    notes: 'Full interior and exterior cleaning completed'
  },
  {
    id: 'CS-002',
    trainId: 'TR-4522',
    bay: 'Bay 5',
    time: '2024-02-01 16:30',
    status: 'In Progress',
    cleaningType: 'Standard',
    assignedTeam: 'Team B',
    duration: 60,
    notes: 'Standard cleaning in progress'
  },
  {
    id: 'CS-003',
    trainId: 'TR-4523',
    bay: 'Bay 2',
    time: '2024-02-02 09:00',
    status: 'Scheduled',
    cleaningType: 'Quick Clean',
    assignedTeam: 'Team C',
    duration: 30,
    notes: 'Quick cleaning scheduled for morning shift'
  },
  {
    id: 'CS-004',
    trainId: 'TR-4524',
    bay: 'Bay 1',
    time: '2024-01-30 10:00',
    status: 'Overdue',
    cleaningType: 'Sanitization',
    assignedTeam: 'Team A',
    duration: 90,
    notes: 'Sanitization overdue - requires immediate attention'
  },
  {
    id: 'CS-005',
    trainId: 'TR-4525',
    bay: 'Bay 4',
    time: '2024-02-01 12:00',
    status: 'Completed',
    cleaningType: 'Standard',
    assignedTeam: 'Team D',
    duration: 45,
    notes: 'Standard cleaning completed on time'
  }
]

export function CleaningDetailing() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')

  const filteredData = mockData.filter(cleaning => {
    const matchesSearch = cleaning.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cleaning.bay.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cleaning.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cleaning.status === statusFilter
    const matchesType = typeFilter === 'all' || cleaning.cleaningType === typeFilter
    const matchesTeam = teamFilter === 'all' || cleaning.assignedTeam === typeFilter
    return matchesSearch && matchesStatus && matchesType && matchesTeam
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Completed': { variant: 'ready' as const, icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      'In Progress': { variant: 'standby' as const, icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
      'Scheduled': { variant: 'default' as const, icon: Clock, className: 'bg-blue-100 text-blue-800' },
      'Overdue': { variant: 'critical' as const, icon: AlertCircle, className: 'bg-red-100 text-red-800' }
    }
    const config = variants[status as keyof typeof variants] || { variant: 'default' as const, icon: Clock, className: '' }
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      'Deep Clean': { className: 'bg-purple-100 text-purple-800' },
      'Standard': { className: 'bg-blue-100 text-blue-800' },
      'Quick Clean': { className: 'bg-green-100 text-green-800' },
      'Sanitization': { className: 'bg-orange-100 text-orange-800' }
    }
    const config = variants[type as keyof typeof variants] || { className: '' }
    return (
      <Badge variant="outline" className={config.className}>
        {type}
      </Badge>
    )
  }

  const analytics = {
    total: mockData.length,
    completed: mockData.filter(c => c.status === 'Completed').length,
    inProgress: mockData.filter(c => c.status === 'In Progress').length,
    scheduled: mockData.filter(c => c.status === 'Scheduled').length,
    overdue: mockData.filter(c => c.status === 'Overdue').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cleaning & Detailing</h2>
        <p className="text-gray-600 dark:text-gray-300">Manage train cleaning schedules and detailing operations</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Schedules</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-600" />
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
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{analytics.overdue}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
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
                placeholder="Search by Train ID, Bay, or Schedule ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Deep Clean">Deep Clean</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Quick Clean">Quick Clean</SelectItem>
                <SelectItem value="Sanitization">Sanitization</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Schedule
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cleaning Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cleaning Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Schedule ID</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Bay</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((cleaning) => (
                  <TableRow key={cleaning.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{cleaning.id}</TableCell>
                    <TableCell>{cleaning.trainId}</TableCell>
                    <TableCell>{cleaning.bay}</TableCell>
                    <TableCell>{cleaning.time}</TableCell>
                    <TableCell>{getStatusBadge(cleaning.status)}</TableCell>
                    <TableCell>{getTypeBadge(cleaning.cleaningType)}</TableCell>
                    <TableCell>{cleaning.assignedTeam}</TableCell>
                    <TableCell>{cleaning.duration} min</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
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
