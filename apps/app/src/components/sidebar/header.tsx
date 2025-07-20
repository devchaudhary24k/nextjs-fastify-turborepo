"use client";

import { usePathname } from "next/navigation";

import { Separator } from "@repo/design-system/components/ui/separator";
import { SidebarTrigger } from "@repo/design-system/components/ui/sidebar";

const Header = () => {
  const pathname = usePathname();

  // Extract path segments
  const segments = pathname.split("/").filter(Boolean);
  let title = "Dashboard";

  // If root path, show Home
  if (segments.length === 0) {
    title = "Home";
  } else if (segments[0] === "dashboard" && segments.length === 2) {
    // /dashboard/[slug] => Dashboard
    title = "Dashboard";
  } else {
    // For other paths, use last segment and capitalize
    const last = segments[segments.length - 1] ?? "";
    title = last ? last.charAt(0).toUpperCase() + last.slice(1) : "Home";
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
