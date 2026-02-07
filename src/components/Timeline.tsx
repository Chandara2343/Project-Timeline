import { Project, Milestone, MilestoneStatus } from '@/types/project';
import { MilestoneCard } from './MilestoneCard';
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
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="glass-card rounded-xl p-6 glow-primary animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            <p className="text-3xl font-bold tracking-tight mt-1">{progress}%</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">
              {sortedMilestones.filter(m => m.status === 'completed').length} of {sortedMilestones.length} complete
            </span>
          </div>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent-foreground transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        {sortedMilestones.length > 0 && (
          <div className="absolute left-[17px] top-2 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
        )}

        {/* Milestones */}
        <div className="space-y-4">
          {sortedMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="relative pl-12 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2.5 top-5 timeline-dot ${
                  milestone.status === 'completed'
                    ? 'timeline-dot-completed'
                    : milestone.status === 'in_progress'
                    ? 'timeline-dot-in-progress'
                    : 'timeline-dot-not-started'
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
        <div className="relative pl-12 pt-4">
          <div className="absolute left-[11px] top-7 w-3.5 h-3.5 rounded-full border-2 border-dashed border-muted-foreground/30" />
          <Button
            variant="outline"
            onClick={onAddMilestone}
            className="w-full border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>
      </div>
    </div>
  );
}
