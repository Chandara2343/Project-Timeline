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
import { ArrowLeft, Plus, FolderOpen, Layers } from 'lucide-react';

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
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-[13px] text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="container flex h-14 items-center justify-between max-w-4xl">
          <div className="flex items-center gap-3">
            {currentProject ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
                className="shrink-0 h-8 w-8 rounded-lg"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Layers className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-sm font-bold tracking-tight truncate">
                {currentProject ? currentProject.name : 'Timeline'}
              </h1>
              {currentProject && currentProject.description && (
                <p className="text-[12px] text-muted-foreground truncate">{currentProject.description}</p>
              )}
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-6 max-w-4xl">
        {!currentProject ? (
          <div className="space-y-6">
            <StatsCards {...stats} />

            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Projects</h2>
              <Button onClick={handleAddProject} size="sm" className="rounded-lg h-8 px-3 text-[13px]">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                New Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <div className="empty-state animate-fade-in">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <FolderOpen className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <h3 className="text-base font-semibold">No projects yet</h3>
                <p className="text-[13px] text-muted-foreground mt-1 mb-4 max-w-[280px]">
                  Create your first project to start tracking milestones.
                </p>
                <Button onClick={handleAddProject} size="sm" className="rounded-lg">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
}
