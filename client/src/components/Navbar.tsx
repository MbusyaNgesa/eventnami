"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import pfp1 from "../img/pfp1.jpeg";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Events", href: "/#events" },
  { title: "Memory", href: "/memories" },
  { title: "Genres", href: "/#genre" },
];

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      // Handle scroll to section if on homepage
      if (pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to homepage and then scroll
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="border-b bg-black ">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image
              src={pfp2}
              alt="Eventlify Logo"
              width={32}
              height={32}
              className="rounded-lg"
            /> */}
            <span className="text-2xl font-semibold text-white ml-5">
              Eventlify
            </span>
          </Link>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="hidden absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="hidden w-full pl-8 text-white"
              type="search"
            />
          </div>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="bg-black text-white">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`${navigationMenuTriggerStyle()} !bg-black !text-white hover:!bg-slate-200 hover:!text-black data-[active]:!bg-black data-[state=open]:!bg-black`}
                >
                  {item.title}
                </button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          {/* Mobile search trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Profile/Login Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border-2"
              >
                <Image
                  src={pfp1}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="sr-only">Open profile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Account</SheetTitle>
                <SheetDescription>
                  Sign in to access your account
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button>Sign in</Button>
                <Button variant="outline">Create account</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Sheet */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
          </SheetHeader>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="w-full pl-8"
              type="search"
            />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
