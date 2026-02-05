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
       color: 'text-primary',
     },
     {
       title: 'Total Milestones',
       value: totalMilestones,
       icon: Target,
       color: 'text-blue-500',
     },
     {
       title: 'In Progress',
       value: inProgressMilestones,
       icon: Clock,
       color: 'text-yellow-500',
     },
     {
       title: 'Completed',
       value: completedMilestones,
       icon: CheckCircle,
       color: 'text-green-500',
     },
   ];
 
   return (
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
       {stats.map((stat) => (
         <Card key={stat.title} className="animate-fade-in">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
             <stat.icon className={`h-4 w-4 ${stat.color}`} />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{stat.value}</div>
           </CardContent>
         </Card>
       ))}
     </div>
   );
 }