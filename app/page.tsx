"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, BookOpen, Cpu, FlaskConical, Wrench, GraduationCap, ArrowRight, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "Electronics", slug: "electronics", icon: Cpu, description: "Circuits, components, and hardware design" },
  { name: "AI/ML", slug: "ai-ml", icon: Cpu, description: "Machine learning algorithms and frameworks" },
  { name: "Research", slug: "research", icon: FlaskConical, description: "Academic papers and research materials" },
  { name: "Courses", slug: "courses", icon: GraduationCap, description: "Structured learning paths and tutorials" },
  { name: "Tools", slug: "tools", icon: Wrench, description: "Development tools and software" },
]

const recentResources = [
  {
    id: "1",
    title: "Advanced Machine Learning with Python",
    description: "Comprehensive guide to ML algorithms and implementations",
    category: "AI/ML",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Digital Electronics Fundamentals",
    description: "Learn the basics of digital circuits and logic design",
    category: "Electronics",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Research Methodology Handbook",
    description: "Essential guide for academic research and paper writing",
    category: "Research",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Web Development Tools Masterclass",
    description: "Modern development tools and best practices",
    category: "Tools",
    verified: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Quantum Computing Introduction",
    description: "Beginner-friendly introduction to quantum computing concepts",
    category: "Courses",
    verified: true,
    createdAt: new Date().toISOString(),
  },
]

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            OpenKnowledge Hub
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Explore curated learning resources, tools, and research hubs
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for courses, tools, books, or papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
            <Button type="submit" size="lg" className="mt-4">
              Search Resources
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/browse">
              <Button variant="outline" size="lg">
                Browse All Resources
              </Button>
            </Link>
            <Link href="/assistant">
              <Button variant="outline" size="lg">
                Ask AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.slug} href={`/browse?category=${category.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{category.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recently Added Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Recently Added</h2>
            <Link href="/browse">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    {resource.verified && (
                      <Badge variant="default" className="ml-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center mt-2">
                    <span className="text-sm font-medium">{resource.category}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-sm">Recently added</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Link href={`/resource/${resource.id}`}>
                    <Button variant="outline" className="w-full">
                      View Resource
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,234</div>
              <div className="text-muted-foreground">Total Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">856</div>
              <div className="text-muted-foreground">Verified Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">42</div>
              <div className="text-muted-foreground">Learning Paths</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}