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
  const completedCount = sortedMilestones.filter(m => m.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="glass-card rounded-xl p-5 animate-fade-in">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[13px] font-medium text-muted-foreground mb-1">Overall Progress</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold tracking-tight">{progress}</span>
              <span className="text-lg font-semibold text-muted-foreground">%</span>
            </div>
          </div>
          <p className="text-[13px] text-muted-foreground font-medium pb-1">
            {completedCount} of {sortedMilestones.length} complete
          </p>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        {sortedMilestones.length > 0 && (
          <div className="absolute left-[15px] top-2 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent" />
        )}

        {/* Milestones */}
        <div className="space-y-3">
          {sortedMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="relative pl-10 animate-slide-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-[10px] top-5 timeline-dot ${
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
        <div className="relative pl-10 pt-3">
          <div className="absolute left-[9px] top-6 w-3 h-3 rounded-full border-[1.5px] border-dashed border-muted-foreground/25" />
          <Button
            variant="outline"
            onClick={onAddMilestone}
            className="w-full border-dashed border-border/50 hover:border-primary/30 hover:bg-primary/[0.03] text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>
      </div>
    </div>
  );
}
