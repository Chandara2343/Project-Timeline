 import { Project, Milestone, MilestoneStatus } from '@/types/project';
 import { MilestoneCard } from './MilestoneCard';
 import { Progress } from '@/components/ui/progress';
 import { Button } from '@/components/ui/button';
 import { Plus } from 'lucide-react';
 
 interface TimelineProps {
   project: Project;
   progress: number;
   onAddMilestone: () => void;
   onEditMilestone: (milestone: Milestone) => void;
   onDeleteMilestone: (milestoneId: string) => void;
   onStatusChange: (milestoneId: string, status: MilestoneStatus) => void;
 }
 
 export function Timeline({
   project,
   progress,
   onAddMilestone,
   onEditMilestone,
   onDeleteMilestone,
   onStatusChange,
 }: TimelineProps) {
   const sortedMilestones = [...project.milestones].sort((a, b) => a.order - b.order);
 
   return (
     <div className="space-y-6">
       {/* Progress Header */}
       <div className="space-y-2">
         <div className="flex items-center justify-between">
           <span className="text-sm font-medium">Project Progress</span>
           <span className="text-sm text-muted-foreground">{progress}%</span>
         </div>
         <Progress value={progress} className="h-2" />
       </div>
 
       {/* Timeline */}
       <div className="relative">
         {/* Vertical line */}
         {sortedMilestones.length > 0 && (
           <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
         )}
 
         {/* Milestones */}
         <div className="space-y-4">
           {sortedMilestones.map((milestone, index) => (
             <div key={milestone.id} className="relative pl-10 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
               {/* Timeline dot */}
               <div
                 className={`absolute left-2.5 top-4 w-3 h-3 rounded-full border-2 border-background ${
                   milestone.status === 'completed'
                     ? 'bg-green-500'
                     : milestone.status === 'in_progress'
                     ? 'bg-primary'
                     : 'bg-muted-foreground'
                 }`}
               />
               <MilestoneCard
                 milestone={milestone}
                 onEdit={() => onEditMilestone(milestone)}
                 onDelete={() => onDeleteMilestone(milestone.id)}
                 onStatusChange={(status) => onStatusChange(milestone.id, status)}
               />
             </div>
           ))}
         </div>
 
         {/* Add Milestone Button */}
         <div className="relative pl-10 pt-4">
           <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-dashed border-muted-foreground" />
           <Button variant="outline" onClick={onAddMilestone} className="w-full border-dashed">
             <Plus className="h-4 w-4 mr-2" />
             Add Milestone
           </Button>
         </div>
       </div>
     </div>
   );
 }