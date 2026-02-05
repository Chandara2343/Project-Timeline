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
 import { Milestone } from '@/types/project';
 import { format } from 'date-fns';
 
 interface MilestoneFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   milestone?: Milestone;
   onSubmit: (title: string, description: string, dueDate: string) => void;
 }
 
 export function MilestoneForm({ open, onOpenChange, milestone, onSubmit }: MilestoneFormProps) {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
 
   useEffect(() => {
     if (milestone) {
       setTitle(milestone.title);
       setDescription(milestone.description);
       setDueDate(format(new Date(milestone.dueDate), 'yyyy-MM-dd'));
     } else {
       setTitle('');
       setDescription('');
       setDueDate(format(new Date(), 'yyyy-MM-dd'));
     }
   }, [milestone, open]);
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (title.trim() && dueDate) {
       onSubmit(title.trim(), description.trim(), dueDate);
       onOpenChange(false);
     }
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[425px]">
         <form onSubmit={handleSubmit}>
           <DialogHeader>
             <DialogTitle>{milestone ? 'Edit Milestone' : 'Add Milestone'}</DialogTitle>
             <DialogDescription>
               {milestone ? 'Update milestone details.' : 'Add a new milestone to your project timeline.'}
             </DialogDescription>
           </DialogHeader>
           <div className="grid gap-4 py-4">
             <div className="space-y-2">
               <Label htmlFor="title">Title</Label>
               <Input
                 id="title"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder="Enter milestone title"
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="milestone-description">Description</Label>
               <Textarea
                 id="milestone-description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="Describe this milestone"
                 rows={3}
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="dueDate">Due Date</Label>
               <Input
                 id="dueDate"
                 type="date"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 required
               />
             </div>
           </div>
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">{milestone ? 'Save Changes' : 'Add Milestone'}</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }