"use client"

import { useState } from "react"
import { Settings, Shield, Download, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    showPirateLinks: false,
    requireApproval: true,
    enableUserReports: true,
    enableAnalytics: true,
    defaultLanguage: 'en',
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'epub', 'mp4', 'zip']
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const exportVerifiedResources = () => {
    // Mock CSV data
    const csvData = `Title,URL,Category,Description,Tags,Language,Verified,Legal Status,Added By,Clicks,Created At
Advanced Machine Learning with Python,https://example.com/ml-course,AI/ML,Comprehensive guide to ML algorithms and implementations,python,machine-learning,deep-learning,English,true,official,admin,1250,2024-01-15
Digital Electronics Fundamentals,https://example.com/electronics,Electronics,Learn the basics of digital circuits and logic design,digital-electronics,circuits,microprocessors,English,true,official,admin,890,2024-01-14
Research Methodology Handbook,https://example.com/research,Research,Essential guide for academic research and paper writing,research,academic-writing,publication,English,false,user-submitted,user123,2100,2024-01-13`

    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'verified-resources.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure platform-wide settings and policies
        </p>
      </div>

      <div className="space-y-8">
        {/* Content Policy Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Content Policy</CardTitle>
            </div>
            <CardDescription>
              Manage content visibility and legal compliance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pirate-links">Show Pirate Links</Label>
                <p className="text-sm text-muted-foreground">
                  Display resources flagged as potentially infringing copyright
                </p>
              </div>
              <Switch
                id="pirate-links"
                checked={settings.showPirateLinks}
                onCheckedChange={(checked) => handleSettingChange('showPirateLinks', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="require-approval">Require Admin Approval</Label>
                <p className="text-sm text-muted-foreground">
                  New resources must be approved by administrators before appearing publicly
                </p>
              </div>
              <Switch
                id="require-approval"
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="user-reports">Enable User Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to report problematic or inappropriate resources
                </p>
              </div>
              <Switch
                id="user-reports"
                checked={settings.enableUserReports}
                onCheckedChange={(checked) => handleSettingChange('enableUserReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Analytics Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Analytics & Tracking</CardTitle>
            </div>
            <CardDescription>
              Configure data collection and analytics features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-analytics">Enable Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Collect usage statistics and resource popularity data
                </p>
              </div>
              <Switch
                id="enable-analytics"
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => handleSettingChange('enableAnalytics', checked)}
              />
            </div>
            
            <Alert>
              <AlertDescription>
                Analytics data helps improve the platform by showing which resources are most valuable to users. 
                This data is collected anonymously and used for platform optimization only.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-primary" />
              <CardTitle>Data Export</CardTitle>
            </div>
            <CardDescription>
              Export platform data for backup or analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Export Verified Resources</h4>
                <p className="text-sm text-muted-foreground">
                  Download a CSV file of all verified resources
                </p>
              </div>
              <Button onClick={exportVerifiedResources}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Export Options</h4>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Include resource metadata</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Include usage statistics</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Include user data (anonymized)</span>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Information */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Information</CardTitle>
            <CardDescription>
              System details and version information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">System Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Version:</span>
                    <span>1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database:</span>
                    <span className="text-green-600">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cache:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Search Index:</span>
                    <span className="text-green-600">Updated</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Current Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Show Pirate Links:</span>
                    <span>{settings.showPirateLinks ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Require Approval:</span>
                    <span>{settings.requireApproval ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User Reports:</span>
                    <span>{settings.enableUserReports ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Analytics:</span>
                    <span>{settings.enableAnalytics ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}