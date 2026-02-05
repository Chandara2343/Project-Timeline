 import { useState } from 'react';
 import { useProjects } from '@/hooks/useProjects';
 import { Project, Milestone, MilestoneStatus } from '@/types/project';
 import { ThemeToggle } from '@/components/ThemeToggle';
 import { StatsCards } from '@/components/StatsCards';
 import { ProjectCard } from '@/components/ProjectCard';
 import { Timeline } from '@/components/Timeline';
 import { ProjectForm } from '@/components/ProjectForm';
 import { MilestoneForm } from '@/components/MilestoneForm';
 import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
 import { Button } from '@/components/ui/button';
 import { ArrowLeft, Plus, FolderOpen } from 'lucide-react';

 export default function Index() {
   const {
     projects,
     isLoaded,
     addProject,
     updateProject,
     deleteProject,
     addMilestone,
     updateMilestone,
     deleteMilestone,
     getProjectProgress,
     getStats,
   } = useProjects();
 
   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
   const [projectFormOpen, setProjectFormOpen] = useState(false);
   const [editingProject, setEditingProject] = useState<Project | undefined>();
   const [milestoneFormOpen, setMilestoneFormOpen] = useState(false);
   const [editingMilestone, setEditingMilestone] = useState<Milestone | undefined>();
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [deleteTarget, setDeleteTarget] = useState<{
     type: 'project' | 'milestone';
     id: string;
     name: string;
   } | null>(null);
 
   const stats = getStats();
 
   // Keep selectedProject in sync with projects
   const currentProject = selectedProject
     ? projects.find((p) => p.id === selectedProject.id) || null
     : null;
 
   const handleAddProject = () => {
     setEditingProject(undefined);
     setProjectFormOpen(true);
   };
 
   const handleEditProject = (project: Project) => {
     setEditingProject(project);
     setProjectFormOpen(true);
   };
 
   const handleProjectSubmit = (name: string, description: string) => {
     if (editingProject) {
       updateProject(editingProject.id, { name, description });
     } else {
       addProject(name, description);
     }
   };
 
   const handleDeleteProject = (project: Project) => {
     setDeleteTarget({ type: 'project', id: project.id, name: project.name });
     setDeleteDialogOpen(true);
   };
 
   const handleAddMilestone = () => {
     setEditingMilestone(undefined);
     setMilestoneFormOpen(true);
   };
 
   const handleEditMilestone = (milestone: Milestone) => {
     setEditingMilestone(milestone);
     setMilestoneFormOpen(true);
   };
 
   const handleMilestoneSubmit = (title: string, description: string, dueDate: string) => {
     if (!currentProject) return;
     if (editingMilestone) {
       updateMilestone(currentProject.id, editingMilestone.id, { title, description, dueDate });
     } else {
       addMilestone(currentProject.id, title, description, dueDate);
     }
   };
 
   const handleDeleteMilestone = (milestoneId: string) => {
     if (!currentProject) return;
     const milestone = currentProject.milestones.find((m) => m.id === milestoneId);
     if (milestone) {
       setDeleteTarget({ type: 'milestone', id: milestoneId, name: milestone.title });
       setDeleteDialogOpen(true);
     }
   };
 
   const handleStatusChange = (milestoneId: string, status: MilestoneStatus) => {
     if (!currentProject) return;
     updateMilestone(currentProject.id, milestoneId, { status });
   };
 
   const handleConfirmDelete = () => {
     if (!deleteTarget) return;
     if (deleteTarget.type === 'project') {
       deleteProject(deleteTarget.id);
       setSelectedProject(null);
     } else if (deleteTarget.type === 'milestone' && currentProject) {
       deleteMilestone(currentProject.id, deleteTarget.id);
     }
     setDeleteDialogOpen(false);
     setDeleteTarget(null);
   };
 
   if (!isLoaded) {
     return (
       <div className="flex min-h-screen items-center justify-center bg-background">
         <div className="animate-pulse text-muted-foreground">Loading...</div>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container flex h-16 items-center justify-between">
           <div className="flex items-center gap-4">
             {currentProject && (
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => setSelectedProject(null)}
                 className="shrink-0"
               >
                 <ArrowLeft className="h-5 w-5" />
               </Button>
             )}
             <div>
               <h1 className="text-xl font-bold">
                 {currentProject ? currentProject.name : 'Project Timeline Manager'}
               </h1>
               {currentProject && (
                 <p className="text-sm text-muted-foreground">{currentProject.description}</p>
               )}
             </div>
           </div>
           <ThemeToggle />
         </div>
       </header>
 
       <main className="container py-8">
         {!currentProject ? (
           /* Dashboard View */
           <div className="space-y-8">
             <StatsCards {...stats} />
 
             <div className="flex items-center justify-between">
               <h2 className="text-2xl font-semibold">Your Projects</h2>
               <Button onClick={handleAddProject}>
                 <Plus className="h-4 w-4 mr-2" />
                 New Project
               </Button>
             </div>
 
             {projects.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                 <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                 <h3 className="text-lg font-semibold">No projects yet</h3>
                 <p className="text-muted-foreground mb-4">
                   Create your first project to get started
                 </p>
                 <Button onClick={handleAddProject}>
                   <Plus className="h-4 w-4 mr-2" />
                   Create Project
                 </Button>
               </div>
             ) : (
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {projects.map((project) => (
                   <ProjectCard
                     key={project.id}
                     project={project}
                     progress={getProjectProgress(project)}
                     onSelect={() => setSelectedProject(project)}
                     onEdit={() => handleEditProject(project)}
                     onDelete={() => handleDeleteProject(project)}
                   />
                 ))}
               </div>
             )}
           </div>
         ) : (
           /* Timeline View */
           <Timeline
             project={currentProject}
             progress={getProjectProgress(currentProject)}
             onAddMilestone={handleAddMilestone}
             onEditMilestone={handleEditMilestone}
             onDeleteMilestone={handleDeleteMilestone}
             onStatusChange={handleStatusChange}
           />
         )}
       </main>
 
       {/* Dialogs */}
       <ProjectForm
         open={projectFormOpen}
         onOpenChange={setProjectFormOpen}
         project={editingProject}
         onSubmit={handleProjectSubmit}
       />
 
       <MilestoneForm
         open={milestoneFormOpen}
         onOpenChange={setMilestoneFormOpen}
         milestone={editingMilestone}
         onSubmit={handleMilestoneSubmit}
       />
 
       <DeleteConfirmDialog
         open={deleteDialogOpen}
         onOpenChange={setDeleteDialogOpen}
         title={`Delete ${deleteTarget?.type === 'project' ? 'Project' : 'Milestone'}?`}
         description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
         onConfirm={handleConfirmDelete}
       />
     </div>
   );
};
