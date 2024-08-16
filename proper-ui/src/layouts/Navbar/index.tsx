import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Login",
    href: "/auth",
  },
];

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="w-fit fixed top-3 left-1/2 -translate-x-1/2 z-50 isolate">
      <div className="flex justify-center gap-2 bg-background py-2 px-8 rounded-lg">
        {NAV_ITEMS.map((item, index) => (
          <Link to={item.href} key={index + item.href}>
            <Button
              variant={`${index === NAV_ITEMS.length - 1 ? "secondary" : "default"
                }`}
              className={`hover:scale-110 transition-all ${index === NAV_ITEMS.length - 1 ? "rounded-lg" : ""
                }`}
            >
              {item.label}
            </Button>
          </Link>
        ))}
        <div className="w-[0.1rem] h-auto rounded-ful bg-neutral-700"></div>
        <div className="hover:bg-primary/90 text-primary-foreground">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
