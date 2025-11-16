"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Clock, Users, ArrowRight, CheckCircle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  resourcesCount: number
  createdBy: string
  createdAt: string
  progress?: number
}

interface LearningPathItem {
  id: string
  title: string
  description: string
  order: number
  completed?: boolean
}

// Mock data - in production this would come from your API
const mockLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Complete Machine Learning Path",
    description: "From basics to advanced concepts, master machine learning with this comprehensive learning path covering theory, practice, and real-world applications.",
    category: "AI/ML",
    difficulty: "intermediate",
    duration: "12 weeks",
    resourcesCount: 24,
    createdBy: "AI Learning Team",
    createdAt: "2024-01-01",
    progress: 65
  },
  {
    id: "2",
    title: "Electronics Engineering Fundamentals",
    description: "Build a strong foundation in electronics engineering with hands-on projects and practical applications.",
    category: "Electronics",
    difficulty: "beginner",
    duration: "8 weeks",
    resourcesCount: 16,
    createdBy: "Electronics Hub",
    createdAt: "2024-01-05",
    progress: 30
  },
  {
    id: "3",
    title: "Research Methodology Mastery",
    description: "Learn the complete research process from literature review to publication, including statistical analysis and academic writing.",
    category: "Research",
    difficulty: "intermediate",
    duration: "6 weeks",
    resourcesCount: 12,
    createdBy: "Academic Research Institute",
    createdAt: "2024-01-10"
  },
  {
    id: "4",
    title: "Full-Stack Web Development",
    description: "Master modern web development from frontend to backend with the latest tools and frameworks.",
    category: "Tools",
    difficulty: "advanced",
    duration: "16 weeks",
    resourcesCount: 32,
    createdBy: "WebDev Masters",
    createdAt: "2024-01-15",
    progress: 15
  },
  {
    id: "5",
    title: "Quantum Computing Basics",
    description: "Introduction to quantum computing concepts, algorithms, and practical applications for beginners.",
    category: "Courses",
    difficulty: "beginner",
    duration: "4 weeks",
    resourcesCount: 8,
    createdBy: "Quantum Education",
    createdAt: "2024-01-20"
  }
]

const mockPathItems: LearningPathItem[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Basic concepts and terminology",
    order: 1,
    completed: true
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Essential Python libraries and tools",
    order: 2,
    completed: true
  },
  {
    id: "3",
    title: "Supervised Learning Algorithms",
    description: "Linear regression, decision trees, and more",
    order: 3,
    completed: false
  },
  {
    id: "4",
    title: "Unsupervised Learning",
    description: "Clustering and dimensionality reduction",
    order: 4,
    completed: false
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800'
    case 'advanced':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function LearningPathsPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [learningPaths] = useState<LearningPath[]>(mockLearningPaths)
  const [pathItems] = useState<LearningPathItem[]>(mockPathItems)

  const selectedPathData = learningPaths.find(path => path.id === selectedPath)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Learning Paths</h1>
          <p className="text-muted-foreground">
            Structured learning journeys to master new skills and technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Paths List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPaths.map((path) => (
                <Card 
                  key={path.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedPath === path.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">{path.category}</Badge>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{path.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {path.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {path.resourcesCount} resources
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {path.createdBy}
                      </span>
                    </div>
                    
                    {path.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}

                    <Button className="w-full" variant={selectedPath === path.id ? "default" : "outline"}>
                      {selectedPath === path.id ? 'Selected' : 'View Path'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Path Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedPathData ? (
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{selectedPathData.title}</CardTitle>
                  <CardDescription>{selectedPathData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{selectedPathData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resources:</span>
                      <span className="font-medium">{selectedPathData.resourcesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge className={getDifficultyColor(selectedPathData.difficulty)}>
                        {selectedPathData.difficulty}
                      </Badge>
                    </div>
                    {selectedPathData.progress !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="font-medium">{selectedPathData.progress}%</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full mb-6">
                    {selectedPathData.progress ? 'Continue Learning' : 'Start Learning'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div>
                    <h4 className="font-semibold mb-4">Learning Path Steps</h4>
                    <div className="space-y-3">
                      {pathItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          {item.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-8">
                <CardContent className="py-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a learning path to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}