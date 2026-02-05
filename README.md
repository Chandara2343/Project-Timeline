 # Project Timeline Manager
 
 A clean, visual project timeline application built with modern web technologies. Track your projects and milestones with an intuitive interface.
 
 ![Project Timeline Manager](https://img.shields.io/badge/React-18.3-blue?logo=react)
 ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
 ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)
 ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
 ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
 
 ## ✨ Features
 
 - **Dashboard View**: Overview of all projects with quick stats
 - **Visual Timeline**: Track milestones along a beautiful vertical timeline
 - **Progress Tracking**: See completion percentage for each project
 - **Status Management**: Mark milestones as Not Started, In Progress, or Completed
 - **CRUD Operations**: Create, edit, and delete projects and milestones
 - **Dark/Light Mode**: Toggle between themes
 - **Responsive Design**: Works on desktop, tablet, and mobile
 - **Local Storage**: Data persists across browser sessions
 
 ## 🛠️ Tech Stack
 
 | Technology | Purpose |
 |------------|---------|
 | **React 18** | UI library with hooks for state management |
 | **TypeScript** | Type-safe JavaScript for better developer experience |
 | **Vite** | Fast build tool and development server |
 | **Tailwind CSS** | Utility-first CSS framework for styling |
 | **shadcn/ui** | Accessible UI components built on Radix UI |
 | **date-fns** | Modern date utility library |
 | **Lucide React** | Beautiful icon library |
 
 ## 📁 Project Structure
 
 ```
 src/
 ├── components/          # Reusable UI components
 │   ├── ui/             # shadcn/ui base components
 │   ├── ThemeToggle.tsx # Dark/light mode toggle
 │   ├── StatsCards.tsx  # Dashboard statistics
 │   ├── ProjectCard.tsx # Project preview card
 │   ├── Timeline.tsx    # Main timeline view
 │   ├── MilestoneCard.tsx # Individual milestone
 │   ├── ProjectForm.tsx # Create/edit project dialog
 │   ├── MilestoneForm.tsx # Create/edit milestone dialog
 │   └── DeleteConfirmDialog.tsx
 ├── hooks/
 │   ├── useProjects.ts  # Project/milestone state & localStorage
 │   └── useTheme.ts     # Theme toggle logic
 ├── types/
 │   └── project.ts      # TypeScript interfaces
 ├── pages/
 │   └── Index.tsx       # Main application page
 └── lib/
     └── utils.ts        # Utility functions
 ```
 
 ## 🚀 Getting Started
 
 ### Prerequisites
 
 - Node.js 18+ or Bun
 - Docker (optional, for containerized deployment)
 
 ### Local Development
 
 ```bash
 # Clone the repository
 git clone <YOUR_GIT_URL>
 cd <YOUR_PROJECT_NAME>
 
 # Install dependencies
 npm install
 
 # Start development server
 npm run dev
 ```
 
 The app will be available at `http://localhost:8080`
 
 ## 🐳 Docker Deployment
 
 ### Using Docker Compose (Recommended)
 
 ```bash
 # Build and start the container
 docker-compose up -d
 
 # View logs
 docker-compose logs -f
 
 # Stop the container
 docker-compose down
 ```
 
 The app will be available at `http://localhost:3000`
 
 ### Using Docker directly
 
 ```bash
 # Build the image
 docker build -t project-timeline-manager .
 
 # Run the container
 docker run -d -p 3000:80 --name timeline-app project-timeline-manager
 
 # Stop the container
 docker stop timeline-app
 ```
 
 ### Docker Architecture
 
 The Dockerfile uses a **multi-stage build** for optimal image size:
 
 1. **Builder Stage**: Uses Node.js Alpine to install dependencies and build the Vite app
 2. **Production Stage**: Uses nginx Alpine to serve the static files
 
 Benefits:
 - Final image is only ~25MB (compared to ~1GB with Node.js)
 - Nginx provides efficient static file serving
 - Security: Production image contains no build tools or source code
 
 ## 📝 Environment Variables
 
 No environment variables are required for this application. All data is stored in the browser's localStorage.
 
 ## 🔧 Available Scripts
 
 | Command | Description |
 |---------|-------------|
 | `npm run dev` | Start development server |
 | `npm run build` | Build for production |
 | `npm run preview` | Preview production build |
 | `npm run lint` | Run ESLint |

 ## 📄 License

 MIT License - feel free to use this project for your own purposes.
