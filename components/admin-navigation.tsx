"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Upload, 
  Database, 
  AlertTriangle, 
  Settings, 
  Home, 
  FileText,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Bulk Import", href: "/admin/import", icon: Upload },
  { name: "Resources", href: "/admin/resources", icon: Database },
  { name: "Reports", href: "/admin/reports", icon: AlertTriangle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminNavigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold">Admin Dashboard</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}