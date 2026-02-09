import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';
import { ChevronRight, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';

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
    <Card className="group relative overflow-hidden border-border/40 hover:border-primary/25 transition-all duration-300 cursor-pointer animate-fade-in hover:shadow-md">
      <CardHeader className="pb-3 relative" onClick={onSelect}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[15px] leading-snug group-hover:text-primary transition-colors duration-200 truncate">
              {project.name}
            </h3>
            <p className="text-[13px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        <div className="space-y-3">
          {/* Milestone count */}
          <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              {completedCount} done
            </span>
            <span className="flex items-center gap-1.5">
              <Circle className="h-3.5 w-3.5" />
              {totalCount - completedCount} remaining
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground font-medium">{progress}% complete</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-1 border-t border-border/40">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="h-7 w-7 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <button
              onClick={onSelect}
              className="flex items-center gap-1 text-[13px] font-medium text-primary hover:gap-2 transition-all duration-200"
            >
              Open
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
