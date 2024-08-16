import { links, userLinks } from "./const";
import { Logo } from "./Logo";
import { Outlet } from "react-router-dom";
import { ModeToggle } from '@/components/mode-toggle';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// const Dashboard = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div
//       className={cn(
//         "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700",
//         "h-full relative w-screen"
//       )}
//     >
//       <Sidebar open={open} setOpen={setOpen} animate={true}>
//         <SidebarBody className="justify-between gap-10">
//           <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//             <div className="rounded-full flex items-center">
//               {open ? <Logo /> : <LogoIcon />}
//             </div>

//             <div className="mt-8 flex flex-col gap-2">
//               {links.map((link, idx) => (
//                 <SidebarLink key={idx} link={link} />
//               ))}
//             </div>
//           </div>
//           <div>
//             <SidebarLink
//               link={{
//                 label: "Yasuo Truong",
//                 href: "#",
//                 icon: (
//                   <img
//                     src="https://assets.aceternity.com/manu.png"
//                     className="h-7 w-7 flex-shrink-0 rounded-full"
//                     width={50}
//                     height={50}
//                     alt="Avatar"
//                   />
//                 ),
//               }}
//             />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <div className="w-full h-full overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

const Dashboard = () => {
  return (
    <div>
      <nav className='flex flex-row justify-between p-4'>
        <Logo />
        <div className='flex flex-row items-center gap-4'>
          <NavigationMenu>
            <NavigationMenuList>
              {
                links.map((link, idx) => (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Link to={link.href}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))
              }
            </NavigationMenuList>
          </NavigationMenu>
          <div className='border-l border-gray-400 h-6'></div>
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userLinks.map((link, idx) => (
                <DropdownMenuItem key={idx}>
                  <Link to={link.href}>
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Dashboard;
