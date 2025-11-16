"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, Filter, CheckCircle, Clock, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Resource {
  id: string
  title: string
  description: string
  category: string
  tags?: string
  verified: boolean
  clicks: number
  createdAt: string
  slug: string
}

const categories = ["Electronics", "AI/ML", "Research", "Courses", "Tools"]

// Mock data - in production this would come from your API
const mockResources: Resource[] = [
  {
    id: "1",
    title: "Advanced Machine Learning with Python",
    description: "Comprehensive guide to ML algorithms and implementations with hands-on projects and real-world applications.",
    category: "AI/ML",
    tags: "python,machine-learning,deep-learning",
    verified: true,
    clicks: 1250,
    createdAt: "2024-01-15",
    slug: "advanced-machine-learning-python"
  },
  {
    id: "2",
    title: "Digital Electronics Fundamentals",
    description: "Learn the basics of digital circuits, logic design, and microprocessor architecture.",
    category: "Electronics",
    tags: "digital-electronics,circuits,microprocessors",
    verified: true,
    clicks: 890,
    createdAt: "2024-01-14",
    slug: "digital-electronics-fundamentals"
  },
  {
    id: "3",
    title: "Research Methodology Handbook",
    description: "Essential guide for academic research, paper writing, and publication best practices.",
    category: "Research",
    tags: "research,academic-writing,publication",
    verified: true,
    clicks: 2100,
    createdAt: "2024-01-13",
    slug: "research-methodology-handbook"
  },
  {
    id: "4",
    title: "Web Development Tools Masterclass",
    description: "Modern development tools, frameworks, and best practices for web development.",
    category: "Tools",
    tags: "web-development,tools,frameworks",
    verified: false,
    clicks: 450,
    createdAt: "2024-01-12",
    slug: "web-development-tools-masterclass"
  },
  {
    id: "5",
    title: "Quantum Computing Introduction",
    description: "Beginner-friendly introduction to quantum computing concepts and applications.",
    category: "Courses",
    tags: "quantum-computing,physics,algorithms",
    verified: true,
    clicks: 1800,
    createdAt: "2024-01-11",
    slug: "quantum-computing-introduction"
  },
  {
    id: "6",
    title: "Embedded Systems Design",
    description: "Complete guide to designing and programming embedded systems and IoT devices.",
    category: "Electronics",
    tags: "embedded-systems,iot,microcontrollers",
    verified: true,
    clicks: 1100,
    createdAt: "2024-01-10",
    slug: "embedded-systems-design"
  },
  {
    id: "7",
    title: "Deep Learning with TensorFlow",
    description: "Hands-on deep learning projects using TensorFlow and Keras frameworks.",
    category: "AI/ML",
    tags: "tensorflow,keras,neural-networks",
    verified: true,
    clicks: 1650,
    createdAt: "2024-01-09",
    slug: "deep-learning-tensorflow"
  },
  {
    id: "8",
    title: "Academic Writing Guide",
    description: "Master the art of academic writing, from research papers to dissertations.",
    category: "Research",
    tags: "academic-writing,research,grammar",
    verified: false,
    clicks: 320,
    createdAt: "2024-01-08",
    slug: "academic-writing-guide"
  }
]

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('date')
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = resources

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(resource =>
        selectedCategories.includes(resource.category)
      )
    }

    // Apply verified filter
    if (showVerifiedOnly) {
      filtered = filtered.filter(resource => resource.verified)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'popularity':
          return b.clicks - a.clicks
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredResources(filtered)
  }, [searchQuery, selectedCategories, sortBy, showVerifiedOnly, resources])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setShowVerifiedOnly(false)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Resources</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Added</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 space-y-6">
              <div className="bg-card rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Categories</h4>
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>

                {/* Verified Only */}
                <div className="mt-6 pt-6 border-t">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={showVerifiedOnly}
                      onCheckedChange={(checked) => setShowVerifiedOnly(!!checked)}
                    />
                    <span className="text-sm">Verified only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">
                {filteredResources.length} resources found
              </p>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">
                          {resource.title}
                        </CardTitle>
                        {resource.verified && (
                          <Badge variant="default" className="ml-2 flex-shrink-0">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center mt-2">
                        <span className="text-sm font-medium">{resource.category}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-sm">{resource.clicks} views</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      {resource.tags && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.split(',').map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Link href={`/resource/${resource.slug}`}>
                        <Button variant="outline" className="w-full">
                          View Resource
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}