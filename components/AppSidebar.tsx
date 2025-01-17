import {
    LayoutDashboard,
    Newspaper,
    Folders,
    CreditCard,
    Settings,
    User,
  } from 'lucide-react';
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from '@/components/ui/command';
import Link from 'next/link';

const AppSidebar = () => {
  
    return (
        <Command className='rounded-none bg-secondary'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <Link href='/'>Dashboard</Link>
              </CommandItem>
              <CommandItem>
                <Newspaper className='mr-2 h-4 w-4' />
                <Link href='/posts'>Posts</Link>
              </CommandItem>
              <CommandItem>
                <Folders className='mr-2 h-4 w-4' />
                <Link href='/client-posts'>Posts using client</Link>
              </CommandItem>
              <CommandItem>
                <Folders className='mr-2 h-4 w-4' />
                <Link href='/posts-data'>Posts using pagination</Link>
              </CommandItem>
              <CommandItem>
                <Folders className='mr-2 h-4 w-4' />
                <Link href='/server-data'>server side pagination</Link>
              </CommandItem>
            
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Settings'>
              <CommandItem>
                <User className='mr-2 h-4 w-4' />
                <Link href='/nodd'>Profile</Link>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className='mr-2 h-4 w-4' />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
}
 
export default AppSidebar;