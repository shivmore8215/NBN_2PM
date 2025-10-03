import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Wrench, Search, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

interface ActionCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  onClick?: () => void
}

function ActionCard({ title, description, icon: Icon, onClick }: ActionCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Card 
      className={`
        bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm 
        hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isHovered ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`
            p-4 rounded-xl transition-all duration-300
            ${isHovered ? 'bg-blue-100 dark:bg-blue-900/40 scale-110' : 'bg-blue-50 dark:bg-blue-900/20'}
          `}>
            <Icon className={`h-7 w-7 text-blue-600 dark:text-blue-400 transition-all duration-300 ${
              isHovered ? 'animate-pulse' : ''
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </div>
        {/* Animated border effect */}
        <div className={`
          absolute inset-0 rounded-lg border-2 border-transparent
          ${isHovered ? 'border-blue-500 opacity-20' : ''}
          transition-all duration-300
        `} />
      </CardContent>
    </Card>
  )
}

interface QuickActionsProps {
  onActionClick?: (action: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const actions = [
    {
      id: 'prediction',
      title: 'Data Prediction',
      description: 'View operational analytics',
      icon: TrendingUp
    },
    {
      id: 'maintenance',
      title: 'Maintenance Hub',
      description: 'Job cards and fitness tracking',
      icon: Wrench
    },
    {
      id: 'audit',
      title: 'Train Audit',
      description: 'Detailed train profiles',
      icon: Search
    },
    {
      id: 'stabling',
      title: 'Stabling Status',
      description: 'Bay allocation overview',
      icon: MapPin
    }
  ]

  return (
    <div className="space-y-8">
      {/* Title with animation */}
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quick Actions</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Navigate to key operational areas</p>
      </div>

      {/* Action Cards with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <div 
            key={action.id}
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <ActionCard
              title={action.title}
              description={action.description}
              icon={action.icon}
              onClick={() => onActionClick?.(action.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
