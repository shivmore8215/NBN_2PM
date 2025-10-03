import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, AlertTriangle, CheckCircle, Clock, Filter, Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

interface FitnessCertificate {
  id: string
  trainId: string
  status: 'Valid' | 'Expired' | 'Due Soon' | 'Pending'
  expiryDate: string
  certificateType: 'Annual' | 'Monthly' | 'Quarterly'
  riskLevel: 'Low' | 'Medium' | 'High'
  issuedDate: string
  issuedBy: string
}

const mockData: FitnessCertificate[] = [
  {
    id: 'FC-001',
    trainId: 'TR-4521',
    status: 'Valid',
    expiryDate: '2024-03-15',
    certificateType: 'Annual',
    riskLevel: 'Low',
    issuedDate: '2023-03-15',
    issuedBy: 'Safety Inspector A'
  },
  {
    id: 'FC-002',
    trainId: 'TR-4522',
    status: 'Due Soon',
    expiryDate: '2024-02-28',
    certificateType: 'Quarterly',
    riskLevel: 'Medium',
    issuedDate: '2023-11-28',
    issuedBy: 'Safety Inspector B'
  },
  {
    id: 'FC-003',
    trainId: 'TR-4523',
    status: 'Expired',
    expiryDate: '2024-01-15',
    certificateType: 'Monthly',
    riskLevel: 'High',
    issuedDate: '2023-12-15',
    issuedBy: 'Safety Inspector C'
  },
  {
    id: 'FC-004',
    trainId: 'TR-4524',
    status: 'Valid',
    expiryDate: '2024-06-20',
    certificateType: 'Annual',
    riskLevel: 'Low',
    issuedDate: '2023-06-20',
    issuedBy: 'Safety Inspector A'
  },
  {
    id: 'FC-005',
    trainId: 'TR-4525',
    status: 'Pending',
    expiryDate: '2024-03-01',
    certificateType: 'Quarterly',
    riskLevel: 'Medium',
    issuedDate: '2023-12-01',
    issuedBy: 'Safety Inspector B'
  }
]

export function FitnessCertificates() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredData = mockData.filter(cert => {
    const matchesSearch = cert.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
    const matchesType = typeFilter === 'all' || cert.certificateType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'Valid': { variant: 'ready' as const, icon: CheckCircle },
      'Expired': { variant: 'critical' as const, icon: AlertTriangle },
      'Due Soon': { variant: 'standby' as const, icon: Clock },
      'Pending': { variant: 'maintenance' as const, icon: Clock }
    }
    const config = variants[status as keyof typeof variants] || { variant: 'default' as const, icon: FileText }
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getRiskBadge = (risk: string) => {
    const variants = {
      'Low': { variant: 'ready' as const, className: 'bg-green-100 text-green-800' },
      'Medium': { variant: 'standby' as const, className: 'bg-yellow-100 text-yellow-800' },
      'High': { variant: 'critical' as const, className: 'bg-red-100 text-red-800' }
    }
    const config = variants[risk as keyof typeof variants] || { variant: 'default' as const, className: '' }
    return (
      <Badge variant={config.variant} className={config.className}>
        {risk}
      </Badge>
    )
  }

  const analytics = {
    total: mockData.length,
    valid: mockData.filter(c => c.status === 'Valid').length,
    expired: mockData.filter(c => c.status === 'Expired').length,
    dueSoon: mockData.filter(c => c.status === 'Due Soon').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fitness Certificates</h2>
        <p className="text-gray-600 dark:text-gray-300">Manage and track train fitness certificates and compliance</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Valid</p>
                <p className="text-2xl font-bold text-green-600">{analytics.valid}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Expired</p>
                <p className="text-2xl font-bold text-red-600">{analytics.expired}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.dueSoon}</p>
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
                placeholder="Search by Train ID or Certificate ID..."
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
                <SelectItem value="Valid">Valid</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Due Soon">Due Soon</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Annual">Annual</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Issued By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((cert) => (
                  <TableRow key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{cert.id}</TableCell>
                    <TableCell>{cert.trainId}</TableCell>
                    <TableCell>{getStatusBadge(cert.status)}</TableCell>
                    <TableCell>{cert.certificateType}</TableCell>
                    <TableCell>{cert.expiryDate}</TableCell>
                    <TableCell>{getRiskBadge(cert.riskLevel)}</TableCell>
                    <TableCell>{cert.issuedBy}</TableCell>
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
