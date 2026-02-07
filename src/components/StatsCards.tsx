import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Target, CheckCircle, Clock } from 'lucide-react';

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
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderOpen,
      gradient: 'from-primary/10 to-primary/5',
      iconClass: 'text-primary',
    },
    {
      title: 'Total Milestones',
      value: totalMilestones,
      icon: Target,
      gradient: 'from-info/10 to-info/5',
      iconClass: 'text-info',
    },
    {
      title: 'In Progress',
      value: inProgressMilestones,
      icon: Clock,
      gradient: 'from-warning/10 to-warning/5',
      iconClass: 'text-warning',
    },
    {
      title: 'Completed',
      value: completedMilestones,
      icon: CheckCircle,
      gradient: 'from-success/10 to-success/5',
      iconClass: 'text-success',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="stat-card animate-slide-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
