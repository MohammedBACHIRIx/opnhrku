"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Eye, 
  Tag, 
  Flag,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Resource {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags?: string
  notes?: string
  language?: string
  legalStatus: string
  verified: boolean
  clicks: number
  createdAt: string
  addedBy: string
}

// Mock resource data - in production this would come from your API
const mockResource: Resource = {
  id: "1",
  title: "Advanced Machine Learning with Python",
  description: "A comprehensive guide to machine learning algorithms and their implementation in Python. This resource covers everything from basic supervised learning to advanced deep learning techniques, with hands-on projects and real-world applications.",
  url: "https://example.com/ml-course",
  category: "AI/ML",
  tags: "python,machine-learning,deep-learning,data-science",
  notes: '{"en": "This is an excellent resource for beginners and intermediate learners. The course structure is well-organized and the examples are practical.", "ar": "هذا مورد ممتاز للمبتدئين والمتعلمين المتوسطين. بنية الدورة منظمة جيدًا والأمثلة عملية.", "fr": "C\'est une excellente ressource pour les débutants et les apprenants intermédiaires. La structure du cours est bien organisée et les exemples sont pratiques."}',
  language: "English",
  legalStatus: "official",
  verified: true,
  clicks: 1250,
  createdAt: "2024-01-15",
  addedBy: "admin"
}

export default function ResourceDetailPage() {
  const params = useParams()
  const [resource, setResource] = useState<Resource>(mockResource)
  const [isNotesOpen, setIsNotesOpen] = useState<{[key: string]: boolean}>({})
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState("")

  // Parse multilingual notes
  const parseNotes = (notesString: string) => {
    try {
      return JSON.parse(notesString)
    } catch {
      return { en: notesString }
    }
  }

  const notes = resource.notes ? parseNotes(resource.notes) : {}
  const noteLanguages = Object.keys(notes)

  const handleOpenLink = async () => {
    // In production, this would make an API call to increment clicks
    console.log(`Opening ${resource.url} and incrementing click count`)
    
    // Simulate click tracking
    setResource(prev => ({ ...prev, clicks: prev.clicks + 1 }))
    
    // Open the link in a new tab
    window.open(resource.url, '_blank')
  }

  const handleReport = () => {
    // In production, this would make an API call to create a report
    console.log(`Reporting resource ${resource.id} with reason: ${reportReason}`)
    setShowReportDialog(false)
    setReportReason("")
    // Show success message
    alert("Report submitted successfully!")
  }

  const getLegalStatusColor = (status: string) => {
    switch (status) {
      case 'official':
        return 'text-green-600'
      case 'mirror':
        return 'text-blue-600'
      case 'user-submitted':
        return 'text-yellow-600'
      case 'pirate':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/browse" className="hover:text-primary">Browse</Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{resource.title}</li>
          </ol>
        </nav>

        {/* Resource Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {resource.clicks} views
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(resource.createdAt).toLocaleDateString()}
                </span>
                <span className={`font-medium ${getLegalStatusColor(resource.legalStatus)}`}>
                  {resource.legalStatus}
                </span>
              </div>
            </div>
            {resource.verified && (
              <Badge variant="default" className="ml-4">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button size="lg" onClick={handleOpenLink}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Link
            </Button>
            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Resource</DialogTitle>
                  <DialogDescription>
                    Help us maintain quality by reporting problematic resources.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reason">Reason for reporting</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please describe the issue with this resource..."
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReport} disabled={!reportReason.trim()}>
                    Submit Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Legal Status Alert */}
          {resource.legalStatus === 'pirate' && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This resource has been flagged as potentially infringing copyright. 
                Use at your own discretion and consider supporting official sources.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {resource.description}
                </p>
              </CardContent>
            </Card>

            {/* Tags */}
            {resource.tags && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.split(',').map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Multilingual Notes */}
            {noteLanguages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>
                    Community-provided notes in multiple languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {noteLanguages.map((lang) => (
                      <AccordionItem key={lang} value={lang}>
                        <AccordionTrigger>
                          <span className="font-medium">
                            {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : lang}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {notes[lang]}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resource Info */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{resource.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{resource.language || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Added by:</span>
                  <span className="font-medium">{resource.addedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views:</span>
                  <span className="font-medium">{resource.clicks.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Legal Status */}
            <Card>
              <CardHeader>
                <CardTitle>Legal Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`font-medium ${getLegalStatusColor(resource.legalStatus)}`}>
                  {resource.legalStatus}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {resource.legalStatus === 'official' && 'This is an official resource from the original publisher.'}
                  {resource.legalStatus === 'mirror' && 'This is a mirror of an official resource.'}
                  {resource.legalStatus === 'user-submitted' && 'This resource was submitted by a community member.'}
                  {resource.legalStatus === 'pirate' && 'This resource has been flagged as potentially infringing copyright.'}
                </p>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Related Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="#" className="block p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="font-medium text-sm">Machine Learning Basics</div>
                    <div className="text-xs text-muted-foreground">Introduction to ML concepts</div>
                  </Link>
                  <Link href="#" className="block p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="font-medium text-sm">Python for Data Science</div>
                    <div className="text-xs text-muted-foreground">Learn Python for data analysis</div>
                  </Link>
                  <Link href="#" className="block p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="font-medium text-sm">Deep Learning Fundamentals</div>
                    <div className="text-xs text-muted-foreground">Neural networks and beyond</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}