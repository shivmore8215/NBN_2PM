import { Button } from "@/components/ui/button"
import { LanguageSelector } from "./LanguageSelector"
import { LiveIndicator } from "./LiveIndicator"
import { Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from 'react-i18next'

interface HeaderProps {
  onSettingsClick?: () => void
  onLogout?: () => void
}

export function Header({ onSettingsClick, onLogout }: HeaderProps) {
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onLogout?.()
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.jpg" 
              alt="Kochi Metro Rail Ltd Logo" 
              className="h-10 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Kochi Metro Rail Ltd
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Operations Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right side - User controls */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Welcome back, Operations Manager
          </span>
          
          <LiveIndicator />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-200"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <LanguageSelector />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
