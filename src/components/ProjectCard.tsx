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
    <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer animate-fade-in hover:-translate-y-1">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-2 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1" onClick={onSelect}>
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1.5 text-sm">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="h-8 w-8 rounded-lg">
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent onClick={onSelect} className="relative">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              {completedCount}/{totalCount} milestones
            </span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 text-sm text-primary font-medium group-hover:gap-2 transition-all duration-200">
          View Timeline
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </CardContent>
    </Card>
  );
}
