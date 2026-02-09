import { FolderOpen, Target, CheckCircle2, Clock } from 'lucide-react';

interface StatsCardsProps {
  totalProjects: number;
  totalMilestones: number;
  completedMilestones: number;
  inProgressMilestones: number;
}

export function StatsCards({
  totalProjects,
  totalMilestones,
  completedMilestones,
  inProgressMilestones,
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Projects',
      value: totalProjects,
      icon: FolderOpen,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Milestones',
      value: totalMilestones,
      icon: Target,
      iconBg: 'bg-info/10',
      iconColor: 'text-info',
    },
    {
      title: 'In Progress',
      value: inProgressMilestones,
      icon: Clock,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: 'Completed',
      value: completedMilestones,
      icon: CheckCircle2,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="stat-card animate-fade-in"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`h-[18px] w-[18px] ${stat.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-muted-foreground truncate">{stat.title}</p>
              <p className="text-2xl font-bold tracking-tight leading-tight">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
