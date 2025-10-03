import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Megaphone, TrendingUp, DollarSign, Calendar, Filter, Plus, Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface BrandingCampaign {
  id: string
  campaignName: string
  trainId: string
  status: 'Active' | 'Expired' | 'Scheduled' | 'Paused'
  expiryDate: string
  revenue: number
  startDate: string
  priority: 'High' | 'Medium' | 'Low'
  description: string
}

const mockData: BrandingCampaign[] = [
  {
    id: 'BC-001',
    campaignName: 'Metro Express',
    trainId: 'TR-4521',
    status: 'Active',
    expiryDate: '2024-06-15',
    revenue: 15000,
    startDate: '2024-01-01',
    priority: 'High',
    description: 'Premium branding campaign for express routes'
  },
  {
    id: 'BC-002',
    campaignName: 'City Connect',
    trainId: 'TR-4522',
    status: 'Active',
    expiryDate: '2024-04-20',
    revenue: 12000,
    startDate: '2024-01-15',
    priority: 'Medium',
    description: 'Urban connectivity branding initiative'
  },
  {
    id: 'BC-003',
    campaignName: 'Green Metro',
    trainId: 'TR-4523',
    status: 'Expired',
    expiryDate: '2024-01-10',
    revenue: 8000,
    startDate: '2023-10-01',
    priority: 'Low',
    description: 'Environmental sustainability campaign'
  },
  {
    id: 'BC-004',
    campaignName: 'Tech Hub',
    trainId: 'TR-4524',
    status: 'Scheduled',
    expiryDate: '2024-08-30',
    revenue: 0,
    startDate: '2024-03-01',
    priority: 'High',
    description: 'Technology innovation branding'
  },
  {
    id: 'BC-005',
    campaignName: 'Heritage Line',
    trainId: 'TR-4525',
    status: 'Paused',
    expiryDate: '2024-05-15',
    revenue: 5000,
    startDate: '2023-12-01',
    priority: 'Medium',
    description: 'Cultural heritage promotion campaign'
  }
]

export function BrandingPriorities() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const filteredData = mockData.filter(campaign => {
    const matchesSearch = campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || campaign.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' },
      'Expired': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' },
      'Scheduled': { variant: 'standby' as const, className: 'bg-blue-100 text-blue-800' },
      'Paused': { variant: 'maintenance' as const, className: 'bg-yellow-100 text-yellow-800' }
    }
    const config = variants[status as keyof typeof variants] || { variant: 'default' as const, className: '' }
    return (
      <Badge variant={config.variant} className={config.className}>
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
    active: mockData.filter(c => c.status === 'Active').length,
    expired: mockData.filter(c => c.status === 'Expired').length,
    scheduled: mockData.filter(c => c.status === 'Scheduled').length,
    totalRevenue: mockData.reduce((sum, c) => sum + c.revenue, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Branding Priorities</h2>
        <p className="text-gray-600 dark:text-gray-300">Manage advertising campaigns and branding initiatives across the fleet</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <Megaphone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active</p>
                <p className="text-2xl font-bold text-green-600">{analytics.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${analytics.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
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
                placeholder="Search by Campaign Name, Train ID, or Campaign ID..."
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
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
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign ID</TableHead>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{campaign.id}</TableCell>
                    <TableCell className="font-medium">{campaign.campaignName}</TableCell>
                    <TableCell>{campaign.trainId}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>{getPriorityBadge(campaign.priority)}</TableCell>
                    <TableCell className="font-medium">${campaign.revenue.toLocaleString()}</TableCell>
                    <TableCell>{campaign.expiryDate}</TableCell>
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
