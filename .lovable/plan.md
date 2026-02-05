
# Project Timeline Manager - MVP

A clean, visual project timeline application that demonstrates your team's frontend skills and DevOps knowledge with Docker.

## Core Features

### 1. Homepage / Dashboard
- Welcome screen with project overview
- Quick stats showing active projects and milestones
- Clean, modern UI with dark/light mode toggle

### 2. Project Timeline View
- **Visual timeline display** with milestones shown along a horizontal or vertical timeline
- **Milestone cards** showing title, description, due date, and status (Not Started, In Progress, Completed)
- **Progress bar** showing overall project completion percentage
- Color-coded status indicators for quick visual reference

### 3. Project Management
- Create new projects with name and description
- Add milestones with title, description, and target date
- Edit and delete milestones
- Mark milestones as complete

### 4. Data Persistence
- Local storage to save projects and milestones (no backend needed)
- Data persists across browser sessions

## Design & UX
- Clean, professional look suitable for demo presentation
- Responsive design (works on desktop and mobile)
- Smooth animations for timeline interactions
- Intuitive drag-and-drop milestone reordering

## DevOps / Docker Setup
- **Dockerfile** for production build with multi-stage build (build + serve with nginx)
- **docker-compose.yml** for easy local deployment
- **README with documentation** explaining:
  - Tech stack choices (React, TypeScript, Tailwind CSS, Vite)
  - How to build and run with Docker
  - Project structure overview

This setup gives your team a polished, demo-ready application with clear DevOps implementation that's easy to explain during your presentation!
