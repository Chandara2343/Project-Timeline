import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Milestone, MilestoneStatus } from '@/types/project';
import { Calendar, Pencil, Trash2, GripVertical, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface MilestoneCardProps {
  milestone: Milestone;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: MilestoneStatus) => void;
  isDragging?: boolean;
}

const statusConfig: Record<MilestoneStatus, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  completed: { label: 'Completed', variant: 'default' },
  in_progress: { label: 'In Progress', variant: 'secondary' },
  not_started: { label: 'Not Started', variant: 'outline' },
};

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
      className={`group transition-all duration-300 overflow-hidden ${
        milestone.status === 'completed'
          ? 'border-success/15 bg-success/[0.02]'
          : milestone.status === 'in_progress'
          ? 'border-primary/15 bg-primary/[0.02]'
          : 'border-border/40'
      } ${
        isDragging ? 'shadow-xl scale-[1.01] opacity-90' : 'hover:shadow-sm'
      } ${milestone.status === 'completed' ? 'opacity-65' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Drag handle */}
          <GripVertical className="h-4 w-4 mt-0.5 text-muted-foreground/30 cursor-grab shrink-0 hover:text-muted-foreground/60 transition-colors" />

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h4
                className={`font-semibold text-sm leading-snug ${
                  milestone.status === 'completed' ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {milestone.title}
              </h4>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
                <Button variant="ghost" size="icon" onClick={onEdit} className="h-7 w-7 rounded-md">
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="h-7 w-7 rounded-md text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {milestone.description && (
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {milestone.description}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1.5 text-[12px] font-medium ${
                  isOverdue ? 'text-destructive' : 'text-muted-foreground'
                }`}>
                  {isOverdue ? (
                    <AlertCircle className="h-3 w-3" />
                  ) : (
                    <Calendar className="h-3 w-3" />
                  )}
                  {formattedDate}
                  {isOverdue && <span className="text-[11px]">· Overdue</span>}
                </span>
              </div>

              <Select value={milestone.status} onValueChange={(v) => onStatusChange(v as MilestoneStatus)}>
                <SelectTrigger className="w-[120px] h-7 text-[12px] rounded-md border-border/40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
