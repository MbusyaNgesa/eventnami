"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
//import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function OrganizerSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    {
      name: "Add Event",
      href: "/organizer/addevent",
    },
    {
      name: "Tickets Sold",
      href: "/organizer/ticketssold",
    },
    {
      name: "Event Status",
      href: "/organizer/eventstatus",
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <Link href="/organizer" className="block">
          <h1 className="text-xl font-bold">Eventlify Listers</h1>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block px-4 py-2 mb-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-64">
          {/* <VisuallyHidden>
          <DialogTitle>Navigation Menu</DialogTitle>
        </VisuallyHidden> */}
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r bg-card">
        <SidebarContent />
      </div>
    </>
  );
}
