import { Card, CardContent } from "@/components/ui/card"
import { Train, Wrench, Clock, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  bgColor: string
}

function MetricCard({ title, value, subtitle, icon: Icon, iconColor, bgColor }: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    // Animate the value
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''))
    if (!isNaN(numericValue)) {
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setAnimatedValue(numericValue)
          clearInterval(timer)
        } else {
          setAnimatedValue(current)
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [value])

  const displayValue = isNaN(parseFloat(value.replace(/[^\d.]/g, ''))) 
    ? value 
    : `${Math.round(animatedValue)}${value.includes('%') ? '%' : ''}`

  return (
    <Card className={`
      bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm
      hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out
      ${isVisible ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'}
    `}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1 transition-all duration-500">
              {displayValue}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
          <div className={`p-4 rounded-xl ${bgColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
            <Icon className={`h-8 w-8 ${iconColor} animate-pulse`} />
          </div>
        </div>
        {/* Progress indicator */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-2000 ease-out ${
              iconColor.includes('green') ? 'bg-green-500' : 
              iconColor.includes('orange') ? 'bg-orange-500' : 
              iconColor.includes('blue') ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            style={{ 
              width: isNaN(parseFloat(value.replace(/[^\d.]/g, ''))) ? '100%' : 
              `${Math.min((animatedValue / parseFloat(value.replace(/[^\d.]/g, ''))) * 100, 100)}%` 
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardOverviewProps {
  metrics?: {
    trainsReady?: number
    totalTrains?: number
    maintenanceAlerts?: number
    adDeadlines?: number
    systemHealth?: number
    fleet_status?: {
      ready?: number
      standby?: number
      maintenance?: number
      critical?: number
    }
  }
}

export function DashboardOverview({ metrics }: DashboardOverviewProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const defaultMetrics = {
    trainsReady: 147,
    totalTrains: 180,
    maintenanceAlerts: 8,
    adDeadlines: 3,
    systemHealth: 98.2,
    ...metrics
  }

  // Use real data if available, otherwise fall back to defaults
  const trainsReady = metrics?.fleet_status?.ready || defaultMetrics.trainsReady
  const totalTrains = (metrics?.fleet_status?.ready || 0) + (metrics?.fleet_status?.standby || 0) + (metrics?.fleet_status?.maintenance || 0) + (metrics?.fleet_status?.critical || 0) || defaultMetrics.totalTrains
  const maintenanceAlerts = metrics?.fleet_status?.maintenance || defaultMetrics.maintenanceAlerts
  const systemHealth = defaultMetrics.systemHealth // This would come from system metrics

  return (
    <div className="space-y-8">
      {/* Title with animation */}
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Railway operations management at a glance
        </p>
      </div>

      {/* Metric Cards with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MetricCard
            title="Trains Ready"
            value={trainsReady.toString()}
            subtitle={`out of ${totalTrains}`}
            icon={Train}
            iconColor="text-green-600"
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
        </div>
        
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MetricCard
            title="Maintenance Alerts"
            value={maintenanceAlerts.toString()}
            subtitle="Active"
            icon={Wrench}
            iconColor="text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-900/20"
          />
        </div>
        
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MetricCard
            title="Ad Deadlines"
            value={defaultMetrics.adDeadlines.toString()}
            subtitle="This Week"
            icon={Clock}
            iconColor="text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-900/20"
          />
        </div>
        
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MetricCard
            title="System Health"
            value={`${systemHealth}%`}
            subtitle="Uptime"
            icon={CheckCircle}
            iconColor="text-green-600"
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
        </div>
      </div>
    </div>
  )
}
