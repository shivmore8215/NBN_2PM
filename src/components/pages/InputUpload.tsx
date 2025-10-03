import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download, Trash2, RefreshCw, Eye, X, Plus } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'

interface UploadFile {
  id: string
  name: string
  type: 'CSV' | 'Excel' | 'JSON' | 'PDF'
  size: string
  status: 'Uploading' | 'Processing' | 'Completed' | 'Failed'
  progress: number
  uploadedAt: string
  records?: number
  errors?: number
}

const mockFiles: UploadFile[] = [
  {
    id: 'UF-001',
    name: 'trainset_master.csv',
    type: 'CSV',
    size: '2.4 MB',
    status: 'Completed',
    progress: 100,
    uploadedAt: '2024-02-01 10:30',
    records: 180,
    errors: 0
  },
  {
    id: 'UF-002',
    name: 'fitness_certificates.xlsx',
    type: 'Excel',
    size: '1.8 MB',
    status: 'Processing',
    progress: 75,
    uploadedAt: '2024-02-01 11:15',
    records: 0,
    errors: 0
  },
  {
    id: 'UF-003',
    name: 'job_cards.json',
    type: 'JSON',
    size: '856 KB',
    status: 'Failed',
    progress: 0,
    uploadedAt: '2024-02-01 12:00',
    records: 0,
    errors: 5
  },
  {
    id: 'UF-004',
    name: 'branding_data.csv',
    type: 'CSV',
    size: '1.2 MB',
    status: 'Uploading',
    progress: 45,
    uploadedAt: '2024-02-01 12:30',
    records: 0,
    errors: 0
  }
]

export function InputUpload() {
  const { t } = useTranslation()
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>(mockFiles)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const newFile: UploadFile = {
        id: `UF-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() as any || 'CSV',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'Uploading',
        progress: 0,
        uploadedAt: new Date().toLocaleString()
      }
      setFiles(prev => [newFile, ...prev])
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'Uploading': { variant: 'standby' as const, icon: Upload, className: 'bg-yellow-100 text-yellow-800' },
      'Processing': { variant: 'standby' as const, icon: Clock, className: 'bg-blue-100 text-blue-800' },
      'Completed': { variant: 'ready' as const, icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      'Failed': { variant: 'critical' as const, icon: AlertCircle, className: 'bg-red-100 text-red-800' }
    }
    const config = variants[status as keyof typeof variants] || { variant: 'default' as const, icon: FileText, className: '' }
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
      'CSV': { className: 'bg-green-100 text-green-800' },
      'Excel': { className: 'bg-blue-100 text-blue-800' },
      'JSON': { className: 'bg-purple-100 text-purple-800' },
      'PDF': { className: 'bg-red-100 text-red-800' }
    }
    const config = variants[type as keyof typeof variants] || { className: '' }
    return (
      <Badge variant="outline" className={config.className}>
        {type}
      </Badge>
    )
  }

  const analytics = {
    total: files.length,
    completed: files.filter(f => f.status === 'Completed').length,
    processing: files.filter(f => f.status === 'Processing').length,
    failed: files.filter(f => f.status === 'Failed').length,
    totalRecords: files.reduce((sum, f) => sum + (f.records || 0), 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Input Upload</h2>
        <p className="text-gray-600 dark:text-gray-300">Upload and manage data files for the railway operations system</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Files</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Processing</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.processing}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Records</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.totalRecords.toLocaleString()}</p>
              </div>
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Supports CSV, Excel, JSON, and PDF files up to 10MB
            </p>
            <Button className="mb-2">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
            <p className="text-sm text-gray-500">
              Maximum file size: 10MB per file
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Uploaded At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{getTypeBadge(file.type)}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{getStatusBadge(file.status)}</TableCell>
                    <TableCell>
                      <div className="w-24">
                        <Progress value={file.progress} className="h-2" />
                        <span className="text-xs text-gray-500">{file.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {file.records ? `${file.records.toLocaleString()}` : '-'}
                      {file.errors && file.errors > 0 && (
                        <span className="text-red-500 ml-1">({file.errors} errors)</span>
                      )}
                    </TableCell>
                    <TableCell>{file.uploadedAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {file.status === 'Completed' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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
