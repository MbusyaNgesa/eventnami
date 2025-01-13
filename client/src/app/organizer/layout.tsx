import { OrganizerSidebar } from "@/components/organizer/OrganizerSidebar";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />
      <main className="flex-1 ml-64">{children}</main>
    </div>
  );
}
