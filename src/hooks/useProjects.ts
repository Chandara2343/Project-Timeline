 import { useState, useEffect } from 'react';
 import { Project, Milestone } from '@/types/project';
 
 const STORAGE_KEY = 'timeline-manager-projects';
 
 const generateId = () => Math.random().toString(36).substring(2, 9);
 
 export function useProjects() {
   const [projects, setProjects] = useState<Project[]>([]);
   const [isLoaded, setIsLoaded] = useState(false);
 
   // Load from localStorage on mount
   useEffect(() => {
     const stored = localStorage.getItem(STORAGE_KEY);
     if (stored) {
       try {
         setProjects(JSON.parse(stored));
       } catch (e) {
         console.error('Failed to parse stored projects:', e);
       }
     }
     setIsLoaded(true);
   }, []);
 
   // Save to localStorage on change
   useEffect(() => {
     if (isLoaded) {
       localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
     }
   }, [projects, isLoaded]);
 
   const addProject = (name: string, description: string): Project => {
     const newProject: Project = {
       id: generateId(),
       name,
       description,
       milestones: [],
       createdAt: new Date().toISOString(),
     };
     setProjects((prev) => [...prev, newProject]);
     return newProject;
   };
 
   const updateProject = (id: string, updates: Partial<Pick<Project, 'name' | 'description'>>) => {
     setProjects((prev) =>
       prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
     );
   };
 
   const deleteProject = (id: string) => {
     setProjects((prev) => prev.filter((p) => p.id !== id));
   };
 
   const addMilestone = (
     projectId: string,
     title: string,
     description: string,
     dueDate: string
   ): Milestone | null => {
     const newMilestone: Milestone = {
       id: generateId(),
       title,
       description,
       dueDate,
       status: 'not_started',
       order: 0,
     };
 
     setProjects((prev) =>
       prev.map((p) => {
         if (p.id === projectId) {
           const milestones = [...p.milestones, { ...newMilestone, order: p.milestones.length }];
           return { ...p, milestones };
         }
         return p;
       })
     );
 
     return newMilestone;
   };
 
   const updateMilestone = (
     projectId: string,
     milestoneId: string,
     updates: Partial<Omit<Milestone, 'id'>>
   ) => {
     setProjects((prev) =>
       prev.map((p) => {
         if (p.id === projectId) {
           return {
             ...p,
             milestones: p.milestones.map((m) =>
               m.id === milestoneId ? { ...m, ...updates } : m
             ),
           };
         }
         return p;
       })
     );
   };
 
   const deleteMilestone = (projectId: string, milestoneId: string) => {
     setProjects((prev) =>
       prev.map((p) => {
         if (p.id === projectId) {
           return {
             ...p,
             milestones: p.milestones.filter((m) => m.id !== milestoneId),
           };
         }
         return p;
       })
     );
   };
 
   const reorderMilestones = (projectId: string, milestoneIds: string[]) => {
     setProjects((prev) =>
       prev.map((p) => {
         if (p.id === projectId) {
           const milestones = milestoneIds
             .map((id, index) => {
               const milestone = p.milestones.find((m) => m.id === id);
               return milestone ? { ...milestone, order: index } : null;
             })
             .filter(Boolean) as Milestone[];
           return { ...p, milestones };
         }
         return p;
       })
     );
   };
 
   const getProjectProgress = (project: Project): number => {
     if (project.milestones.length === 0) return 0;
     const completed = project.milestones.filter((m) => m.status === 'completed').length;
     return Math.round((completed / project.milestones.length) * 100);
   };
 
   const getStats = () => {
     const totalProjects = projects.length;
     const totalMilestones = projects.reduce((acc, p) => acc + p.milestones.length, 0);
     const completedMilestones = projects.reduce(
       (acc, p) => acc + p.milestones.filter((m) => m.status === 'completed').length,
       0
     );
     const inProgressMilestones = projects.reduce(
       (acc, p) => acc + p.milestones.filter((m) => m.status === 'in_progress').length,
       0
     );
 
     return {
       totalProjects,
       totalMilestones,
       completedMilestones,
       inProgressMilestones,
     };
   };
 
   return {
     projects,
     isLoaded,
     addProject,
     updateProject,
     deleteProject,
     addMilestone,
     updateMilestone,
     deleteMilestone,
     reorderMilestones,
     getProjectProgress,
     getStats,
   };
 }