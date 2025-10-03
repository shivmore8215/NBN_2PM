import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { DashboardOverview } from "./DashboardOverview"
import { QuickActions } from "./QuickActions"
import { SystemMetrics } from "./SystemMetrics"
import { TrainCard } from "./TrainCard"
import { SchedulingPanel } from "./SchedulingPanel"
import { AISchedulingPanel } from "./AISchedulingPanel"
import { ReportsPanel } from "./ReportsPanel"
import { FitnessCertificates } from "./pages/FitnessCertificates"
import { JobCardStatus } from "./pages/JobCardStatus"
import { BrandingPriorities } from "./pages/BrandingPriorities"
import { MileageBalancing } from "./pages/MileageBalancing"
import { CleaningDetailing } from "./pages/CleaningDetailing"
import { StablingGeometry } from "./pages/StablingGeometry"
import { InputUpload } from "./pages/InputUpload"
import { DataPrediction } from "./pages/DataPrediction"
import { MLAnalysis } from "./pages/MLAnalysis"
import { Simulation } from "./pages/Simulation"
import { FloatingActionButton } from "./FloatingActionButton"
import { BackgroundEffects } from "./BackgroundEffects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SettingsPanel } from "./SettingsPanel-simple"
import { useTrainsets, useRealtimeMetrics, useDailySchedule, useKPIs } from "@/hooks/useTrainData"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from 'react-i18next'

export function NewDashboard() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('manual')
  const { toast } = useToast()

  // Data hooks
  const { data: trainsets = [], refetch: refetchTrainsets } = useTrainsets()
  const { data: metrics, isLoading: metricsLoading, refetch: refetchMetrics } = useRealtimeMetrics()
  const { data: scheduleData = [], refetch: refetchSchedule } = useDailySchedule(new Date().toISOString().split('T')[0])
  const { data: kpiData = [], refetch: refetchKPIs } = useKPIs()

  const readyTrainsets = trainsets.filter(t => t.status === 'ready')
  const standbyTrainsets = trainsets.filter(t => t.status === 'standby')
  const maintenanceTrainsets = trainsets.filter(t => t.status === 'maintenance')
  const criticalTrainsets = trainsets.filter(t => t.status === 'critical')

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    toast({
      title: "Navigation",
      description: `Switched to ${section} section`,
    })
  }

  const handleActionClick = (action: string) => {
    toast({
      title: "Quick Action",
      description: `Opening ${action} module`,
    })
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(true)
  }

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Dashboard Overview */}
            <DashboardOverview metrics={metrics} />

            {/* System Metrics */}
            <SystemMetrics metrics={metrics} isLoading={metricsLoading} />

            {/* Fleet Status Overview */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-xl dark:shadow-black/10">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b dark:border-gray-600">
                <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                  {t('dashboard.overview')}
                  <div className="flex space-x-2">
                    <Badge variant="ready" className="shadow-sm">{readyTrainsets.length} {t('status.ready')}</Badge>
                    <Badge variant="standby" className="shadow-sm">{standbyTrainsets.length} {t('status.standby')}</Badge>
                    <Badge variant="maintenance" className="shadow-sm">{maintenanceTrainsets.length} {t('status.maintenance')}</Badge>
                    <Badge variant="critical" className="shadow-sm">{criticalTrainsets.length} {t('status.critical')}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {trainsets.map((trainset) => (
                    <TrainCard key={trainset.id} trainset={trainset} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <QuickActions onActionClick={handleActionClick} />

            {/* Main Panels */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="manual">{t('scheduling.manualScheduling')}</TabsTrigger>
                <TabsTrigger value="ai">{t('scheduling.aiScheduling')}</TabsTrigger>
                <TabsTrigger value="reports">{t('reports.title')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual">
                <SchedulingPanel trainsets={trainsets} />
              </TabsContent>
              
              <TabsContent value="ai">
                <AISchedulingPanel trainsets={trainsets} />
              </TabsContent>
              
              <TabsContent value="reports">
                <ReportsPanel 
                  trainsets={trainsets}
                  scheduleData={scheduleData}
                  kpiData={Array.isArray(kpiData) ? kpiData : [kpiData]}
                />
              </TabsContent>
            </Tabs>
          </div>
        )
      
      case 'upload':
        return <InputUpload />
      
      case 'prediction':
        return <DataPrediction />
      
      case 'analysis':
        return <MLAnalysis />
      
      case 'simulation':
        return <Simulation />
      
      case 'audit':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Train Audit</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {trainsets.map((trainset) => (
                    <TrainCard key={trainset.id} trainset={trainset} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'fitness':
        return <FitnessCertificates />
      
      case 'jobcard':
        return <JobCardStatus />
      
      case 'branding':
        return <BrandingPriorities />
      
      case 'mileage':
        return <MileageBalancing />
      
      case 'cleaning':
        return <CleaningDetailing />
      
      case 'stabling':
        return <StablingGeometry />
      
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            <DashboardOverview metrics={metrics} />
            <QuickActions onActionClick={handleActionClick} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <BackgroundEffects />
      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header 
            onSettingsClick={handleSettingsClick}
            onLogout={handleLogout}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <SettingsPanel />
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}
