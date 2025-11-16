"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, BookOpen, Cpu, FlaskConical, Wrench, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const categories = [
  { name: "Electronics", slug: "electronics", icon: Cpu },
  { name: "AI/ML", slug: "ai-ml", icon: Cpu },
  { name: "Research", slug: "research", icon: FlaskConical },
  { name: "Courses", slug: "courses", icon: GraduationCap },
  { name: "Tools", slug: "tools", icon: Wrench },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">OpenKnowledge Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <Link href="/learning-paths" className="text-foreground hover:text-primary transition-colors">
              Learning Paths
            </Link>
            <Link href="/assistant" className="text-foreground hover:text-primary transition-colors">
              AI Assistant
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/browse" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <Link href="/learning-paths" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              Learning Paths
            </Link>
            <Link href="/assistant" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              AI Assistant
            </Link>
            <Link href="/about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}