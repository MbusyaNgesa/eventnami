"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function OrganizerSidebar() {
  const pathname = usePathname();

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

  return (
    <div className="flex h-screen w-64 flex-col fixed left-0 top-0 border-r bg-card">
      <div className="p-6">
        <h1 className="text-xl font-bold">Eventlify Listers</h1>
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
}
