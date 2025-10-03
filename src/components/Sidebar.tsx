import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutGrid, 
  Upload, 
  TrendingUp, 
  Pyramid, 
  Settings, 
  Search,
  CheckCircle,
  Wrench,
  Megaphone,
  ChevronDown
} from "lucide-react"
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

interface SidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function Sidebar({ activeSection = 'dashboard', onSectionChange }: SidebarProps) {
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const mainNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'upload', label: 'Input Upload', icon: Upload },
    { id: 'prediction', label: 'Data Prediction', icon: TrendingUp },
    { id: 'analysis', label: 'ML Analysis', icon: Pyramid },
    { id: 'simulation', label: 'Simulation', icon: Settings },
    { id: 'audit', label: 'Train Audit', icon: Search },
  ]

  const dataModules = [
    { id: 'fitness', label: 'Fitness Certificates', icon: CheckCircle },
    { id: 'jobcard', label: 'Job-Card Status', icon: Wrench },
    { id: 'branding', label: 'Branding Priorities', icon: Megaphone },
    { id: 'mileage', label: 'Mileage Balancing', icon: TrendingUp },
    { id: 'cleaning', label: 'Cleaning & Detailing', icon: Settings },
    { id: 'stabling', label: 'Stabling Geometry', icon: Search },
  ]

  return (
    <div className={cn(
      "flex flex-col h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Kochi Metro Rail Ltd
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Operations System
                </p>
              </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="p-4">
          <div className="space-y-1">
            <h3 className={cn(
              "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3",
              isCollapsed && "hidden"
            )}>
              Main Navigation
            </h3>
            {mainNavigation.map((item, index) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-sm transition-all duration-300 hover:scale-105",
                  activeSection === item.id 
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                  isCollapsed && "px-2",
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => onSectionChange?.(item.id)}
              >
                <item.icon className={cn("h-4 w-4 transition-all duration-300", !isCollapsed && "mr-3", 
                  activeSection === item.id && "animate-pulse")} />
                {!isCollapsed && item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Data Modules */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            <h3 className={cn(
              "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3",
              isCollapsed && "hidden"
            )}>
              Data Modules
            </h3>
            {dataModules.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  isCollapsed && "px-2"
                )}
                onClick={() => onSectionChange?.(item.id)}
              >
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center"
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>
    </div>
  )
}
