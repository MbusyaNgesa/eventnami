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
  NavigationMenuLink,
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
import pfp2 from "../img/pfp2.jpeg";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Events", href: "/event" },
  { title: "Memory", href: "/memories" },
  { title: "Genres", href: "/genres" },
];

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <nav className="border-b bg-cyan-800 ">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={pfp2}
              alt="Eventlify Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-semibold text-white ">Eventlify</span>
          </Link>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="w-full pl-8 text-white"
              type="search"
            />
          </div>
        </div>

        {/* Navigation Menu - hidden on mobile */}
        <NavigationMenu className="hidden md:flex ">
          <NavigationMenuList className="bg-cyan-800 text-white">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} !bg-cyan-800 !text-white hover:!bg-cyan-700 hover:!text-white data-[active]:!bg-cyan-700 data-[state=open]:!bg-cyan-700`}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
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
