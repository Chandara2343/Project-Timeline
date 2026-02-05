 import { useState } from 'react';
 import { format } from 'date-fns';
 import { Card, CardContent, CardHeader } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Milestone, MilestoneStatus, statusColors, statusLabels } from '@/types/project';
 import { Calendar, Edit, Trash2, GripVertical } from 'lucide-react';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 
 interface MilestoneCardProps {
   milestone: Milestone;
   onEdit: () => void;
   onDelete: () => void;
   onStatusChange: (status: MilestoneStatus) => void;
   isDragging?: boolean;
 }
 
 export function MilestoneCard({
   milestone,
   onEdit,
   onDelete,
   onStatusChange,
   isDragging,
 }: MilestoneCardProps) {
   const formattedDate = format(new Date(milestone.dueDate), 'MMM d, yyyy');
   const isOverdue =
     new Date(milestone.dueDate) < new Date() && milestone.status !== 'completed';
 
   return (
     <Card
       className={`transition-all duration-200 ${
         isDragging ? 'shadow-lg scale-105 opacity-90' : 'hover:shadow-md'
       } ${milestone.status === 'completed' ? 'opacity-75' : ''}`}
     >
       <CardHeader className="pb-2">
         <div className="flex items-start justify-between gap-2">
           <div className="flex items-center gap-2">
             <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
             <h4
               className={`font-semibold ${
                 milestone.status === 'completed' ? 'line-through text-muted-foreground' : ''
               }`}
             >
               {milestone.title}
             </h4>
           </div>
           <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
               <Edit className="h-4 w-4" />
             </Button>
             <Button
               variant="ghost"
               size="icon"
               onClick={onDelete}
               className="h-8 w-8 text-destructive hover:text-destructive"
             >
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
         </div>
       </CardHeader>
       <CardContent className="space-y-3">
         <p className="text-sm text-muted-foreground">{milestone.description}</p>
         <div className="flex items-center justify-between flex-wrap gap-2">
           <div className="flex items-center gap-2 text-sm">
             <Calendar className={`h-4 w-4 ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`} />
             <span className={isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}>
               {formattedDate}
             </span>
           </div>
           <Select value={milestone.status} onValueChange={(v) => onStatusChange(v as MilestoneStatus)}>
             <SelectTrigger className="w-[140px] h-8">
               <SelectValue />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="not_started">Not Started</SelectItem>
               <SelectItem value="in_progress">In Progress</SelectItem>
               <SelectItem value="completed">Completed</SelectItem>
             </SelectContent>
           </Select>
         </div>
       </CardContent>
     </Card>
   );
 }