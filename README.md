# OpenKnowledge Hub

A clean, fast, and searchable multilingual platform for curated technical learning resources (courses, tools, books, papers). Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- **🎨 Modern UI**: Clean design with dark/light mode support
- **🔍 Advanced Search**: Full-text search across all resources
- **📚 Curated Resources**: Quality-controlled learning materials
- **🤖 AI Assistant**: Intelligent resource recommendations
- **🌐 Multilingual**: Support for English, Arabic, and French
- **⚖️ Legal Compliance**: Clear copyright status indicators
- **📊 Admin Dashboard**: Comprehensive resource management
- **📈 Analytics**: Track resource popularity and usage
- **🔒 Authentication**: Secure admin access with role-based permissions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **File Processing**: PapaParse for CSV imports
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd openknowledge-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
   
   Required environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/openknowledge_hub?schema=public"
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   
   # Next Auth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   
   Run Prisma migrations:
   ```bash
   npx prisma db push
   ```
   
   Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   The application will be available at `http://localhost:3000`

### Database Setup

The application uses Prisma with the following schema models:

- **Resource**: Main resource entries with metadata
- **LearningPath**: Structured learning journeys
- **LearningPathItem**: Individual items in learning paths
- **Report**: User reports about resources

Run Prisma Studio to manage your database:
```bash
npx prisma studio
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard routes
│   ├── resource/          # Resource detail pages
│   ├── api/               # API routes
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/                   # Utility functions and configurations
├── prisma/                # Database schema and migrations
└── public/               # Static assets
```

## Key Features Implementation

### Resource Management
- **Bulk Import**: CSV/Excel file processing with automatic pirate link detection
- **Legal Status**: Automatic detection of torrent/pirate sites
- **Verification**: Admin-controlled resource verification system
- **Multilingual Notes**: JSON-based multilingual content support

### Search & Discovery
- **Full-text Search**: PostgreSQL full-text search across titles, descriptions, tags, and notes
- **AI Assistant**: Intelligent recommendations based on user queries
- **Category Filtering**: Browse by technical categories
- **Learning Paths**: Structured learning journeys with progress tracking

### Admin Dashboard
- **Resource Management**: Full CRUD operations with inline editing
- **Report System**: User report management with resolution workflow
- **Analytics**: Resource popularity tracking and usage statistics
- **Export**: CSV export of verified resources

### Authentication & Security
- **Role-based Access**: Admin-only dashboard access
- **Secure Routes**: Middleware protection for admin routes
- **Session Management**: Secure authentication with Supabase

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Netlify Next.js plugin
- **Railway**: Connect your GitHub repository
- **DigitalOcean**: Use the App Platform

## Configuration

### Adding New Categories

Update the categories array in relevant components and the database schema if needed:

```typescript
const categories = [
  "Electronics",
  "AI/ML", 
  "Research",
  "Courses",
  "Tools"
]
```

### Customizing Legal Status

Legal statuses are defined in the schema and can be extended:
- `official`: Original publisher content
- `mirror`: Official mirror sites
- `user-submitted`: Community contributions
- `pirate`: Flagged copyright-infringing content

### Theme Customization

The application uses CSS variables for theming. Modify `app/globals.css` to customize:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```

## API Endpoints

### Public APIs
- `GET /api/resources` - List resources with filtering
- `GET /api/resources/[slug]` - Get single resource
- `POST /api/resources/[slug]/click` - Track resource clicks
- `POST /api/assistant` - AI assistant recommendations

### Admin APIs
- `POST /api/admin/import` - Bulk import resources
- `PUT /api/admin/resources/[id]` - Update resource
- `DELETE /api/admin/resources/[id]` - Delete resource
- `GET /api/admin/reports` - List user reports
- `PUT /api/admin/reports/[id]` - Update report status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, feature requests, or questions:

1. Check the existing issues
2. Create a new issue with detailed description
3. Join our community discussions

---

**Built with ❤️ for the global learning community**