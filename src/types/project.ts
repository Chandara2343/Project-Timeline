 export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed';
 
 export interface Milestone {
   id: string;
   title: string;
   description: string;
   dueDate: string;
   status: MilestoneStatus;
   order: number;
 }
 
 export interface Project {
   id: string;
   name: string;
   description: string;
   milestones: Milestone[];
   createdAt: string;
 }
 
 export const statusColors: Record<MilestoneStatus, string> = {
   not_started: 'bg-muted text-muted-foreground',
   in_progress: 'bg-primary/20 text-primary border-primary',
   completed: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500',
 };
 
 export const statusLabels: Record<MilestoneStatus, string> = {
   not_started: 'Not Started',
   in_progress: 'In Progress',
   completed: 'Completed',
 };