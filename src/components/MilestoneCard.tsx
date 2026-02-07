import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Milestone, MilestoneStatus } from '@/types/project';
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

  const statusStyles: Record<MilestoneStatus, string> = {
    completed: 'border-success/20 bg-success/[0.03]',
    in_progress: 'border-primary/20 bg-primary/[0.03]',
    not_started: 'border-border/50',
  };

  return (
    <Card
      className={`group transition-all duration-300 overflow-hidden ${statusStyles[milestone.status]} ${
        isDragging ? 'shadow-2xl scale-[1.02] opacity-90' : 'hover:shadow-lg hover:-translate-y-0.5'
      } ${milestone.status === 'completed' ? 'opacity-70' : ''}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab hover:text-muted-foreground transition-colors" />
            <h4
              className={`font-semibold text-[15px] ${
                milestone.status === 'completed' ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {milestone.title}
            </h4>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8 rounded-lg">
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className={`h-3.5 w-3.5 ${isOverdue ? 'text-destructive' : 'text-muted-foreground/60'}`} />
            <span className={`${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'} text-[13px]`}>
              {formattedDate}
            </span>
          </div>
          <Select value={milestone.status} onValueChange={(v) => onStatusChange(v as MilestoneStatus)}>
            <SelectTrigger className="w-[130px] h-8 text-xs rounded-lg">
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
