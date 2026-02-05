 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Progress } from '@/components/ui/progress';
 import { Project } from '@/types/project';
 import { ChevronRight, Edit, Trash2 } from 'lucide-react';
 
 interface ProjectCardProps {
   project: Project;
   progress: number;
   onSelect: () => void;
   onEdit: () => void;
   onDelete: () => void;
 }
 
 export function ProjectCard({
   project,
   progress,
   onSelect,
   onEdit,
   onDelete,
 }: ProjectCardProps) {
   const completedCount = project.milestones.filter((m) => m.status === 'completed').length;
   const totalCount = project.milestones.length;
 
   return (
     <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer animate-fade-in">
       <CardHeader className="pb-2">
         <div className="flex items-start justify-between">
           <div className="flex-1" onClick={onSelect}>
             <CardTitle className="text-lg group-hover:text-primary transition-colors">
               {project.name}
             </CardTitle>
             <CardDescription className="line-clamp-2 mt-1">
               {project.description}
             </CardDescription>
           </div>
           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
             <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="h-8 w-8">
               <Edit className="h-4 w-4" />
             </Button>
             <Button
               variant="ghost"
               size="icon"
               onClick={(e) => { e.stopPropagation(); onDelete(); }}
               className="h-8 w-8 text-destructive hover:text-destructive"
             >
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
         </div>
       </CardHeader>
       <CardContent onClick={onSelect}>
         <div className="space-y-2">
           <div className="flex items-center justify-between text-sm">
             <span className="text-muted-foreground">
               {completedCount}/{totalCount} milestones
             </span>
             <span className="font-medium">{progress}%</span>
           </div>
           <Progress value={progress} className="h-2" />
         </div>
         <div className="flex items-center justify-end mt-3 text-sm text-primary font-medium">
           View Timeline
           <ChevronRight className="h-4 w-4 ml-1" />
         </div>
       </CardContent>
     </Card>
   );
 }