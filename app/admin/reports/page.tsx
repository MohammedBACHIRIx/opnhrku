"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock, User, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Report {
  id: string
  resourceId: string
  resourceTitle: string
  resourceUrl: string
  reason: string
  reportedBy: string
  status: 'open' | 'resolved' | 'dismissed'
  createdAt: string
  resolvedAt?: string
  resolutionNotes?: string
}

// Mock data - in production this would come from your API
const mockReports: Report[] = [
  {
    id: "1",
    resourceId: "4",
    resourceTitle: "Web Development Tools Masterclass",
    resourceUrl: "https://torrent-site.com/tools",
    reason: "This appears to be a pirated course from a torrent site. The content is copyrighted material being distributed illegally.",
    reportedBy: "concerned_user",
    status: "open",
    createdAt: "2024-01-16T10:30:00Z"
  },
  {
    id: "2",
    resourceId: "3",
    resourceTitle: "Research Methodology Handbook",
    reason: "The link is broken and leads to a scam website with malware warnings.",
    reportedBy: "researcher123",
    status: "open",
    createdAt: "2024-01-15T14:20:00Z"
  },
  {
    id: "3",
    resourceId: "2",
    resourceTitle: "Digital Electronics Fundamentals",
    reason: "The resource description is misleading. This is actually a paid course, not free content.",
    reportedBy: "student_user",
    status: "resolved",
    createdAt: "2024-01-14T09:15:00Z",
    resolvedAt: "2024-01-15T11:00:00Z",
    resolutionNotes: "Updated description to clarify this is a paid course. Added proper categorization."
  },
  {
    id: "4",
    resourceId: "1",
    resourceTitle: "Advanced Machine Learning with Python",
    reason: "Excellent resource but the video quality is poor in some sections.",
    reportedBy: "ml_enthusiast",
    status: "dismissed",
    createdAt: "2024-01-13T16:45:00Z",
    resolvedAt: "2024-01-14T10:30:00Z",
    resolutionNotes: "Quality issues are not grounds for removal. Resource remains available."
  }
]

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showResolveDialog, setShowResolveDialog] = useState(false)
  const [resolutionNotes, setResolutionNotes] = useState("")
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved' | 'dismissed'>('open')

  const filteredReports = reports.filter(report => 
    filterStatus === 'all' || report.status === filterStatus
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-yellow-100 text-yellow-800">Open</Badge>
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case 'dismissed':
        return <Badge className="bg-gray-100 text-gray-800">Dismissed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleResolveReport = (report: Report) => {
    setSelectedReport(report)
    setShowResolveDialog(true)
  }

  const handleMarkResolved = () => {
    if (selectedReport) {
      setReports(prev => prev.map(report => 
        report.id === selectedReport.id 
          ? { 
              ...report, 
              status: 'resolved' as const, 
              resolvedAt: new Date().toISOString(),
              resolutionNotes 
            }
          : report
      ))
      setShowResolveDialog(false)
      setResolutionNotes("")
      setSelectedReport(null)
    }
  }

  const handleDismissReport = () => {
    if (selectedReport) {
      setReports(prev => prev.map(report => 
        report.id === selectedReport.id 
          ? { 
              ...report, 
              status: 'dismissed' as const, 
              resolvedAt: new Date().toISOString(),
              resolutionNotes: resolutionNotes || "Report dismissed without action"
            }
          : report
      ))
      setShowResolveDialog(false)
      setResolutionNotes("")
      setSelectedReport(null)
    }
  }

  const stats = {
    total: reports.length,
    open: reports.filter(r => r.status === 'open').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    dismissed: reports.filter(r => r.status === 'dismissed').length
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reports Management</h1>
        <p className="text-muted-foreground">
          Review and manage user reports about resources
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.open}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dismissed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.dismissed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="text-sm text-muted-foreground">
                {filteredReports.length} reports found
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            User-submitted reports about resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="max-w-xs">
                    <div>
                      <div className="font-medium truncate">{report.resourceTitle}</div>
                      <div className="text-sm text-muted-foreground">
                        <a 
                          href={report.resourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {report.resourceUrl}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {report.reason}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{report.reportedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(report.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {report.status === 'open' && (
                      <Button
                        size="sm"
                        onClick={() => handleResolveReport(report)}
                      >
                        Review
                      </Button>
                    )}
                    {report.status === 'resolved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolveReport(report)}
                      >
                        View Resolution
                      </Button>
                    )}
                    {report.status === 'dismissed' && (
                      <span className="text-sm text-muted-foreground">Dismissed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resolve Report Dialog */}
      {selectedReport && (
        <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Report</DialogTitle>
              <DialogDescription>
                Review the report and take appropriate action
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Resource</h4>
                <Card>
                  <CardContent className="pt-4">
                    <div className="font-medium">{selectedReport.resourceTitle}</div>
                    <a 
                      href={selectedReport.resourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {selectedReport.resourceUrl}
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Report Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reported by:</span>
                    <span>{selectedReport.reportedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(selectedReport.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    {getStatusBadge(selectedReport.status)}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Reason for Report</h4>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm">{selectedReport.reason}</p>
                  </CardContent>
                </Card>
              </div>
              
              {selectedReport.status !== 'open' && selectedReport.resolutionNotes && (
                <div>
                  <h4 className="font-medium mb-2">Resolution Notes</h4>
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm">{selectedReport.resolutionNotes}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {selectedReport.status === 'open' && (
                <div>
                  <Label htmlFor="resolution-notes">Resolution Notes</Label>
                  <Textarea
                    id="resolution-notes"
                    placeholder="Describe the action taken or reason for dismissal..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResolveDialog(false)}>
                Cancel
              </Button>
              {selectedReport.status === 'open' && (
                <>
                  <Button 
                    variant="destructive" 
                    onClick={handleDismissReport}
                    disabled={!resolutionNotes.trim()}
                  >
                    Dismiss Report
                  </Button>
                  <Button 
                    onClick={handleMarkResolved}
                    disabled={!resolutionNotes.trim()}
                  >
                    Mark as Resolved
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}