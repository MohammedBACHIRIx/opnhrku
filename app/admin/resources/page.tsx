"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Eye,
  Clock,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Resource {
  id: string
  title: string
  url: string
  category: string
  description: string
  tags?: string
  verified: boolean
  legalStatus: string
  clicks: number
  createdAt: string
  addedBy: string
}

// Mock data - in production this would come from your API
const mockResources: Resource[] = [
  {
    id: "1",
    title: "Advanced Machine Learning with Python",
    url: "https://example.com/ml-course",
    category: "AI/ML",
    description: "Comprehensive guide to ML algorithms and implementations",
    tags: "python,machine-learning,deep-learning",
    verified: true,
    legalStatus: "official",
    clicks: 1250,
    createdAt: "2024-01-15",
    addedBy: "admin"
  },
  {
    id: "2",
    title: "Digital Electronics Fundamentals",
    url: "https://example.com/electronics",
    category: "Electronics",
    description: "Learn the basics of digital circuits and logic design",
    tags: "digital-electronics,circuits,microprocessors",
    verified: true,
    legalStatus: "official",
    clicks: 890,
    createdAt: "2024-01-14",
    addedBy: "admin"
  },
  {
    id: "3",
    title: "Research Methodology Handbook",
    url: "https://example.com/research",
    category: "Research",
    description: "Essential guide for academic research and paper writing",
    tags: "research,academic-writing,publication",
    verified: false,
    legalStatus: "user-submitted",
    clicks: 2100,
    createdAt: "2024-01-13",
    addedBy: "user123"
  },
  {
    id: "4",
    title: "Web Development Tools Masterclass",
    url: "https://torrent-site.com/tools",
    category: "Tools",
    description: "Modern development tools and best practices",
    tags: "web-development,tools,frameworks",
    verified: false,
    legalStatus: "pirate",
    clicks: 450,
    createdAt: "2024-01-12",
    addedBy: "user456"
  }
]

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showPirateOnly, setShowPirateOnly] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const categories = ["all", "Electronics", "AI/ML", "Research", "Courses", "Tools"]
  const legalStatuses = ["official", "mirror", "user-submitted", "pirate"]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesVerified = !showVerifiedOnly || resource.verified
    const matchesPirate = !showPirateOnly || resource.legalStatus === "pirate"
    
    return matchesSearch && matchesCategory && matchesVerified && matchesPirate
  })

  const handleToggleVerified = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, verified: !resource.verified }
        : resource
    ))
  }

  const handleLegalStatusChange = (resourceId: string, newStatus: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, legalStatus: newStatus }
        : resource
    ))
  }

  const handleDeleteResource = (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(prev => prev.filter(resource => resource.id !== resourceId))
    }
  }

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    if (editingResource) {
      setResources(prev => prev.map(resource => 
        resource.id === editingResource.id ? editingResource : resource
      ))
      setShowEditDialog(false)
      setEditingResource(null)
    }
  }

  const getLegalStatusColor = (status: string) => {
    switch (status) {
      case 'official':
        return 'bg-green-100 text-green-800'
      case 'mirror':
        return 'bg-blue-100 text-blue-800'
      case 'user-submitted':
        return 'bg-yellow-100 text-yellow-800'
      case 'pirate':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resource Management</h1>
        <p className="text-muted-foreground">
          Manage all resources in the platform
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="verified-only"
                  checked={showVerifiedOnly}
                  onCheckedChange={setShowVerifiedOnly}
                />
                <Label htmlFor="verified-only">Verified only</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="pirate-only"
                  checked={showPirateOnly}
                  onCheckedChange={setShowPirateOnly}
                />
                <Label htmlFor="pirate-only">Pirate links</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                {filteredResources.length} resources found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Legal</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="max-w-xs">
                      <div>
                        <div className="font-medium truncate">{resource.title}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {resource.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={resource.verified}
                          onCheckedChange={() => handleToggleVerified(resource.id)}
                          size="sm"
                        />
                        <span className="text-sm">
                          {resource.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={resource.legalStatus}
                        onValueChange={(value) => handleLegalStatusChange(resource.id, value)}
                        size="sm"
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {legalStatuses.map(status => (
                            <SelectItem key={status} value={status}>
                              <span className={`text-xs px-2 py-1 rounded ${getLegalStatusColor(status)}`}>
                                {status}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{resource.clicks.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{resource.addedBy}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditResource(resource)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingResource && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Resource</DialogTitle>
              <DialogDescription>
                Make changes to the resource information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingResource.title}
                  onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={editingResource.url}
                  onChange={(e) => setEditingResource({...editingResource, url: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editingResource.category}
                  onChange={(e) => setEditingResource({...editingResource, category: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingResource.description}
                  onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={editingResource.tags || ''}
                  onChange={(e) => setEditingResource({...editingResource, tags: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}