"use client"

import { useState } from "react"
import { 
  Database, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Activity,
  Settings
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Stats {
  totalResources: number
  verifiedResources: number
  pendingReports: number
  totalUsers: number
  recentActivity: Activity[]
}

interface Activity {
  id: string
  action: string
  user: string
  timestamp: string
  type: 'resource' | 'report' | 'user'
}

// Mock data - in production this would come from your API
const mockStats: Stats = {
  totalResources: 1234,
  verifiedResources: 856,
  pendingReports: 23,
  totalUsers: 567,
  recentActivity: [
    {
      id: "1",
      action: "Added new resource",
      user: "admin",
      timestamp: "2 minutes ago",
      type: "resource"
    },
    {
      id: "2",
      action: "Report resolved",
      user: "moderator",
      timestamp: "5 minutes ago",
      type: "report"
    },
    {
      id: "3",
      action: "New user registered",
      user: "john_doe",
      timestamp: "10 minutes ago",
      type: "user"
    },
    {
      id: "4",
      action: "Resource verified",
      user: "admin",
      timestamp: "15 minutes ago",
      type: "resource"
    }
  ]
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'resource':
      return Database
    case 'report':
      return AlertTriangle
    case 'user':
      return Users
    default:
      return Activity
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'resource':
      return 'text-blue-600'
    case 'report':
      return 'text-yellow-600'
    case 'user':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}

export default function AdminDashboard() {
  const [stats] = useState<Stats>(mockStats)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your OpenKnowledge Hub platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResources.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Resources</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verifiedResources.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.verifiedResources / stats.totalResources) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => {
                const IconComponent = getActivityIcon(activity.type)
                const iconColor = getActivityColor(activity.type)
                
                return (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <IconComponent className={`h-4 w-4 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/import">
                  <Database className="mr-2 h-4 w-4" />
                  Import Resources
                </a>
              </Button>
              
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/resources">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Resources
                </a>
              </Button>
              
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/reports">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Review Reports
                </a>
              </Button>
              
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Platform Settings
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}