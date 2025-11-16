import { BookOpen, Shield, Users, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">About OpenKnowledge Hub</h1>
          <p className="text-xl text-muted-foreground">
            Democratizing access to quality educational resources worldwide
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground">
              OpenKnowledge Hub is dedicated to breaking down barriers to education by providing 
              a centralized, searchable platform for high-quality learning resources. We believe 
              that knowledge should be accessible to everyone, regardless of their geographic 
              location, economic status, or institutional affiliations.
            </p>
          </CardContent>
        </Card>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Legal Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to respecting intellectual property rights and only index 
                publicly available resources. Our platform includes clear legal status 
                indicators and encourages users to support official sources when possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Community Driven</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform thrives on community contributions and feedback. Users can 
                submit new resources, report issues, and help maintain the quality and 
                accuracy of our indexed content through collaborative moderation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle>Global Accessibility</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We support multiple languages and provide resources for diverse learning 
                needs. Our platform is designed to be accessible across different devices 
                and internet connectivity conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle>Quality Assurance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All resources are verified for quality and accuracy. We maintain strict 
                editorial standards and provide transparency about the source and legal 
                status of each indexed resource.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Legal Disclaimer */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Legal Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>Content Indexing:</strong> OpenKnowledge Hub is an indexing platform that 
                provides links to publicly available educational resources. We do not host, 
                store, or distribute any copyrighted content directly.
              </p>
              
              <p>
                <strong>Legal Status:</strong> Each resource is clearly marked with its legal status 
                (official, mirror, user-submitted, or pirate). Users are encouraged to respect 
                copyright laws and support official sources when possible.
              </p>
              
              <p>
                <strong>User Responsibility:</strong> Users are responsible for complying with local 
                laws and regulations when accessing external resources. We provide educational 
                access information for informational purposes only.
              </p>
              
              <p>
                <strong>Report System:</strong> If you believe a resource infringes on copyright or 
                is inappropriate, please use our reporting system. We respond promptly to all 
                valid legal concerns and takedown requests.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Transparency */}
        <Card>
          <CardHeader>
            <CardTitle>Data Transparency</CardTitle>
            <CardDescription>
              How we handle your data and maintain platform integrity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Anonymous Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    We collect anonymous usage data to improve the platform, including 
                    resource popularity and search patterns. No personal information is tracked.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Open Source</h4>
                  <p className="text-sm text-muted-foreground">
                    Our platform code is open source, allowing for community audit and 
                    contribution. All data processing is transparent and documented.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Export Capabilities</h4>
                  <p className="text-sm text-muted-foreground">
                    Administrators can export all verified resources and metadata for 
                    backup, analysis, or migration purposes at any time.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}