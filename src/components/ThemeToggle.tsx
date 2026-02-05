 import { Moon, Sun } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useTheme } from '@/hooks/useTheme';
 
 export function ThemeToggle() {
   const { isDark, toggle } = useTheme();
 
   return (
     <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
       {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
     </Button>
   );
 }