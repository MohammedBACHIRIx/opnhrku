"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Papa from 'papaparse'

interface ImportRecord {
  title: string
  url: string
  category: string
  description: string
  tags?: string
  language?: string
  notes?: string
  legalStatus?: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
}

export default function BulkImportPage() {
  const [files, setFiles] = useState<File[]>([])
  const [importData, setImportData] = useState<ImportRecord[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [importComplete, setImportComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    
    acceptedFiles.forEach(file => {
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const records: ImportRecord[] = results.data.map((row: any) => ({
              title: row.title || '',
              url: row.url || '',
              category: row.category || '',
              description: row.description || '',
              tags: row.tags || '',
              language: row.language || '',
              notes: row.notes || '',
              legalStatus: 'user-submitted',
              status: 'pending'
            }))
            setImportData(prev => [...prev, ...records])
          }
        })
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: true
  })

  const processImportData = () => {
    setIsProcessing(true)
    
    // Simulate processing with legal status detection
    setImportData(prev => prev.map(record => {
      // Check for pirate keywords in URL
      const pirateKeywords = ['torrent', 'z-library', 'piratebay', 'kickass', '1337x']
      const isPirate = pirateKeywords.some(keyword => 
        record.url.toLowerCase().includes(keyword)
      )
      
      return {
        ...record,
        legalStatus: isPirate ? 'pirate' : 'user-submitted',
        status: 'completed'
      }
    }))
    
    setTimeout(() => {
      setIsProcessing(false)
      setImportComplete(true)
    }, 2000)
  }

  const downloadTemplate = () => {
    const template = [
      ['title', 'url', 'category', 'description', 'tags', 'language', 'notes'],
      ['Example Course', 'https://example.com/course', 'Courses', 'Description here', 'tag1,tag2', 'English', 'Additional notes'],
      ['Example Tool', 'https://example.com/tool', 'Tools', 'Tool description', 'development,tool', 'English', '']
    ]
    
    const csv = Papa.unparse(template)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'import-template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    total: importData.length,
    completed: importData.filter(r => r.status === 'completed').length,
    errors: importData.filter(r => r.status === 'error').length,
    pirate: importData.filter(r => r.legalStatus === 'pirate').length
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bulk Import</h1>
        <p className="text-muted-foreground">
          Import multiple resources from CSV or Excel files
        </p>
      </div>

      {/* Instructions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Import Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Prepare your data</p>
                <p className="text-sm text-muted-foreground">
                  Use our template or ensure your CSV has columns: title, url, category, description, tags, language, notes
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Upload your file</p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to select CSV/Excel files
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Review and import</p>
                <p className="text-sm text-muted-foreground">
                  Check detected issues (like pirate links) and process the import
                </p>
              </div>
            </div>
          </div>
          
          <Button onClick={downloadTemplate} className="mt-4" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop files here' : 'Upload CSV or Excel files'}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or click to select files
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Uploaded Files:</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-accent rounded">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{file.name}</span>
                    <Badge variant="outline">{file.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Preview */}
      {importData.length > 0 && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ready to Import</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pirate Links Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.pirate}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.errors}</div>
              </CardContent>
            </Card>
          </div>

          {/* Data Preview */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Preview</CardTitle>
                  <CardDescription>Review your data before importing</CardDescription>
                </div>
                <Button 
                  onClick={processImportData} 
                  disabled={isProcessing || importComplete}
                >
                  {isProcessing ? 'Processing...' : importComplete ? 'Import Complete' : 'Process Import'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Legal Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importData.slice(0, 50).map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {record.title}
                        </TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell>{record.language || 'N/A'}</TableCell>
                        <TableCell>
                          {record.status === 'completed' ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ready
                            </Badge>
                          ) : record.status === 'error' ? (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Error
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={record.legalStatus === 'pirate' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                            }
                          >
                            {record.legalStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {importData.length > 50 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Showing first 50 of {importData.length} records
                  </p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Legal Status Alert */}
          {stats.pirate > 0 && (
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Pirate links detected:</strong> {stats.pirate} resources have been automatically flagged as potentially infringing copyright. 
                These will be marked as "pirate" and set to unverified. Please review these entries carefully.
              </AlertDescription>
            </Alert>
          )}

          {/* Import Complete */}
          {importComplete && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Import Processed Successfully!</p>
                    <p className="text-sm text-green-700">
                      {stats.completed} resources are ready to be imported into the database.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}