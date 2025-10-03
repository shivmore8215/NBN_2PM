import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wrench, AlertCircle, CheckCircle, Clock, Filter, Plus, Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface JobCard {
  id: string
  trainId: string
  workType: string
  status: 'Open' | 'In Progress' | 'Completed' | 'On Hold'
  priority: 'High' | 'Medium' | 'Low'
  assignedTo: string
  createdDate: string
  dueDate: string
  description: string
}

const mockData: JobCard[] = [
  {
    id: 'JC-2024-001',
    trainId: 'TR-4521',
    workType: 'Brake System Check',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Team A',
    createdDate: '2024-01-15',
    dueDate: '2024-01-20',
    description: 'Complete brake system inspection and maintenance'
  },
  {
    id: 'JC-2024-002',
    trainId: 'TR-4522',
    workType: 'Engine Maintenance',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Team B',
    createdDate: '2024-01-14',
    dueDate: '2024-01-22',
    description: 'Engine oil change and filter replacement'
  },
  {
    id: 'JC-2024-003',
    trainId: 'TR-4523',
    workType: 'Interior Cleaning',
    status: 'Completed',
    priority: 'Low',
    assignedTo: 'Team C',
    createdDate: '2024-01-13',
    dueDate: '2024-01-18',
    description: 'Deep cleaning of passenger compartments'
  },
  {
    id: 'JC-2024-004',
    trainId: 'TR-4524',
    workType: 'Electrical System',
    status: 'On Hold',
    priority: 'High',
    assignedTo: 'Team A',
    createdDate: '2024-01-12',
    dueDate: '2024-01-25',
    description: 'Electrical panel inspection and repair'
  },
  {
    id: 'JC-2024-005',
    trainId: 'TR-4525',
    workType: 'Safety Inspection',
    status: 'Open',
    priority: 'Medium',
    assignedTo: 'Team D',
    createdDate: '2024-01-11',
    dueDate: '2024-01-19',
    description: 'Comprehensive safety system check'
  }
]

export function JobCardStatus() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')

  const filteredData = mockData.filter(job => {
    const matchesSearch = job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.workType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter
    const matchesTeam = teamFilter === 'all' || job.assignedTo === teamFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesTeam
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Open': { variant: 'default' as const, icon: Clock, className: 'bg-blue-100 text-blue-800' },
      'In Progress': { variant: 'standby' as const, icon: Wrench, className: 'bg-yellow-100 text-yellow-800' },
      'Completed': { variant: 'ready' as const, icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      'On Hold': { variant: 'critical' as const, icon: AlertCircle, className: 'bg-red-100 text-red-800' }
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

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'High': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' },
      'Medium': { variant: 'standby' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Low': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' }
    }
    const config = variants[priority as keyof typeof variants] || { variant: 'default' as const, className: '' }
    return (
      <Badge variant={config.variant} className={config.className}>
        {priority}
      </Badge>
    )
  }

  const analytics = {
    total: mockData.length,
    open: mockData.filter(j => j.status === 'Open').length,
    inProgress: mockData.filter(j => j.status === 'In Progress').length,
    completed: mockData.filter(j => j.status === 'Completed').length,
    onHold: mockData.filter(j => j.status === 'On Hold').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job-Card Status</h2>
        <p className="text-gray-600 dark:text-gray-300">Track and manage maintenance job cards and work assignments</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <Wrench className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Open</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.open}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
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
              <Wrench className="h-8 w-8 text-yellow-600" />
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
                placeholder="Search by Job ID, Train ID, or Work Type..."
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
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="Team A">Team A</SelectItem>
                <SelectItem value="Team B">Team B</SelectItem>
                <SelectItem value="Team C">Team C</SelectItem>
                <SelectItem value="Team D">Team D</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Job
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Cards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Card Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Work Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((job) => (
                  <TableRow key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.trainId}</TableCell>
                    <TableCell>{job.workType}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                    <TableCell>{job.assignedTo}</TableCell>
                    <TableCell>{job.dueDate}</TableCell>
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
