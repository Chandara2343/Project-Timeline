 import { useState, useEffect } from 'react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Textarea } from '@/components/ui/textarea';
 import { Label } from '@/components/ui/label';
 import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
 } from '@/components/ui/dialog';
 import { Project } from '@/types/project';
 
 interface ProjectFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   project?: Project;
   onSubmit: (name: string, description: string) => void;
 }
 
 export function ProjectForm({ open, onOpenChange, project, onSubmit }: ProjectFormProps) {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
 
   useEffect(() => {
     if (project) {
       setName(project.name);
       setDescription(project.description);
     } else {
       setName('');
       setDescription('');
     }
   }, [project, open]);
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (name.trim()) {
       onSubmit(name.trim(), description.trim());
       onOpenChange(false);
     }
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[425px]">
         <form onSubmit={handleSubmit}>
           <DialogHeader>
             <DialogTitle>{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
             <DialogDescription>
               {project ? 'Update your project details.' : 'Add a new project to track your milestones.'}
             </DialogDescription>
           </DialogHeader>
           <div className="grid gap-4 py-4">
             <div className="space-y-2">
               <Label htmlFor="name">Project Name</Label>
               <Input
                 id="name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="Enter project name"
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
               <Textarea
                 id="description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="Describe your project"
                 rows={3}
               />
             </div>
           </div>
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">{project ? 'Save Changes' : 'Create Project'}</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }