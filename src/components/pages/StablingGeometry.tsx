import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, CheckCircle, Clock, AlertCircle, Filter, Plus, Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface StablingData {
  id: string
  trainId: string
  bay: string
  position: 'Platform Side' | 'Maintenance' | 'Storage' | 'Service'
  occupiedSince: string
  departureTime: string
  status: 'Occupied' | 'Available' | 'Reserved' | 'Maintenance'
  duration: number
  nextTrain?: string
  notes: string
}

const mockData: StablingData[] = [
  {
    id: 'SG-001',
    trainId: 'TR-4521',
    bay: 'A-12',
    position: 'Platform Side',
    occupiedSince: '18:30',
    departureTime: '05:45',
    status: 'Occupied',
    duration: 11.25,
    notes: 'Overnight stabling for morning service'
  },
  {
    id: 'SG-002',
    trainId: 'TR-4522',
    bay: 'B-08',
    position: 'Maintenance',
    occupiedSince: '14:00',
    departureTime: '08:00',
    status: 'Maintenance',
    duration: 18,
    notes: 'Scheduled maintenance work'
  },
  {
    id: 'SG-003',
    trainId: 'TR-4523',
    bay: 'C-15',
    position: 'Storage',
    occupiedSince: '20:00',
    departureTime: '06:30',
    status: 'Occupied',
    duration: 10.5,
    notes: 'End of service stabling'
  },
  {
    id: 'SG-004',
    trainId: 'TR-4524',
    bay: 'A-05',
    position: 'Platform Side',
    occupiedSince: '16:45',
    departureTime: '07:15',
    status: 'Reserved',
    duration: 14.5,
    nextTrain: 'TR-4525',
    notes: 'Reserved for peak hour service'
  },
  {
    id: 'SG-005',
    trainId: 'TR-4525',
    bay: 'B-12',
    position: 'Service',
    occupiedSince: '15:30',
    departureTime: '05:00',
    status: 'Available',
    duration: 0,
    notes: 'Available for assignment'
  }
]

export function StablingGeometry() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [positionFilter, setPositionFilter] = useState<string>('all')
  const [bayFilter, setBayFilter] = useState<string>('all')

  const filteredData = mockData.filter(stabling => {
    const matchesSearch = stabling.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stabling.bay.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stabling.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || stabling.status === statusFilter
    const matchesPosition = positionFilter === 'all' || stabling.position === positionFilter
    const matchesBay = bayFilter === 'all' || stabling.bay.startsWith(bayFilter)
    return matchesSearch && matchesStatus && matchesPosition && matchesBay
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Occupied': { variant: 'critical' as const, icon: AlertCircle, className: 'bg-red-100 text-red-800' },
      'Available': { variant: 'ready' as const, icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      'Reserved': { variant: 'standby' as const, icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
      'Maintenance': { variant: 'maintenance' as const, icon: AlertCircle, className: 'bg-orange-100 text-orange-800' }
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

  const getPositionBadge = (position: string) => {
    const variants = {
      'Platform Side': { className: 'bg-blue-100 text-blue-800' },
      'Maintenance': { className: 'bg-orange-100 text-orange-800' },
      'Storage': { className: 'bg-gray-100 text-gray-800' },
      'Service': { className: 'bg-green-100 text-green-800' }
    }
    const config = variants[position as keyof typeof variants] || { className: '' }
    return (
      <Badge variant="outline" className={config.className}>
        {position}
      </Badge>
    )
  }

  const analytics = {
    total: mockData.length,
    occupied: mockData.filter(s => s.status === 'Occupied').length,
    available: mockData.filter(s => s.status === 'Available').length,
    reserved: mockData.filter(s => s.status === 'Reserved').length,
    maintenance: mockData.filter(s => s.status === 'Maintenance').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stabling Geometry</h2>
        <p className="text-gray-600 dark:text-gray-300">Monitor train bay allocation and stabling positions</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Bays</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Occupied</p>
                <p className="text-2xl font-bold text-red-600">{analytics.occupied}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Available</p>
                <p className="text-2xl font-bold text-green-600">{analytics.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Reserved</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.reserved}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
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
                placeholder="Search by Train ID, Bay, or Stabling ID..."
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
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Platform Side">Platform Side</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Storage">Storage</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bayFilter} onValueChange={setBayFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Bay" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bays</SelectItem>
                <SelectItem value="A">Bay A</SelectItem>
                <SelectItem value="B">Bay B</SelectItem>
                <SelectItem value="C">Bay C</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stabling Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bay Allocation Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stabling ID</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Bay</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Occupied Since</TableHead>
                  <TableHead>Departure Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration (hrs)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((stabling) => (
                  <TableRow key={stabling.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{stabling.id}</TableCell>
                    <TableCell>{stabling.trainId}</TableCell>
                    <TableCell className="font-medium">{stabling.bay}</TableCell>
                    <TableCell>{getPositionBadge(stabling.position)}</TableCell>
                    <TableCell>{stabling.occupiedSince}</TableCell>
                    <TableCell>{stabling.departureTime}</TableCell>
                    <TableCell>{getStatusBadge(stabling.status)}</TableCell>
                    <TableCell>{stabling.duration.toFixed(1)}</TableCell>
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
