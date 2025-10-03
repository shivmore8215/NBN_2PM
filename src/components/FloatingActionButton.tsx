import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, X, BarChart3, Settings, Download, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const actions = [
    {
      icon: BarChart3,
      label: 'Generate Report',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => {
        toast({
          title: "Report Generation",
          description: "Generating comprehensive operational report...",
        })
      }
    },
    {
      icon: Download,
      label: 'Export Data',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => {
        toast({
          title: "Data Export",
          description: "Preparing data for export...",
        })
      }
    },
    {
      icon: RefreshCw,
      label: 'Refresh All',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => {
        toast({
          title: "System Refresh",
          description: "Refreshing all system data...",
        })
      }
    },
    {
      icon: Settings,
      label: 'Quick Settings',
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => {
        toast({
          title: "Quick Settings",
          description: "Opening system settings...",
        })
      }
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className={`transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Button
              onClick={action.onClick}
              className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-12 h-12 rounded-full`}
              title={action.label}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-14 h-14 rounded-full"
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300 rotate-180" />
        ) : (
          <Plus className="h-6 w-6 transition-transform duration-300" />
        )}
      </Button>
    </div>
  )
}
